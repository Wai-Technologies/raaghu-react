import { getToken } from '../proxy/token/connect-token'
import { store } from '../utils/internal-store-utils'

export const sessionService = async (
  url?: string,
  grant_type?: string,
  username?: string,
  password?: string,
  client_id?: string,
  scope?: string,
  code?:string,
  redirect_uri?:string,
  code_verifier?:string
) => {
 
 
  if(localStorage.getItem("REACT_APP_GRANT_TYPE")=="password" || localStorage.getItem("REACT_APP_GRANT_TYPE")=="authorization_code"){
    return await getToken({
      url: url,
      grant_type: grant_type,
      username: username,
      password: password,
      client_id: client_id,
      scope: scope,
      code:code,
      redirect_uri:redirect_uri,
      code_verifier:code_verifier
    })
      .then((data: any) => {
        store.accessToken = data.access_token
        return data
      })
      .catch((error: any) => {
        throw error
      })
  }else if(localStorage.getItem("REACT_APP_GRANT_TYPE")=="client_credentials"){
    return await getToken({
      url: undefined,
      grant_type: grant_type,
      username: undefined,
      password: undefined,
      client_id: username,
      scope: undefined,
      code:undefined,
      redirect_uri:undefined,
      code_verifier:undefined,
      client_secret:password
    })
      .then((data: any) => {
        store.accessToken = data.access_token
        return data
      })
      .catch((error: any) => {
        throw error
      })
 
  }
 
 
 
 
}
 
export const clearToken = () => {
  store.accessToken = null
}