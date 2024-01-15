import { getUserApplicationConfig } from '../proxy/application-configurations/raaghu-application-user-configuration';
import { store } from '../utils/internal-store-utils';

export const userConfigurationService = async () => {
    let access_token = localStorage.getItem("accessToken") || "";
    return await getUserApplicationConfig({ access_token: access_token, includeLocalizationResources: false }).then((res: any) => {
        store.languages = res.localization;
        store.auth = res.auth.grantedPolicies;
        store.currentUser = res.currentUser;
        localStorage.setItem("userName",res.currentUser.userName);
        return res;
    })
        .catch((error: any) => {
            throw error
        })

}


