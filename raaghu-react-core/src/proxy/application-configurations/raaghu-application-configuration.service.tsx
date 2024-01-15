import { RestService } from "../../services/rest.service";
import { ApplicationConfigurationRequestOptions } from "../models";

export const getAppConfig = async function getAbpApplicationConfigurationService(options: ApplicationConfigurationRequestOptions){

  return RestService('/api/abp/application-configuration', {
    params: {
      includeLocalizationResources: options.includeLocalizationResources
    },
    headers:{
     'accept-language':options.language,
    }
  });
}


