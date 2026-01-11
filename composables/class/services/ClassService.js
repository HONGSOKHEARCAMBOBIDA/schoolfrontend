import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "#imports";
function getToken(){
    return Cookies.get("token")
}
export default{
    async fetchAll(){
        const res = await axios.get(`${API_URL}/class`,{
            headers:{Authorization:`Bearer ${getToken()}`}
        });
        return res.data
    },
     async createClass(classItem) {
    return await axios.post(`${API_URL}/class`, classItem, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  async toggleStatus(id) {
    return await axios.put(`${API_URL}/changestatusclass/${id}`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
}