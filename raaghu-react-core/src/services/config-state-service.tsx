import { getAppConfig } from '../proxy/application-configurations/raaghu-application-configuration.service';
import { store} from '../utils/internal-store-utils';

export const configurationService = async (language:any) => {
    return await getAppConfig({language:language, includeLocalizationResources: false }).then((res:any)=>{
      store.languages = res.localization;
      store.auth = res.auth.grantedPolicies;
      localStorage.setItem("userName",res.currentUser.userName);
      return res;
    })
    .catch((error: any) => {
      throw error
    })
    
  }


