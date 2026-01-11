import { ref } from "vue";
import { academicYearsService } from "~/services/academicyearservice";

export function useAcademic() {
  const academicYears = ref([]);
  const selectedAcademicYear = ref(""); // keep it reactive

  const fetchAcademicYears = async () => {
    const res = await academicYearsService.fetchAcademicYears();
    academicYears.value = res.data;
  };

  return {
    academicYears,
    selectedAcademicYear,
    fetchAcademicYears,
  };
}
