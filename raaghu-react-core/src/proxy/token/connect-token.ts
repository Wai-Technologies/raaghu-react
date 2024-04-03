import { RestService } from '../../services/rest.service'
import {
  ApplicationConnectTokenRequestOptions
} from '../models'
 
export const getToken = async function getAbpApplicationTokenService(
  options: ApplicationConnectTokenRequestOptions) {
  let tenant = localStorage.getItem('__tenant')
  return RestService(
 
    `/connect/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        '__tenant': `${tenant}`
      },
      data: {
        grant_type: options?.grant_type,
        username: options?.username,
        password: options?.password,
        client_id: options?.client_id,
        scope: options?.scope,
        code:options?.code,
        redirect_uri:options?.redirect_uri,
        code_verifier:options?.code_verifier,
        client_secret:options?.client_secret
       
      }
    }
  )
    .then((res: any) => {
      return res
    })
    .catch((error: any) => {
      throw error;
    })
}