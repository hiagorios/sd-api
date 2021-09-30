import { ServerInfo } from "./server-info.interface";

/**
 * Service Methods
 */

export const getServerInfo = (): ServerInfo => {
    return serverInfo
}

export const updateServerInfo = (info: ServerInfo) => {
    serverInfo = { ...info }
}

/**
 * Data
 */

let serverInfo: ServerInfo = {
    server_name: "server",
    server_endpoint: "https://sd-api-uesc.herokuapp.com/",
    descricao: "Projeto de SD. Os seguintes serviços estão implementados, ... etc",
    versao: "0.1",
    status: "online",
    tipo_de_eleicao_ativa: "ring"
}
