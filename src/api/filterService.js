import axios from "axios";

import {renderUrl} from "../../basicUrl"

let baseUrl=`${renderUrl}/filter`;


export function httpGetAllFilter(gender){
    return axios.get(`${baseUrl}?gender=${gender}`)

}

export function httpAddFilter(fl,token){
    return axios.post(baseUrl,fl,{
        headers: { "token": token },
    })

}
export function httpDeleteFilterById(id,token){
    return axios.delete(baseUrl+"/"+id,{
        headers: { "token": token },
    })

}