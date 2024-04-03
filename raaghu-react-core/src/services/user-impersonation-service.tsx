import { getImpersonationToken } from '../proxy/token/impersonate-connect-token'
import { store } from '../utils/internal-store-utils'
import { userImpersonationConnectTokenDto } from '../proxy/models'

export const userImpersonationService = async (
  dto: userImpersonationConnectTokenDto
) => {
  let acctoken = localStorage.getItem('accessToken')
  return await getImpersonationToken({
    grant_type: dto.grant_type,
    client_id: dto.client_id,
    scope: dto.scope,
    UserId: dto.UserId,
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
