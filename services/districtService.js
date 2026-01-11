import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
const API = API_URL;
export const districtService = {
    async fetchDistrict(provinceId){
        return axios.get(`${API}/district/${provinceId}`,{
            headers: authHeaders()
        })
    }
}