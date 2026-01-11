import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
export const disabilityservice = {
  async fetchDisabilities() {
    return axios.get(`${API_URL}/disabilities`, {
      headers: authHeaders(),
    });
  },
};
