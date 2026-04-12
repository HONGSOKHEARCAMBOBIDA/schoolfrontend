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

  fetchStudents(academicYearId, classId) {
    return axios.get("http://localhost:8080/viewstudentclasstoaddscore", {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: { academic_year_id: academicYearId, class_id: classId },
    });
  },

  fetchSubjects(classId) {
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

  fetchTypeExam() {
    return axios.get("http://localhost:8080/typeexam", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  submitScores(payload) {
    return axios.post("http://localhost:8080/score", payload, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
