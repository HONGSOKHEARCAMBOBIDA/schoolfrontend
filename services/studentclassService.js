import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";

const API = API_URL;

export const studentclassService = {
  // Get all students
  fetchStudents(params) {
    return axios.get(`${API}/getstudent`, {
      headers: authHeaders(),
      params,
    });
  },

  // Assign student to class
  createStudentClass(student_id, class_id, academic_year_id) {
    return axios.post(
      `${API}/assignstudenttoclass`,
      {
        student_id,
        class_id,
        academic_year_id,
      },
      {
        headers: authHeaders(),
      }
    );
  },
};
