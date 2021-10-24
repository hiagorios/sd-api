import { Resource } from "../resource/schema/resource.interface"

export const isAuthenticated = (resource: Resource, accessToken?: string) => {
    return accessToken == resource.token
        && resource.expiration && new Date() <= resource.expiration
}
