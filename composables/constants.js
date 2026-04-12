// ~/composables/constants.js
import { getToken } from "./token";
export const API_URL = "http://localhost:8080";
export const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});