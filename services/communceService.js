import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
const API = API_URL;
export const communceService = {
    async fetchcommunce(districtId){
        return axios.get(`${API}/communce/${districtId}`,{
            headers: authHeaders()
        })
    }
}