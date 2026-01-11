import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
const API = API_URL;
export const academicYearsService = {
  fetchAcademicYears() {
    return axios.get(`${API}/viewacademicyear`, {
      headers: authHeaders(),
    });
  },
};
