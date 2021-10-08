import { Schema } from 'express-validator';
import { ServerStatus } from './server-status.type'

const serverInfoSchema: Schema = {
    server_name: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'server_name is required',
            bail: true
        },
        isString: {
            errorMessage: 'server_name must be a string'
        }
    },
    server_endpoint: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'server_endpoint is required',
            bail: true
        },
        errorMessage: 'server_endpoint must be an URL',
        isURL: true
    },
    descricao: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'descricao is required',
            bail: true
        },
        isString: {
            errorMessage: 'descricao must be a string'
        }
    },
    versao: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'versao is required',
            bail: true
        },
        isString: {
            errorMessage: 'versao must be a string'
        }
    },
    status: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'status is required',
            bail: true
        },
        custom: {
            options: (value: ServerStatus, _) => {
                return value == 'offline' || value == 'online'
            },
            errorMessage: 'status must be offline or online',
        }
    },
    tipo_de_eleicao_ativa: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'tipo_de_eleicao_ativa is required',
            bail: true
        },
        isString: {
            errorMessage: 'tipo_de_eleicao_ativa must be a string'
        }
        // custom: {
        //     options: (value: TipoEleicao', _) => {
        //         return value == 'ring' || value == 'other'
        //     },
        //     errorMessage: 'tipo_de_eleicao_ativa must be ring or other',
        // }
    }
}

export default serverInfoSchema