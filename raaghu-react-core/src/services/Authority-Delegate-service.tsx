import { getDelegateImpersonationToken } from '../proxy/token/authority-delegate-connect-token'
import { store } from '../utils/internal-store-utils'
import { AuthorityDelegateConnectTokenDto } from '../proxy/models'

export const delegateImpersonationService = async (
  dto: AuthorityDelegateConnectTokenDto
) => {
  let acctoken = localStorage.getItem('accessToken')
  return await getDelegateImpersonationToken({
    grant_type: dto.grant_type,
    client_id: dto.client_id,
    scope: dto.scope,
    access_token: acctoken,
    UserDelegationId: dto.UserDelegationId
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
