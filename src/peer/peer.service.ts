import { Peer } from "./peer.interface";

/**
 * Service Methods
 */

export const getPeers = (excludeId?: string): Peer[] => {
    if (excludeId) {
        return peers.filter(peer => peer.id !== excludeId)
    }
    return peers
}

export const getPeerByID = (id: string) => {
    const peerFound = peers.find(peer => peer.id == id)
    if (!peerFound) {
        throw new Error('No peer found for the given ID')
    }
    return peerFound
}

export const addPeer = (newPeer: Peer) => {
    const peerFound = peers.find(peer => peer.id == newPeer.id || peer.nome == newPeer.nome)
    if (peerFound) {
        throw new Error('Given peer already exists')
    }
    peers.push(newPeer)
}

export const updatePeer = (updatedPeer: Peer) => {
    // Check if peer exists
    const peer = getPeerByID(updatedPeer.id)
    peer.nome = updatedPeer.nome
    peer.url = updatedPeer.url
    return peer
}

export const deletePeer = (id: string) => {
    const peerIndex = peers.findIndex(peer => peer.id == id)
    if (peerIndex == -1) {
        throw new Error('No peer found for the given ID')
    }
    peers.splice(peerIndex, 1)
}

export const findByFirstName = (name: string): Peer => {

    const peerFound = peers.find(peer => getFirstName(peer).toLowerCase() === name.toLowerCase())
    if (!peerFound) {
        throw new Error('No peer found for the given first name')
    }
    return peerFound
}

const getFirstName = (api: Peer): string => {
    return api.nome.split(' ')[0]
}

export const getPredecessor = (id: string): Peer => {
    peers.sort((p1, p2) => p1.id.localeCompare(p2.id))
    const index = peers.findIndex(peer => peer.id == id)
    if (index == 0) {
        return peers[peers.length - 1]
    }
    return peers[index - 1]
}

export const getSuccessor = (id: string): Peer => {
    peers.sort((p1, p2) => p1.id.localeCompare(p2.id))
    const index = peers.findIndex(peer => peer.id == id)
    if (index == peers.length - 1) {
        return peers[0]
    }
    return peers[index + 1]
}

export const getSuccessors = (id: string): Peer[] | undefined => {
    peers.sort((p1, p2) => p1.id.localeCompare(p2.id))
    const index = peers.findIndex(peer => peer.id == id)
    if (index != peers.length - 1) {
        return peers.slice(index + 1)
    }
}


/**
 * Data
 */
const peers: Peer[] = [
    // {
    //     "id": "201810665",
    //     "nome": "Jenilson Ramos Santos",
    //     "url": "https://jenilsonramos-sd-20211.herokuapp.com",
    // },
    // {
    //     "id": "201720308",
    //     "nome": "Victor Dos Santos Santana",
    //     "url": "https://sd-victor-20212.herokuapp.com",
    // },
    {
        "id": "201720295",
        "nome": "Allana Dos Santos Campos",
        "url": "https://sd-ascampos-20212.herokuapp.com",
    },
    {
        "id": "201710396",
        "nome": "Robert Morais Santos Broketa",
        "url": "https://pratica-sd.herokuapp.com",
    },
    {
        "id": "201710377",
        "nome": "Hiago Rios Cordeiro",
        "url": "https://sd-api-uesc.herokuapp.com",
    },
    {
        "id": "201710376",
        "nome": "Guilherme Senna Cruz",
        "url": "https://nodejs-sd-guilhermesenna.herokuapp.com",
    },
    // {
    //     "id": "201710375",
    //     "nome": "Emmanuel Norberto Ribeiro Dos Santos",
    //     "url": "https://sd-emmanuel.herokuapp.com",
    // },
    // {
    //     "id": "201620400",
    //     "nome": "Nassim Maron Rihan",
    //     "url": "https://sd-nassimrihan-2021-2.herokuapp.com",
    // },
    // {
    //     "id": "201610337",
    //     "nome": "Luís Carlos Santos Câmara",
    //     "url": "https://sd-20212-luiscarlos.herokuapp.com",
    // },
    // {
    //     "id": "201610327",
    //     "nome": "João Pedro De Gois Pinto",
    //     "url": "https://sd-joaopedrop-20212.herokuapp.com",
    // },
    // {
    //     "id": "201512136",
    //     "nome": "Annya Rita De Souza Ourives",
    //     "url": "https://sd-annyaourives-20212.herokuapp.com/hello",
    // }
];