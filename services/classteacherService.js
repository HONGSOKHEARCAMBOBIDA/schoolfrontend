// services/teacherService.js
import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
import Cookies from "js-cookie";

const getToken = () => Cookies.get("token");

const api = axios.create({
  baseURL: `${API_URL}`,
  headers: authHeaders()
});

export const teacherService = {
  async getTeachers() {
    return api.get("/viewuser?role_id=4");
  },
  async assignTeacherToClass(payload) {
    return api.post("/addteachertoclass", payload);
  },
  async deactivateClassTeacher(classTeacherId) {
    return api.put(`/chnagestatusofclassteacher/${classTeacherId}`);
  }
};
