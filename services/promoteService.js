import axios from "axios";
import { API_URL } from "#imports";
import { authHeaders } from "#imports";

export const promoteService = {
  fetchScore(academicYear, classId, startDate, endDate,studentName) {
    return axios.get(`${API_URL}/scoreavg>5`, {
      headers: authHeaders(),
      params: {
        academic_year_id: academicYear,
        class_id: classId,
        start_date: startDate,
        end_date: endDate,
        student_name: studentName
      },
    });
  },

  promoteStudent(studentID, toClassID, fromClassID, academicYearID) {
    return axios.post(
      `${API_URL}/promote`,
      {
        student_id: studentID,
        from_class_id: fromClassID,
        to_class_id: toClassID,
        from_academic_year_id: academicYearID,
      },
      {
        headers: authHeaders(),
      }
    );
  },
fetchPromote(fromAcademicID, fromClassID, name, toAcademicID, toClassID) {
    return axios.get(`${API_URL}/promote`, {
      headers: authHeaders(),
      params: {
        academic_year_id: fromAcademicID,
        class_id: fromClassID,
        name: name,
        to_academic_year_id: toAcademicID,
        to_class_id: toClassID,
      },
    });
  },
   deletePromotion(promotionID) {
    return axios.delete(`${API_URL}/promote/${promotionID}`, {
      headers: authHeaders(),
    });
  },
};
