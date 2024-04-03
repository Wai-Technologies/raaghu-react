// import { RestService } from '../../services/rest.service'
// import { FindTenantResultDto } from '../models'

// // const apiName = 'abp'
// export const findTenantByName = async function getTenantByName(
//   name: string
// ): Promise<FindTenantResultDto> {
//   return RestService<FindTenantResultDto>(
//     `/api/abp/multi-tenancy/tenants/by-name/${name}`
//   )
// }
// export const findTenantById = async function getTenantById(
//   id: string
// ): Promise<FindTenantResultDto> {
//   return RestService<FindTenantResultDto>(
//     `/api/abp/multi-tenancy/tenants/by-name/${id}`
//   )
// }

// // import { useEffect } from 'react';
// // import { RestService } from "../../services/rest.service";
// // import {  FindTenantResultDto, MultiTenancyRequestOptions  } from "../models";

// // export function AbpTenantService() {
// //   const apiName = 'abp';
// //   export const findTenantById = async function getAbpApplicationLocalizationService(options: ApplicationLocalizationRequestDto): Promise<ApplicationLocalizationConfigurationDto> {
// //     return RestService<ApplicationLocalizationConfigurationDto>('/api/abp/application-localization', {
// //         params: {
// //             cultureName: options.cultureName, onlyDynamics: options.onlyDynamics
// //         },
// //         method: 'GET'
// //     });
// // }

// //   const findTenantById = async (id: string) => {
// //     try {
// //       const response = await RestService<FindTenantResultDto>(
// //         {
// //           method: 'GET',
// //           url: `/api/abp/multi-tenancy/tenants/by-id/${id}`,
// //         },
// //         { apiName: apiName },
// //       );
// //       return response;
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   const findTenantByName = async (name: string) => {
// //     try {
// //       const response = await RestService<any, FindTenantResultDto>(
// //         {
// //           method: 'GET',
// //           url: `/api/abp/multi-tenancy/tenants/by-name/${name}`,
// //         },
// //         { apiName: apiName },
// //       );
// //       return response;
// //     } catch (error) {
// //       console.error(error);
// //     }
// //   };

// //   return {
// //     findTenantById,
// //     findTenantByName,
// //   };
// // }
