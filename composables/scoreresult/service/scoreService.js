import axios from "axios";
import Cookies from "js-cookie";

function getToken() {
  return Cookies.get("token");
}

export default {
  fetchAcademicYears() {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/viewacademicyear", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  fetchClasses() {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/class", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  fetchTypeExams() {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/typeexam", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  fetchAssignedSubjects(classId) {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/viewclassasignsubject", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: { class_id: classId },
    });
  },

  fetchExamComponents(classId, subjectId) {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/examcomponent", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: { class_id: classId, subject_id: subjectId },
    });
  },

  fetchScores(filters) {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/scoreavg", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: filters,
    });
  },

  updateScore(id, payload) {
    return axios.put(`https://6mqffthw-8080.asse.devtunnels.ms/score/${id}`, payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  deleteScore(id) {
    return axios.delete(`https://6mqffthw-8080.asse.devtunnels.ms/score/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  }
};
