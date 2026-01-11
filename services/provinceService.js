import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
const API = API_URL;
export const provinceService = {
  async fetchProvinces() {
    return axios.get(`${API}/province`, {
      headers: authHeaders(),
    });
  },
};
