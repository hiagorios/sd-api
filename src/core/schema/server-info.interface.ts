import { ServerStatus } from "./server-status.type";

export interface ServerInfo {
    server_name: string
    server_endpoint: string
    descricao: string
    versao: string
    status: ServerStatus
    tipo_de_eleicao_ativa: string
}