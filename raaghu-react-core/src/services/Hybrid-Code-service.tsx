import { store } from '../utils/internal-store-utils'
import { getHybridToken } from '../proxy/hybrid-token/hybrid-code';

export const hybridCodeService = async (
  response_type: string,
  client_id: string,
  redirect_uri: string,
  scope: string,
) => {

  const getRandomString = (length: any) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const state = getRandomString(16);
  localStorage.setItem('state', state);

  const nonce = getRandomString(16);
  localStorage.setItem('nonce', nonce);

  return await getHybridToken({
    client_id: client_id,
    redirect_uri: redirect_uri,
    response_type: response_type,
    scope: scope,
    state: state,
    nonce: nonce
  })
    .then((data: any) => {
      store.accessToken = data.access_token
      return data
    })
    .catch((error: any) => {
      throw error
    })
}