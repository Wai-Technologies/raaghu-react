import { store } from "../utils/internal-store-utils";

export const isgrantedpolicies = (pagekey:string, data:any) => {
   const auth = JSON.parse(JSON.stringify(data));
   if(JSON.stringify(data)!= "{}"){
      if (pagekey == "home") {
         return true
      } else {
         return (auth[pagekey])
      }
 
   }
};

export const getGrantedSideNavItems = (policies: any) => {

   function copy(o: any) {
      return Object.assign({}, o);
   }

   const item = policies.map(copy).filter(function f(o: any) {
      const auth = JSON.parse(JSON.stringify(store.auth));
      if (JSON.stringify(auth) != "{}") {
         for (const key in auth) {
            if (key == o.permission || o.label == "Home") {
               return true;
            }
         }
      }
      else if(o.label == "Home"){
         return true
      }
      if (o.children) {
         return (o.children = o.children.map(copy).filter(f)).length;
      }
      return false;
   });

   return item;
};

