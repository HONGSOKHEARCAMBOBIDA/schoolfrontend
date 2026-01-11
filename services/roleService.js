import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
export const roleService = {
  fetchRoles() {
    return axios.get(`${API_URL}/role`, {
      headers: authHeaders(),
    });
  },
  createRole(role) {
    return axios.post(`${API_URL}/role`, role, {
      headers: authHeaders(),
    });
  },
  updateRole(id, role) {
    return axios.put(`${API_URL}/role/${id}`, role, {
      headers: authHeaders(),
    });
  },
  toggleStatus(id) {
  return axios.put(`${API_URL}/changestatusrole/${id}`, {}, {
    headers: authHeaders(),
  });
}

};
