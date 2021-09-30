export interface ServerInfo {
    server_name: string
    server_endpoint: string
    descricao: string
    versao: string
    status: 'online' | 'offline'
    tipo_de_eleicao_ativa: string
}