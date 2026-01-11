import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "~/composables/constants";
export default {
    async fetchRoles(){
        return axios.get(`${API_URL}/role`,{
           headers: authHeaders()
        });

    },
    async createRole(role){
        return axios.post(`${API_URL}/role`,role,{
            headers: authHeaders()

        })
    },
    async updateRole(id,role){
        return axios.put(`${API_URL}/role/${id}`,role,{
            headers:authHeaders()
        });

    },
    async toggleStatus(id,isActive){
        return axios.put(`${API_URL}/changestatusrole/${id}`,{is_active: !isActive,},{headers: authHeaders()})
    }
}