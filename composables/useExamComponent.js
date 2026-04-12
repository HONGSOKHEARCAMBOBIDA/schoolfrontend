import { ref, onMounted } from "vue";
import { examcomponentservice } from "~/services/examcomponentService";
import { ClassSubjectService } from "~/services/classsubjectService";
import { showError, showSuccess } from "./utils/toast";
export function useExamComponent() {
  const assignedSubjects = ref([]);
  const examComponents = ref([]);
  const loading = ref(false);
  const toastMessage = ref("");

  const selectedClass = ref("");
  const selectedClassName = ref("");
  const selectedSubject = ref("");
  const selectedSubjectName = ref("");
  const selectedSubjectId = ref(null)
  const classDropdown = ref(false);
  const subjectDropdown = ref(false);

  const editId = ref(null);
  const editName = ref("");
  const newComponentName = ref("");
  const fetchAssignedSubjects = async () => {
    if (!selectedClass.value) return;
    loading.value = true;
    try {
      const res = await ClassSubjectService.fetchAssigned(selectedClass.value);
      assignedSubjects.value = res.data || [];
    } finally {
      loading.value = false;
    }
  };

  const fetchExamComponents = async () => {
    if (!selectedClass.value || !selectedSubject.value) return;
    loading.value = true;
    try {
      const res = await examcomponentservice.fetchExamComponents(
        selectedClass.value,
        selectedSubject.value
      );
      examComponents.value = res.data || [];
    } finally {
      loading.value = false;
    }
  };

  const selectClass = async (c) => {
    selectedClass.value = c.id;
    selectedClassName.value = c.name;
    assignedSubjects.value = [];
    selectedSubject.value = "";
    selectedSubjectName.value = "";
    examComponents.value = [];
    classDropdown.value = false; // <-- close dropdown after click
    await fetchAssignedSubjects();
  };

  const selectSubject = async (s) => {
    selectedSubjectId.value = s.id
    selectedSubject.value = s.subject_id;
    selectedSubjectName.value = s.subject_name;
    subjectDropdown.value = false; // <-- close dropdown after click
    await fetchExamComponents();
  };

  // --- EDIT FUNCTIONALITY ---
  const startEdit = (ec) => {
    editId.value = ec.id;
    editName.value = ec.name;
  };

  const cancelEdit = () => {
    editId.value = null;
    editName.value = "";
  };

  const updateExamComponentHandler = async (id) => {
    if (!editName.value) return;
    try {
      await examcomponentservice.updateExamComponent(
        id,
        editName.value,
        selectedSubject.value
      );
      showSuccess("កែប្រែបានជោគជ័យ ✅")
      // Update the local array without refetch
      const index = examComponents.value.findIndex((ec) => ec.id === id);
      if (index !== -1) {
        examComponents.value[index].name = editName.value;
      }
      cancelEdit();
    } catch (e) {
     showError("មានបញ្ហាក្នុងការកែប្រែ");
    }
  };

  const createExamComponentHandler = async () => {
    if (!newComponentName.value || !selectedSubject.value) {
      showError("សូមបញ្ចូលឈ្មោះប្រភេទនៃការប្រឡង និងជ្រើសរើសមុខវិជ្ជា");
      return;
    }
    try {
      await examcomponentservice.createexamcomponent(
        newComponentName.value,
        selectedSubjectId.value
      );
      showSuccess("ប្រភេទការប្រឡងបង្កេីតបានជោគជ័យ ✅")
      newComponentName.value = ""; // reset input
      await fetchExamComponents(selectClass.value, selectSubject); // refresh list
    } catch (e) {
      toastMessage.value = "មានបញ្ហាក្នុងការបង្កើត Exam Component";
    }
  };

  return {
    assignedSubjects,
    examComponents,
    selectedClass,
    selectedClassName,
    selectedSubject,
    selectedSubjectName,
    classDropdown,
    subjectDropdown,
    editId,
    editName,
    selectClass,
    selectSubject,
    startEdit,
    cancelEdit,
    newComponentName,
    selectedSubjectId,
    updateExamComponent: updateExamComponentHandler,
    createExamComponent: createExamComponentHandler,
  };
}
