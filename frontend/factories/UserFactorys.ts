//eslint-disable
import {Store} from "redux";
import {UserTokenType} from "../types";
import {$crud} from "./CrudFactory";
export interface LoginParams{
     userName?:string,
     password?:string
}

export class UserFactory {
   private store:Store;

   async login (params:LoginParams):Promise<UserTokenType>{
       const {data: token} = await $crud.post<LoginParams, UserTokenType>("create/web/login", {
           ...params,
           session: true
       });

       if(token.type === "login"){
           this.setToken(token.jwt);
       }

       return token;
   }

   setToken (token){
       localStorage.setItem("login_token", token);
   }
}
export const $user = new UserFactory();
