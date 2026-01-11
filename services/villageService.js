import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
export const villageService = {
  async fetchVillage(communceId) {
    return axios.get(`${API_URL}/village/${communceId}`, {
      headers: authHeaders(),
    });
  },
};
