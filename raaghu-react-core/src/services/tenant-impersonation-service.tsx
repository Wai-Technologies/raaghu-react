import { getTenantImpersonationToken } from '../proxy/token/tenant-impersonate-connect-token'
import { store } from '../utils/internal-store-utils'
import { TenantImpersonationConnectTokenDto } from '../proxy/models'

export const tenantImpersonationService = async (
  dto: TenantImpersonationConnectTokenDto
) => {
  let acctoken = localStorage.getItem('accessToken')
  return await getTenantImpersonationToken({
    grant_type: dto.grant_type,
    client_id: dto.client_id,
    scope: dto.scope,
    TenantId: dto.TenantId,
    access_token: acctoken
  })
    .then((data: any) => {
      store.accessToken = data.access_token
      return data
    })
    .catch((error: any) => {
      throw error
    })
}

export const clearToken = () => {
  store.accessToken = null
}

// export const
