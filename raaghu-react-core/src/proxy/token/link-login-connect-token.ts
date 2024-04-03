import { RestService } from "../../services/rest.service";
import { LinkLoginConnectTokenRequestOptions } from "../models";

export const getLinkLoginToken =
  async function getAbpApplicationTokenService(
      options: LinkLoginConnectTokenRequestOptions
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
              LinkUserId: options.LinkUserId,
          }
      })
          .then((res: any) => {
              return res;
          })
          .catch((error: any) => {
              throw error;
          });
  };
