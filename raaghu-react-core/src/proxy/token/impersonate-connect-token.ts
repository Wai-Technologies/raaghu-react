import { RestService } from '../../services/rest.service'
import { userImpersonationConnectTokenRequestOptions } from '../models'

export const getImpersonationToken =
  async function getAbpApplicationTokenService(
    options: userImpersonationConnectTokenRequestOptions
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
        UserId: options.UserId
      }
    })
      .then((res: any) => {
        return res
      })
      .catch((error: any) => {
        throw error
      })
  }
