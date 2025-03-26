import axios from "axios";

import {renderUrl} from "../../basicUrl"

let baseUrl=`${renderUrl}/user`;


export function httpGetAllUsers(token){
    return axios.get(baseUrl,{
        headers: { "token": token },
    })
}
export function httpGetUserById(id,token){
    return axios.get(baseUrl+"/"+id,{
        headers: { "token": token },
    })
}

export function httpAddUser(usr){
    return axios.post(baseUrl,usr)

}

export function httpUpdateUserById(id,user,token){
    return axios.put(baseUrl+"/"+id,user,{
        headers: { "token": token },
    })

}
export function httpUpdateUserPassword(id,pass,token){
    return axios.put(baseUrl+"/password/"+id,pass,{
        headers: { "token": token },
    })

}
export function httpLoginUser(usMail,pass,captchaToken){
    return axios.post(baseUrl+"/login",{mail:usMail,password:pass,captchaToken:captchaToken})

}