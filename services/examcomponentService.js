import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";
import Cookies from "js-cookie";

const getToken = () => Cookies.get("token");
const API = API_URL;
export const examcomponentservice = {
  fetchExamComponents(classId, subjectId) {
    return axios.get(`${API}/examcomponent`, {
      headers: authHeaders(),
      params: { class_id: classId, subject_id: subjectId },
    });
  },

  fetchAssignedSubjects(classId) {
    return axios.get(`${API}/viewclassasignsubject`, {
      headers: authHeaders(),
      params: { class_id: classId },
    });
  },

  updateExamComponent(id, name, subjectId) {
    return axios.put(
      `${API}/examcomponent/${id}`,
      { name, class_subject_id: subjectId },
      { headers: authHeaders() }
    );
  },
  createexamcomponent(name,class_subject_id){
    return axios.post(
      `${API}/examcomponent`,{
        name: name,
        class_subject_id: class_subject_id
      },
      {
        headers: authHeaders()
      }
    )
  }
};
