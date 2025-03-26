import axios from "axios";

import {renderUrl} from "../../basicUrl"

let baseUrl=`${renderUrl}/brands`;


export function httpGetAllBrands(page,filter){
    const params = new URLSearchParams();
    params.append("page", page);

    if (filter.gender) params.append("gender", filter.gender);
    if (filter.size) params.append("size", filter.size);
    if (filter.category) params.append("category", filter.category);

    let http = `${baseUrl}?${params.toString()}`;
    console.log("http: " +http);
    return axios.get(http);





    // let https=`${baseUrl}?limit=8&page=${page}&gender=Men&size=${filter.size}&category=${filter.category}`
    // console.log(https);
   
}
    
// export function httpGetAllBrands(filters){
//     return axios.get(baseUrl+"?"+filters.toString())
// }

export function httpGetBrandByBrand(brand) {
    return axios.get(`${baseUrl}/brand?brand=${brand}`);
}




export function httpGetNumPages(filter){
    const genderParams = new URLSearchParams(filter).toString();

    return axios.get(baseUrl+"/numPages?"+genderParams,filter)
}

export function httpGetBrandById(id){
    return axios.get(baseUrl+"/"+id)

}

export function httpAddBrand(brd,token){
    return axios.post(baseUrl,brd,{
        headers: { 
            "token": token,
        "Content-Type":"multipart/form-data"
        },
    })
}

export function httpUpdateBrandById(id,brd,token){
    return axios.put(baseUrl+"/"+id,brd,{
        headers: { "token": token,
        "Content-Type": "multipart/form-data" },
    })

}
export function httpDeleteBrandById(id,token){
    return axios.delete(baseUrl+"/"+id,{
        headers: { "token": token },
    })

}