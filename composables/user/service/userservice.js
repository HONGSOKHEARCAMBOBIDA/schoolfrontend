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

    return axios.get("http://localhost:8080/viewuser", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params,
    });
  },

  async toggleUserStatus(userId, isActive) {
    return axios.put(
      `http://localhost:8080/changestatususer/${userId}`,
      { is_active: !isActive },
      { headers: { Authorization: `Bearer ${this.getToken()}` } }
    );
  },

  async fetchTeacherSubjects(userId) {
    return axios.get("http://localhost:8080/getteachersubjectbyteacherid", {
      headers: { Authorization: `Bearer ${this.getToken()}` },
      params: { user_id: userId },
    });
  },
};
