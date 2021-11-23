import axios from "axios";
import { v4 as uuid } from 'uuid';
import { JSUtil } from "../common/js-util";
import { log } from "../common/log/log.service";
import { Peer } from "../peer/peer.interface";
import * as PeerService from "../peer/peer.service";
import { CoordinatorInfo } from "./schema/coordinator-info.interface";
import { ElectionInfo } from "./schema/election-info.interface";
import { ServerInfo } from "./schema/server-info.interface";

/**
 * Service Methods
 */

export const getApiVersion = (): string => {
    return serverInfo['versao'];
}

export const getServerInfo = (): ServerInfo => {
    return serverInfo
}

export const updateServerInfo = (info: ServerInfo) => {
    // TODO verificar se está ativando o server inativo, caso sim, iniciar uma eleição se for o tipo for valentao
    serverInfo = { ...info }
}

export const getCoordinatorInfo = (): CoordinatorInfo => {
    return {
        coordenador: isCoordinator(),
        coordenador_atual: coordinatorId as string
    }
}

//get election info
export const getElectionInfo = (): ElectionInfo => {
    return {
        tipo_de_eleicao_ativa: serverInfo.tipo_de_eleicao_ativa,
        eleicoes_em_andamento: elections.map(election => election.id)
    }
}

export const getCoordinatorId = (): string => {
    return coordinatorId as string
}

export const updateCoordinatorId = (id: string) => {
    coordinatorId = id
}

export const resetCoodinator = () => {
    coordinatorId = undefined
    elections = []
}

export const isCoordinator = (): boolean => {
    return coordinatorId === serverId
}

export const startElection = (wait = true) => {
    const timeoutSeconds = wait ? JSUtil.randomIntInclusive(5, 10) : 0
    const electionId = uuid()
    elections.push({ id: electionId, startedByMe: true })
    setTimeout(() => {
        console.log(`Starting election. Type: ${serverInfo.tipo_de_eleicao_ativa}`)
        switch (serverInfo.tipo_de_eleicao_ativa) {
            case 'anel':
                sendAnelElection(electionId, [serverId]).then()
                break;
            case 'valentao':
                sendValentaoElection(electionId, []).then()
                break;
        }
    }, timeoutSeconds * 1000)
}

const sendAnelElection = async (electionId: string, electionData?: string[]) => {
    let successor = PeerService.getSuccessor(serverId)
    let keepSending = true
    let successorError = false
    while (keepSending) {
        try {
            const res = await sendElection(successor.url, electionId, electionData)
            if (res.status == 200) {
                keepSending = false
            } else {
                successorError = true
            }
        } catch (error) {
            successorError = true
        }
        if (successorError) {
            await log(
                `Election call to ${successor.id} failed. Calling next successor`,
                `Election ID: ${electionId}. Election type: anel`,
                'Error'
            )
            successor = PeerService.getSuccessor(successor.id)
            successorError = false
        }
    }
}

const sendValentaoElection = async (electionId: string, electionData: string[]) => {
    const successors = PeerService.getSuccessors(serverId)
    if (successors) {
        let anySuccessorOk = await checkSuccessorsResponse(successors, electionId, electionData)
        if (anySuccessorOk) {
            await log(
                `Election call to successor succeeded. Giving up election`,
                `Election ID: ${electionId}. Election type: valentao`
            )
            removeElection(electionId)
        } else {
            await log(
                `No successor responded. The crown belongs to me!`,
                `Election ID: ${electionId}. Election type: valentao`,
                'Attention'
            )
            endElection(electionId, serverId)
        }
    } else {
        await log(
            `Could not find any successor to call. The crown belongs to me!`,
            `Election ID: ${electionId}. Election type: valentao`,
            'Attention'
        )
        endElection(electionId, serverId)
    }
}

const checkSuccessorsResponse = async (successors: Peer[], electionId: string, electionData: string[]) => {
    let anySuccessorOk = false
    for (let successor of successors) {
        try {
            const response = await sendElection(successor.url, electionId, electionData)
            if (response.status == 200) {
                anySuccessorOk = true
            }
        } catch (error) {
            await log(`Error on calling ${successor.id} for election`, `Election ID: ${electionId}`, 'Error')
        }
    }
    return anySuccessorOk
}

