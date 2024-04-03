
import { impersonateToken } from "../proxy/multi-tenancy/impersonate-tenant";
import { store } from "../utils/internal-store-utils";

export const impersonateService= async(access_token:string)=>{
    try {
        return await impersonateToken({
            access_token: access_token,
            includeLocalizationResources: false,
            token_type: "",
            expires_in: undefined,
            language: "",
            api_url: ""
        }).then((res:any)=>{
            store.accessToken=res.access_token;
            store.auth = res.auth.grantedPolicies;
            return res
        })
    }
    catch (error) {
        // Handle error
        console.log(error)
        return console.log(error)
      }
}