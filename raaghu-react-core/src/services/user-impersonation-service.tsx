import { getImpersonationToken } from '../proxy/token/impersonate-connect-token'
import { store } from '../utils/internal-store-utils'

export const userImpersonationService = async (
    grant_type: string,
    client_id: string,
    scope: string,
    UserId?: string,
    TenantId?:string,
    __tenant?:string,
    TenantUserName?:string
) => {
    let acctoken = localStorage.getItem("accessToken");
    return await getImpersonationToken({
        grant_type: grant_type,
        client_id: client_id,
        scope: scope,
        UserId: UserId,
        TenantId:TenantId,
        TenantUserName:TenantUserName,
        access_token: acctoken,
        
    })
        .then((data: any) => {
            
            store.accessToken = data.access_token
            return data
        })
        .catch((error: any) => {
            throw error
        })
}

export const clearToken = () => {
    store.accessToken = null
}

// export const 
