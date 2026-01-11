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

  fetchStudents(academicYearId, classId) {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/viewstudentclasstoaddscore", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: { academic_year_id: academicYearId, class_id: classId },
    });
  },

  fetchSubjects(classId) {
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

  fetchTypeExam() {
    return axios.get("https://6mqffthw-8080.asse.devtunnels.ms/typeexam", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  submitScores(payload) {
    return axios.post("https://6mqffthw-8080.asse.devtunnels.ms/score", payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
