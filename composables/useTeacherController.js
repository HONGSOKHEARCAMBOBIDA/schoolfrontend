// composables/useTeacherController.js
import { ref, onMounted } from "vue";
// import { teacherService } from "~/services/teacherService";
import { teacherService } from "~/services/classteacherService";
import { showError,showSuccess } from "./utils/toast";
export function useTeacherController() {
  const teachers = ref([]);
  const filteredTeachers = ref([]);
  const showModal = ref(false);
  const selectedTeacher = ref(null);
  const searchQuery = ref("");
  const loading = ref(false);
  const deleteId = ref(null)
  // Toast state
  const toast = ref({ show: false, message: "", type: "success" });

  const comfirmDelete = async ()=>{
    if(!deleteId.value) return
    try{
        await teacherService.deactivateClassTeacher(deleteId.value)
        deleteId.value = null
        showSuccess("លុបបានជោគជ័យ");
        await fetchTeachers();
        filterTeachers()

    }catch(e){
        showError(`មានបញ្ហា ${e}`)

    }
  }

  const setDeleteId = (id) =>{
    deleteId.value = id
  }

  // Form
  const form = ref({
    teacher_id: "",
    class_id: "",
    academic_year_id: ""
  });

  // Helpers


  // Actions
  const fetchTeachers = async () => {
    loading.value = true;
    try {
      const res = await teacherService.getTeachers();
      teachers.value = res.data || [];
      filteredTeachers.value = teachers.value;
    } catch (e) {
      teachers.value = [];
      filteredTeachers.value = [];
    } finally {
      loading.value = false;
    }
  };

  const filterTeachers = () => {
    filteredTeachers.value = teachers.value.filter((t) =>
      t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  };

  const openAssign = (teacher) => {
    selectedTeacher.value = teacher;
    form.value.teacher_id = teacher.id;
    form.value.class_id = "";
    form.value.academic_year_id = "";
    showModal.value = true;
  };

  const closeModal = () => {
    showModal.value = false;
    form.value = { teacher_id: "", class_id: "", academic_year_id: "" };
  };

  const assignClassTeacher = async () => {
    try {
      await teacherService.assignTeacherToClass(form.value);
      showSuccess("បន្ថែមថ្នាក់បានជោគជ័យ");
      await fetchTeachers();
      closeModal();
    } catch(e) {
      showError(`មានបញ្ហាកេីតឡេីង ${e}`);
    }
  };

  const deactivateClassTeacher = async (classTeacherId) => {
    try {
      await teacherService.deactivateClassTeacher(classTeacherId);
      showSuccess("លុបបានជោគជ័យ");
      await fetchTeachers();
    } catch(e) {
      showError(`មានបញ្ហាកេីតឡេីង ${e}`);
    }
  };

  onMounted(async () => {
    await fetchTeachers();
  });

  return {
    teachers,
    filteredTeachers,
    showModal,
    selectedTeacher,
    searchQuery,
    loading,
    toast,
    form,
    // Methods
    filterTeachers,
    openAssign,
    closeModal,
    assignClassTeacher,
    deactivateClassTeacher,
    setDeleteId,
    comfirmDelete
  };
}
