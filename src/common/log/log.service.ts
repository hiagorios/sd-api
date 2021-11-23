import axios from "axios";
import * as dotenv from "dotenv";
import * as CoreService from "../../core/core.service";
import { Log } from "./log.interface";
import { Severity } from "./severity.type";

dotenv.config()

const loggerUrl = 'https://sd-log-server.herokuapp.com/log'
const production = process.env.PRODUCTION == 'true'

export const log = async (comment: string, body?: string, severity: Severity = 'Success') => {
    console.log(`[${severity}]: ${comment}. ${body}`)
    if (production) {
        try {
            const requestBody: Partial<Log> = {
                from: CoreService.getServerInfo().server_endpoint,
                severity,
                comment,
                body
            }
            return await axios.post(loggerUrl, requestBody)
        } catch (error) {
            console.log(`Error on logging: ${error}`)
            return Promise.resolve()
        }
    } else {
        return Promise.resolve()
    }
}