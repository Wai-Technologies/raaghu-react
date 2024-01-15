import { RestService } from "../../services/rest.service";
import {ApplicationLocalizationRequestDto } from "../models";

export const getAppLocalization = async function getAbpApplicationLocalizationService(options: ApplicationLocalizationRequestDto) {
    return RestService('/api/abp/application-localization', {
        params: {
            cultureName: options.cultureName, onlyDynamics: options.onlyDynamics
        },
        method: 'GET',
    });
}


