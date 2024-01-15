import { RestService } from '../../services/rest.service'


export const multiTenancyByName = async function getRefreshTokenService(
  name: string
){
  return RestService(`/api/abp/multi-tenancy/tenants/by-name/${name}`, {
   method: 'GET',
  })
}