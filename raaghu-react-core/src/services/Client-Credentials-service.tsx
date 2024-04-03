import { getToken } from '../proxy/token/connect-token'
import { store } from '../utils/internal-store-utils'
 
export const clientCredService = async (
  grant_type?: string,
  password?: string,
  client_id?: string,
) => {
  return await getToken({
    grant_type: grant_type,
    client_secret: password,
    client_id: client_id,
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