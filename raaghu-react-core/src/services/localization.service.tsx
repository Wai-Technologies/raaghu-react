import { getAppLocalization } from '../proxy/application-configurations/raaghu-application-localization.service'
import { store } from '../utils/internal-store-utils'
export const localizationService = async (cultureName: any) => {
 
    return await getAppLocalization({
      cultureName: cultureName,
      onlyDynamics: false
    }).then((res:any)=>{
   store.localization = res
      return res
    }).catch((error: any) => {
      throw error
    })
}
