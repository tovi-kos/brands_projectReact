import axios from "axios";


import {renderUrl} from "../../basicUrl"

let baseUrl=`${renderUrl}/order`;

export function httpGetAllOrders(token){
    return axios.get(baseUrl,{
        headers: { "token": token },
    })

}
export function httpGetAllOrdersByUserId(id,token){
    return axios.get(baseUrl+"/"+id,{
        headers: { "token": token },
    })

}

export function httpAddOrder(ord,token){
    return axios.post(baseUrl,ord,{
        headers: { "token": token },
    })

}

export function httpUpdateOrderById(id,ord,token){
    return axios.put(baseUrl+"/"+id,ord,{
        headers: { "token": token },
    })

}
export function httpDeleteOrderById(id,token){
    return axios.delete(baseUrl+"/"+id,{
        headers: { "token": token },
    })

}