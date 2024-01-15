import { refreshToken } from '../proxy/token/refresh-token';
import { store} from '../utils/internal-store-utils';

export const refreshTokenService = async (grant_type:string, refresh_token:string, client_id:string) => {
 
    return await refreshToken({grant_type, refresh_token, client_id}).then((res:any)=>{
      store.accessToken = res.access_token;
      store.refreshToken = res.refresh_token;
      return res;
    }).catch((error: any) => {
      throw error
    })
}


