import axios from "axios";
import Cookies from "js-cookie";

import { API_URL } from "#imports";
const getToken = () => Cookies.get("token");

export default {
  async fetchAll() {
    return axios.get(`${API_URL}/subject`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  async create(data) {
    return axios.post(`${API_URL}/subject`, data, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  async update(id, data) {
    return axios.put(`${API_URL}/subject`, { id, ...data }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  async toggleStatus(id) {
    return axios.put(`${API_URL}/changestatussubject/${id}`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
