import axios from 'axios'
import { API_URL } from '#imports'
import { authHeaders } from '#imports'

export const ClassSubjectService = {
  fetchAssigned: (classId) =>
    axios.get(`${API_URL}/viewclassasignsubject`, {
      headers: authHeaders(),
      params: { class_id: classId },
    }),

  fetchNotAssigned: (classId) =>
    axios.get(`${API_URL}/viewclassnotassignsubject`, {
      headers: authHeaders(),
      params: { class_id: classId },
    }),

  assignSubjects: (classId, subjectIds) =>
    axios.post(
      `${API_URL}/aissignsubjecttoclass`,
      {
        class_id: parseInt(classId),
        subject_id: subjectIds,
      },
      { headers: authHeaders() }
    ),

  deleteSubject: (id) =>
    axios.delete(`${API_URL}/deleteclasssubject/${id}`, {
      headers: authHeaders(),
    }),
}
