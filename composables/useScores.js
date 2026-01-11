import { ref, watch } from "vue";
import { scoreService } from "~/services/scoreService";
import { academicYearsService } from "~/services/academicyearservice";
import { classService } from "~/services/classService";
import { typeexamService } from "~/services/typeexamService";
import { assignedSubjectService } from "~/services/assignsubjectService";
import { examcomponentservice } from "~/services/examcomponentService";
import { showError,showSuccess } from "./utils/toast";
export function useScores() {
  // Makes this function available for other files to import.
  // function useScore composable function just function contain reactive state and methods
  // in vue use ref() and flutter use .obs
  const academicYears = ref([]);
  const classes = ref([]);
  const assignedSubjects = ref([]);
  const examComponents = ref([]);
  const typeExams = ref([]);
  const scores = ref([]);
  const loading = ref(false);
  const deleteId = ref(null);
  const editingScore = ref(null)
  const openEditModal = (score)=>{
    editingScore.value = {...score,
       exam_date: formatDateOnly(score.exam_date)
    }
   
    const modal = new bootstrap.Modal(document.getElementById("editScoreModal"))
    modal.show()
  }
  const confirmDelete = async()=>{
    if(!deleteId.value) return
    try{ 
      await scoreService.deleteScore(deleteId.value)
      deleteId.value = null;
      showSuccess("លុបបានជោគជ័យ");
      await fetchScores()


    }catch(e)
    {
      showError(`មានបញ្ហា ${e}`)
    }
  }
  const formatDateOnly = (dateStr)=>{
    if(!dateStr) return ""
    return dateStr.split("T")[0]
  }
  const saveEditScore = async () => {
  if (!editingScore.value) return
  try {
    await scoreService.updateScore(editingScore.value.id, {
      mark: parseFloat(editingScore.value.mark),
      exam_date: editingScore.value.exam_date,
    })
    showSuccess("កែប្រែបានជោគជ័យ")
    fetchScores()
    editingScore.value = null
    bootstrap.Modal.getInstance(document.getElementById("editScoreModal")).hide()
  } catch (e) {
    showError(`មានបញ្ហា: ${e}`)
  }
}
  const setDeleteId = (id) =>{
    deleteId.value = id
  }
  // filters
  const selectedAcademicYear = ref("");
  const selectedClass = ref("");
  const selectedSubject = ref("");
  const selectedExamComponent = ref("");
  const selectedTypeExam = ref("");
  const startDate = ref("");
  const endDate = ref("");

  // pagination
  const page = ref(1);
  const limit = ref(10);
  const total = ref(0);
  const pages = ref(0);

  const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

  const fetchScores = async () => {
    loading.value = true;
    try {
      const res = await scoreService.fetchScores({
        academic_year_id: selectedAcademicYear.value,
        class_id: selectedClass.value,
        start_date: startDate.value,
        end_date: endDate.value,
        component_id: selectedExamComponent.value,
        type_exam_id: selectedTypeExam.value,
        page: page.value,
        limit: limit.value,
      });

      scores.value = res.data.data;
      page.value = res.data.page;
      limit.value = res.data.limit;
      total.value = res.data.total;
      pages.value = res.data.pages;
    } finally {
      loading.value = false;
    }
  };

  const fetchAcademicYears = async () => {
    const res = await academicYearsService.fetchAcademicYears();
    academicYears.value = res.data;
  };

  const fetchClasses = async () => {
    const res = await classService.fetchClasses();
    classes.value = res.data;
  };

const fetchAssignedSubjects = async (classId) => {
  assignedSubjects.value = [];
  selectedSubject.value = "";
  if (!classId) return;
  const res = await assignedSubjectService.fetchAssignedSubjects(classId);
  assignedSubjects.value = res.data || [];
};


  const fetchExamComponents = async () => {
    examComponents.value = [];
    selectedExamComponent.value = "";
    if (!selectedSubject.value) return;
    const res = await examcomponentservice.fetchExamComponents(
      selectedClass.value,
      selectedSubject.value
    );
    examComponents.value = res.data || [];
  };

  const fetchTypeExams = async () => {
    const res = await typeexamService.fetchTypeExam();
    typeExams.value = res.data;
  };

  const updateScore = async (score) => {
    const newMark = prompt("Enter new mark:", score.mark);
    if (newMark === null) return;
    const newDate = prompt("Enter new exam date (YYYY-MM-DD):", formatDate(score.exam_date));
    if (newDate === null) return;

    await scoreService.updateScore(score.id, { mark: parseFloat(newMark), exam_date: newDate });
    fetchScores();
  };

  const deleteScore = async (id) => {
    if (!confirm("Are you sure you want to delete this score?")) return;
    await scoreService.deleteScore(id);
    fetchScores();
  };

  // handle pagination
  const changePage = (newPage) => {
    if (newPage < 1 || newPage > pages.value) return;
    page.value = newPage;
    fetchScores();
  };

  // **watch selectedClass to auto fetch subjects**
  watch(selectedClass, async (newVal) => {
    await fetchAssignedSubjects(newVal);
    await fetchScores();
  });
  //watch lets you observe a reactive variable and run a function whenever it changes.
  // selectedClass reactive variable (ref) holding the currently selected class from your dropdown.
  // function (newVal) => runs every time selectedClass changes.
  // newVal is the new value of selectedClass

  // **watch selectedSubject to auto fetch exam components**
  watch(selectedSubject, async (newVal) => {
    await fetchExamComponents();
    await fetchScores();
  });

  return {
    // state
    academicYears,
    classes,
    assignedSubjects,
    examComponents,
    typeExams,
    scores,
    loading,
    selectedAcademicYear,
    selectedClass,
    selectedSubject,
    selectedExamComponent,
    selectedTypeExam,
    startDate,
    endDate,
    page,
    limit,
    total,
    pages,
    // methods
    formatDate,
    fetchScores,
    fetchAcademicYears,
    fetchClasses,
    fetchAssignedSubjects,
    fetchExamComponents,
    fetchTypeExams,
    updateScore,
    deleteScore,
    changePage,
    setDeleteId,
    confirmDelete,
    editingScore,
    openEditModal,
    saveEditScore
  };
}
