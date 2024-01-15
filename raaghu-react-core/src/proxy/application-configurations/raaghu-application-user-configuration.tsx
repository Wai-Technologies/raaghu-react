import { RestService } from "../../services/rest.service";
import { UserImpersonationApplicationConfigurationRequestOptions } from "../models";

export const getUserApplicationConfig = async function getUserAbpApplicationConfigurationService(options: UserImpersonationApplicationConfigurationRequestOptions) {

    return RestService('/api/abp/application-configuration', {
        params: {
            includeLocalizationResources: options.includeLocalizationResources
        },
        body: {
            'access_token': options.access_token,
        }
    });
}


