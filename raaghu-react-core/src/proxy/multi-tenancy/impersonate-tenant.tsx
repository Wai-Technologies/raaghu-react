import { RestService } from "../../services/rest.service";
import { ApplicationConfigurationDto, ApplicationConnectTokenDTO } from "../models";

export const impersonateToken = async function ImpersonationService(options: ApplicationConnectTokenDTO): Promise<ApplicationConfigurationDto> {

  return RestService('/api/abp/application-configuration', {
    params: {
        includeLocalizationResources: options.includeLocalizationResources,

    },
    headers:{
     'accept-language':options.language,
     'Authorization': `Bearer ${options.access_token}`,
     'referer':'http://localhost:8080/'

    }
  });
}

