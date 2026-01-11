import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
const API = API_URL;
export const typeexamService = {
  fetchTypeExam() {
    return axios.get(`${API}/typeexam`, {
      headers: authHeaders(),
    });
  },
};
