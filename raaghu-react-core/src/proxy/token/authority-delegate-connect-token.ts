import { RestService } from '../../services/rest.service'
import { AuthorityDelegateConnectTokenRequestOptions } from '../models'

export const getDelegateImpersonationToken =
  async function getAbpApplicationTokenService(
    options: AuthorityDelegateConnectTokenRequestOptions
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
        UserDelegationId: options.UserDelegationId
      }
    })
      .then((res: any) => {
        return res
      })
      .catch((error: any) => {
        throw error
      })
  }
