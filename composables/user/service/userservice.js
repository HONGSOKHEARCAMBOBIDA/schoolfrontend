import axios from "axios";
import Cookies from "js-cookie";

export default {
  getToken() {
    return Cookies.get("token");
  },

  async fetchUsers(filters = {}) {
    const params = {};
    if (filters.nameKh) params.name_kh = filters.nameKh;
    if (filters.roleId) params.role_id = filters.roleId;

    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/viewuser", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params,
    });
  },

  async toggleUserStatus(userId, isActive) {
    return axios.put(
      `https://6mqffthw-8080.asse.devtunnels.ms/changestatususer/${userId}`,
      { is_active: !isActive },
      { headers: { Authorization: `Bearer ${this.getToken()}` } }
    );
  },

  async fetchTeacherSubjects(userId) {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/getteachersubjectbyteacherid", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: { user_id: userId },
    });
  },
};
