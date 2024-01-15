/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Http_Modeling_MethodParameterApiDescriptionModel } from './Volo_Abp_Http_Modeling_MethodParameterApiDescriptionModel';
import type { Volo_Abp_Http_Modeling_ParameterApiDescriptionModel } from './Volo_Abp_Http_Modeling_ParameterApiDescriptionModel';
import type { Volo_Abp_Http_Modeling_ReturnValueApiDescriptionModel } from './Volo_Abp_Http_Modeling_ReturnValueApiDescriptionModel';

export type Volo_Abp_Http_Modeling_ActionApiDescriptionModel = {
    uniqueName?: string | null;
    name?: string | null;
    httpMethod?: string | null;
    url?: string | null;
    supportedVersions?: Array<string> | null;
    parametersOnMethod?: Array<Volo_Abp_Http_Modeling_MethodParameterApiDescriptionModel> | null;
    parameters?: Array<Volo_Abp_Http_Modeling_ParameterApiDescriptionModel> | null;
    returnValue?: Volo_Abp_Http_Modeling_ReturnValueApiDescriptionModel;
    allowAnonymous?: boolean | null;
    implementFrom?: string | null;
};

