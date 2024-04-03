import { RestService } from '../../services/rest.service'
import { TenantImpersonationConnectTokenRequestOptions } from '../models'

export const getTenantImpersonationToken =
  async function getAbpApplicationTokenService(
    options: TenantImpersonationConnectTokenRequestOptions
  ) {
    return RestService('/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        grant_type: options.grant_type,
        scope: options.scope,
        client_id: options.client_id,
        access_token: options.access_token,
        TenantId: options.TenantId
      }
    })
      .then((res: any) => {
        return res
      })
      .catch((error: any) => {
        throw error
      })
  }
