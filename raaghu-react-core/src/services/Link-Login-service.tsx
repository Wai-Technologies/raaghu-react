import { getLinkLoginToken } from '../proxy/token/link-login-connect-token';
import { store } from '../utils/internal-store-utils'

export const userLinkLoginService = async (
    grant_type: string,
    scope: string,
    client_id: string,    
    LinkUserId: string,
) => {
    let acctoken = localStorage.getItem("accessToken");
    return await getLinkLoginToken({
        grant_type: grant_type,
        scope: scope,
        client_id: client_id,  
        access_token: acctoken,      
        LinkUserId: LinkUserId,        
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
