import { ref, watch } from "vue";
import { studentService } from "~/services/studentService";
import { showError,showSuccess } from "./utils/toast";
export function useStudent() {
  const students = ref([]);
  const searchName = ref("");
  const selectedAcademicYear = ref("");
  const selectedClass = ref("");
  const selectPoor = ref("");
  const selectDisability = ref("");
  const loading = ref(false);
   const student = reactive({
    id: 0,
    name: "",
    dob: "",
    gender: 0,
    phone: "",
    village_id: 0,
    mother_name: "",
    father_name: "",
    mother_occupation: "",
    father_occupation: "",
    is_poor: 0,
    is_disability: 0,
    disability_ids: [],
    class_id: null,
    academic_year_id: null
  });
  const provinces = ref([]);
  const districts = ref([]);
  const communes = ref([]);
  const villages = ref([]);
  const disabilities = ref([]);
  const selectedProvince = ref("");
  const selectedDistrict = ref("");
  const selectedCommune = ref("");
    const resetForm = () => {
    Object.assign(student, {
      id: 0,
      name: "",
      dob: "",
      gender: 0,
      phone: "",
      village_id: 0,
      mother_name: "",
      father_name: "",
      mother_occupation: "",
      father_occupation: "",
      is_poor: 0,
      is_disability: 0,
      disability_ids: [],
      class_id: null,
      academic_year_id: null,
    });
    selectedProvince.value = "";
    selectedDistrict.value = "";
    selectedCommune.value = "";
    districts.value = [];
    communes.value = [];
    villages.value = [];
  };
    const saveStudent = async () => {
    try {
      const payload = {
        ...student,
        gender: Number(student.gender),
        village_id: Number(student.village_id),
        disability_id: student.disability_ids,
      };
      await studentService.saveStudent(payload);
      showSuccess(student.id ? "កែប្រែបានជោគជ័យ ✅" : "បង្កើតសិស្សបានជោគជ័យ ✅");
      resetForm();
    } catch (err) {
      console.error(err);
      showError("រក្សាទុកសិស្សមិនបាន 🥵");
    }
  };
    const fetchInitialData = async () => {
    try {
      provinces.value = (await studentService.fetchProvinces()).data;
      disabilities.value = (await studentService.fetchDisabilities()).data.data;
    } catch (e) {
      console.error("Failed to fetch initial data", e);
    }
  };

  const fetchDistricts = async () => {
    if (!selectedProvince.value) return;
    const res = await studentService.fetchDistricts(selectedProvince.value);
    districts.value = res.data;
  };

  const fetchCommunes = async () => {
    if (!selectedDistrict.value) return;
    const res = await studentService.fetchCommunces(selectedDistrict.value);
    communes.value = res.data;
  };

  const fetchVillages = async () => {
    if (!selectedCommune.value) return;
    const res = await studentService.fetchVillages(selectedCommune.value);
    villages.value = res.data;
  };
  const fetchStudents = async () => {
    try {
      loading.value = true;
      const res = await studentService.fetchStudents({
        name: searchName.value,
        academic_year_id: selectedAcademicYear.value,
        class_id: selectedClass.value,
        is_poor: selectPoor.value,
        is_disability: selectDisability.value,
      });
      students.value = res.data.students || [];
    } catch (err) {
      console.error("Error fetching students:", err);
      students.value = [];
    } finally {
      loading.value = false;
    }
  };

  // ✅ Watch all filter refs as an array
  watch(
    [searchName, selectedAcademicYear, selectedClass, selectPoor, selectDisability],
    () => {
      fetchStudents();
    }
  );

  return {
    students,
    searchName,
    selectedAcademicYear,
    selectedClass,
    selectPoor,
    selectDisability,
    loading,
    fetchStudents,
    student,
    provinces, districts, communes, villages, disabilities,
    selectedProvince, selectedDistrict, selectedCommune,
   
    saveStudent, resetForm, fetchInitialData,
    fetchDistricts, fetchCommunes, fetchVillages
  };
}
