import { Severity } from "./severity.type";

export interface Log {
    from: string
    severity: Severity
    //Um breve comentario sobre essa entrada,
    comment: string
    //Qualquer coisa, de corpos de requisição, a codigos de erro, a comentarios proprios (ou até nada mesmo)
    body: string
}