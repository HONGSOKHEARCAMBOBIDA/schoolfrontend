import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "~/composables/constants";
export const rolehaspermissionservice = {
    async fetchPermission(roleId){
        const res = await axios.get(`${API_URL}/roleassignpermission/${roleId}`,
            {
                headers: authHeaders(),
            }
        );
        return res.data;
    },
    async addPermissions(roleId,permissionIds){
        return axios.post(`${API_URL}/rolepermission`,
            {
                role_id:roleId,permission_id:permissionIds
            },
            {
            headers: authHeaders()
        })
    },
    async removePermissions(roleId,permissionIds){
        return axios.delete(`${API_URL}/rolepermission`,{
            data:{role_id:roleId,permission_id:permissionIds},
            headers: authHeaders()
        })
    }
}