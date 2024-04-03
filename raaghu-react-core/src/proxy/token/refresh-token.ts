import { RestService } from '../../services/rest.service'
import {
  RefreshTokenRequestOptions
} from '../models'

export const refreshToken = async function getRefreshTokenService(
  options: RefreshTokenRequestOptions
){
  return RestService('/connect/token', {
   method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      grant_type: options.grant_type,
      refresh_token: options.refresh_token,
      client_id: options.client_id,
    }
  })
}


