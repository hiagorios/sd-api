import { v4 as uuid } from 'uuid';
import * as auth from "../common/auth";
import { Resource } from "./schema/resource.interface";

/**
 * Service Methods
 */

export const getResource = () => {
    return resource
}

export const updateResource = (updatedValue: any) => {
    resource.value = updatedValue
    return resource
}

export const lockResource = () => {
    // Reusing auth logic but testing only expiration date
    if (auth.isAuthenticated(resource, resource.token)) {
        throw new Error('Resource already in use')
    }

    resource.token = uuid()
    resource.expiration = new Date()
    resource.expiration.setSeconds(resource.expiration.getSeconds() + 15)

    return {
        codigo_de_acesso: resource.token,
        validade: resource.expiration
    }
}

export const releaseResource = () => {
    resource.token = undefined
    resource.expiration = undefined
}

/**
 * Data
 */

let resource: Resource = {
    value: 1,
    token: undefined,
    expiration: undefined
}