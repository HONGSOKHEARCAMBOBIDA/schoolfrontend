// ~/composables/constants.js
import { getToken } from "./token";
export const API_URL = "https://6mqffthw-8080.asse.devtunnels.ms";
export const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});