import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
const API = API_URL;
export const assignedSubjectService = {
  fetchAssignedSubjects(classId) {
    return axios.get(`${API}/viewclassasignsubject`, {
      headers: authHeaders(),
      params: { class_id: classId },
    });
  },
};
