import { ElectionType } from "./election.type";

export interface ElectionInfo {
    tipo_de_eleicao_ativa: ElectionType;
    eleicoes_em_andamento: string[];
}