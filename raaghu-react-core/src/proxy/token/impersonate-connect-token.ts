import { RestService } from "../../services/rest.service";
import { ImpersonationConnectTokenRequestOptions } from "../models";

export const getImpersonationToken =
  async function getAbpApplicationTokenService(
      options: ImpersonationConnectTokenRequestOptions
  ) {
      return RestService("/connect/token", {
          method: "POST",
          headers: {
              "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
              grant_type: options.grant_type,
              scope: options.scope,
              client_id: options.client_id,
              access_token: options.access_token,
              TenantId: options.TenantId,
              UserId: options.UserId,
              TenantUserName: options.TenantUserName
          }
      })
          .then((res: any) => {
              return res;
          })
          .catch((error: any) => {
              throw error;
          });
  };
