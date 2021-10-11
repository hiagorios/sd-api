import { Schema } from 'express-validator';

const peerSchema: Schema = {
    id: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'id is required',
            bail: true
        },
        isString: {
            errorMessage: 'id must be a string'
        }
    },
    nome: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'nome is required',
            bail: true
        },
        isString: {
            errorMessage: 'nome must be a string'
        }
    },
    url: {
        in: ['body'],
        notEmpty: {
            options: { ignore_whitespace: true },
            errorMessage: 'url is required',
            bail: true
        },
        isString: {
            errorMessage: 'url must be a string'
        }
    }
}

export default peerSchema