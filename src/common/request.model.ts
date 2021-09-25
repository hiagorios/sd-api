export interface RequestModel {
    operacao: string,
    arguments: {
        [key: string]: string | number | boolean
    }
 }