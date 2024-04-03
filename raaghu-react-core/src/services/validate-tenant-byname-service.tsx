import { multiTenancyByName } from '../proxy/multi-tenancy/multiTenancyByName';
import { store} from '../utils/internal-store-utils';

export const validateTenantByName = async (name:string) => {
 return await multiTenancyByName(name).then((res:any)=>{
      store.accessToken = res.access_token;
      store.refreshToken = res.refresh_token;
      return res;
    }).catch((error: any) => {
      throw error
    })
}


