import { ref } from "vue";
import { studentclassService } from "~/services/studentclassService";

export function useStudentClass() {
  const students = ref([]);
  const filteredStudents = ref([]);
  const searchQuery = ref("");

  const form = ref({
    student_id: "",
    class_id: "",
    academic_year_id: "",
  });

  // Fetch students
  const fetchStudents = async () => {
    const { data } = await studentclassService.fetchStudents();
    students.value = data.students || [];
    filteredStudents.value = [...students.value];
  };

  // Filter students by name
  const filterStudents = () => {
    if (!searchQuery.value) {
      filteredStudents.value = [...students.value];
    } else {
      filteredStudents.value = students.value.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
  };

  // Assign student to class
  const assignStudent = async () => {
    await studentclassService.createStudentClass(
      form.value.student_id,
      form.value.class_id,
      form.value.academic_year_id
    );

    // Reset form after success
    // form.value = {
    //   student_id: "",
    //   class_id: "",
    //   academic_year_id: "",
    // };

    // Refresh students
    await fetchStudents();

    // Reapply filter if search is active
    filterStudents();
  };

  return {
    students,
    filteredStudents,
    searchQuery,
    form,
    fetchStudents,
    filterStudents,
    assignStudent,
  };
}