const sendElection = (server: string, electionId: string, electionData?: string[]) => {
    console.log(`Sending ${serverInfo.tipo_de_eleicao_ativa} election to ${server}`)
    return axios.post(`${server}/eleicao`, {
        id: electionId,
        dados: electionData
    })
}

export const endElection = (electionId: string, newCoordinatorId: string, propagate = true) => {
    PeerService.getPeerByID(newCoordinatorId)
    if (propagate) {
        log(
            `Election ${electionId} finished. Sending winner to other servers`,
            `New coordinator: ${newCoordinatorId}`
        ).then(_ => {
            PeerService.getPeers(serverId).forEach(peer => {
                axios.post(`${peer.url}/eleicao/coordenador`, {
                    coordenador: newCoordinatorId,
                    id_eleicao: electionId
                }).then(res => {
                    if (res.status != 200) {
                        console.log(`Could not set new coordinator for server ${peer.id}: ${res.statusText}`)
                    }
                }).catch(err => {
                    console.log(`Error sending new coordinator to server ${peer.id}: ${err.message}`)
                })
            })
        })
    } else {
        log(
            `New coordinator ${newCoordinatorId} received`,
            `Result of election ${electionId}`
        )
    }
    removeElection(electionId)
    updateCoordinatorId(newCoordinatorId)
}

const addElection = (electionId: string) => {
    if (elections.findIndex(election => election.id === electionId) == -1) {
        elections.push({ id: electionId, startedByMe: false })
    }
}

const removeElection = (electionId: string) => {
    const index = elections.findIndex(election => election.id === electionId)
    if (index >= 0) {
        elections.splice(index, 1)
    }
}

export const receiveElection = (electionId: string, electionData: string[]) => {
    log(`Received election ${electionId}.`, `Active election type is ${serverInfo.tipo_de_eleicao_ativa}`).then(() => {
        switch (serverInfo.tipo_de_eleicao_ativa) {
            case 'anel':
                receiveAnelElection(electionId, electionData)
                break;
            case 'valentao':
                receiveValentaoElection(electionId, electionData)
                break;
        }
    })
}

const receiveAnelElection = (electionId: string, electionData: string[]) => {
    if (electionData.includes(serverId)) {
        electionData.sort()
        const newCoordinator = PeerService.getPeerByID(electionData[electionData.length - 1])
        endElection(electionId, newCoordinator.id)
    } else {
        addElection(electionId)
        sendAnelElection(electionId, electionData.concat([serverId])).then()
    }
}

const receiveValentaoElection = (electionId: string, electionData: string[]) => {
    if (elections.findIndex(election => election.startedByMe) == -1) {
        addElection(electionId)
        sendValentaoElection(electionId, electionData)
    }
}

export const electionsInProgress = (): boolean => {
    return elections.length > 0
}

export const checkCoordinatorStatus = () => {
    if (serverInfo.status == 'online' && !isCoordinator() && !electionsInProgress()) {
        console.log('Checking coordinator status...')
        if (!coordinatorId) {
            log(`Coordinator does not exist, election will start soon`,
                `Election Type: ${serverInfo.tipo_de_eleicao_ativa}`,
                'Attention').then()
            startElection()
        } else {
            const coordinatorUrl = PeerService.getPeerByID(coordinatorId).url
            axios.get(`${coordinatorUrl}/info`).then(info => {
                if (info.status != 200 || info.data.status === 'offline') {
                    handleCoordinatorOffline()
                }
            }).catch(err => {
                handleCoordinatorOffline()
            });
        }
    }
}

const handleCoordinatorOffline = () => {
    log(`Coordinator ${coordinatorId} is offline, election will start soon`,
        `Election Type: ${serverInfo.tipo_de_eleicao_ativa}`,
        'Attention').then()
    startElection()
}

/**
 * Data
 */

let serverInfo: ServerInfo = {
    server_name: 'Hiago Rios Cordeiro',
    server_endpoint: 'https://sd-api-uesc.herokuapp.com/',
    descricao: 'Projeto de SD. Os seguintes serviços estão implementados: info, peers, recurso, eleicao',
    versao: '0.1',
    status: 'online',
    tipo_de_eleicao_ativa: 'valentao'
}

let serverId = '201710377'
let coordinatorId: string | undefined
let elections: {
    id: string,
    startedByMe: boolean
}[] = []