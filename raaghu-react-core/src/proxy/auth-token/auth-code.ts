// import { RestService } from '../../services/rest.service'
import { store } from '../../utils/internal-store-utils';
import {
    ApplicationAuthorizationCodeRequestOptions
} from '../models'
 
export const getAuthToken = async function getAbpApplicationAuthTokenService(
  options: ApplicationAuthorizationCodeRequestOptions
 
) {
 
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
 
    const params = {
        client_id: options?.client_id,
        code_challenge: options?.code_challenge,
        code_challenge_method: options?.code_challenge_method,
        redirect_uri: options?.redirect_uri,
        response_type: options?.response_type,
        scope:options?.scope,
        state:`${options?.state}`,
        nonce:options?.nonce,
        returnUrl:options?.ReturnUrl
      }
 
 
 
  return fetch(`${localStorage.getItem("REACT_APP_API_URL")}/connect/authorize`, {
    method: 'POST',
    body: new URLSearchParams(params).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((data: any) => {
    store.accessToken = data.access_token
    return data
  })
  .catch((error: any) => {
    throw error
  })
}