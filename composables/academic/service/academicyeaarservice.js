// ~/composables/academic/service/AcademicYearService.js
import axios from "axios";
import Cookies from "js-cookie";


import { API_URL } from "~/composables/constants"; 
function getToken() {
  return Cookies.get("token");
}

export default {
  fetchAll: async () => {
    const res = await axios.get(`${API_URL}/viewacademicyear`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  },

  create: async (item) => {
    await axios.post(`${API_URL}/academicyear`, item, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  update: async (item) => {
    await axios.put(`${API_URL}/academicyear`, item, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  toggleStatus: async (id) => {
    await axios.put(`${API_URL}/changestatusacademic/${id}`, {}, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
