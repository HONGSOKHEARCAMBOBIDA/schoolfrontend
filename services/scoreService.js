// services/scoreService.js
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
import { academicYearsService } from "./academicyearservice";

const API = API_URL;


export const scoreService = {
  fetchScores(params) {
    return axios.get(`${API}/score`, {
      headers: authHeaders(),
      params,
    });
  },


  updateScore(id, data) {
    return axios.put(`${API}/score/${id}`, data, {
      headers: authHeaders(),
    });
  },

  deleteScore(id) {
    return axios.delete(`${API}/score/${id}`, {
      headers: authHeaders(),
    });
  },
};
