/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Volo_Abp_Http_Modeling_ActionApiDescriptionModel } from './Volo_Abp_Http_Modeling_ActionApiDescriptionModel';
import type { Volo_Abp_Http_Modeling_ControllerInterfaceApiDescriptionModel } from './Volo_Abp_Http_Modeling_ControllerInterfaceApiDescriptionModel';

export type Volo_Abp_Http_Modeling_ControllerApiDescriptionModel = {
    controllerName?: string | null;
    controllerGroupName?: string | null;
    isRemoteService?: boolean;
    isIntegrationService?: boolean;
    apiVersion?: string | null;
    type?: string | null;
    interfaces?: Array<Volo_Abp_Http_Modeling_ControllerInterfaceApiDescriptionModel> | null;
    actions?: Record<string, Volo_Abp_Http_Modeling_ActionApiDescriptionModel> | null;
};

