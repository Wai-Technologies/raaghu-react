import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
 
import { store } from '../utils/internal-store-utils'
import { getAuthToken } from '../proxy/auth-token/auth-code';
export const authCodeService = async (
  response_type: string,
  client_id: string,
  redirect_uri: string,
  scope: string,
  ReturnUrl:string
) => {

  const generateCodeVerifier = () => {
    const array = new Uint8Array(45);
    window.crypto.getRandomValues(array);
    const codeVerifier = btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    return codeVerifier;
  };
 
 
  const getRandomString = (length:any) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
 
 
  const generateCodeChallenge = (codeVerifier: any) => {
    const hashedVerifier = sha256(codeVerifier);
    const base64EncodedVerifier = Base64.stringify(hashedVerifier);
    const codeChallenge = base64EncodedVerifier
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    return codeChallenge;
  };
 
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  localStorage.setItem('codeVerifier', codeVerifier);
  localStorage.setItem('codeChallenge', codeChallenge);
  const state = `${getRandomString(16)};${ReturnUrl}`;
  localStorage.setItem('state', state);
 
  const nonce = getRandomString(16);
  localStorage.setItem('nonce', nonce);
 
 
 
 
  return await getAuthToken({
    client_id: client_id,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    redirect_uri: redirect_uri,
    response_type: response_type,
    scope: scope,
    state:state,
    nonce:nonce,
    ReturnUrl:ReturnUrl
  })
    .then((data: any) => {
      store.accessToken = data.access_token
      return data
    })
    .catch((error: any) => {
      throw error
    })
}