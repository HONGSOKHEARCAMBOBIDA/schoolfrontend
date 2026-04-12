import axios from "axios";
import Cookies from "js-cookie";

function getToken() {
  return Cookies.get("token");
}

export default {
  fetchAcademicYears() {
    return axios.get("http://localhost:8080/viewacademicyear", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  fetchClasses() {
    return axios.get("http://localhost:8080/class", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  fetchTypeExams() {
    return axios.get("http://localhost:8080/typeexam", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  fetchAssignedSubjects(classId) {
    return axios.get("http://localhost:8080/viewclassasignsubject", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: { class_id: classId },
    });
  },

  fetchExamComponents(classId, subjectId) {
    return axios.get("http://localhost:8080/examcomponent", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: { class_id: classId, subject_id: subjectId },
    });
  },

  fetchScores(filters) {
    return axios.get("http://localhost:8080/scoreavg", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: filters,
    });
  },

  updateScore(id, payload) {
    return axios.put(`http://localhost:8080/score/${id}`, payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  deleteScore(id) {
    return axios.delete(`http://localhost:8080/score/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  }
};
