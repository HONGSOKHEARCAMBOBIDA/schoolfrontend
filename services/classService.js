import axios from 'axios'
import { API_URL } from '#imports'
import { authHeaders } from '#imports'
const API = API_URL;
export const classService = {
  fetchClasses() {
    return axios.get(`${API}/class`, {
      headers: authHeaders(),
    })
  },
}
