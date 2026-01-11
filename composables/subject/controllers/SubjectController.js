import { ref } from "vue";
import SubjectService from "../services/SubjectService";

export default function useSubjectController() {
  const subject = ref({ name: "" });
  const subjects = ref([]);
  const editingId = ref(null);
  const errors = ref({});
  const toastMessage = ref("");
  const isLoading = ref(false);

  const fetchSubjects = async () => {
    isLoading.value = true;
    try {
      const res = await SubjectService.fetchAll();
      subjects.value = res.data;
    } catch (err) {
      toastMessage.value = "ទាញទិន្ន័យមិនបានទេ 🥵";
    } finally {
      isLoading.value = false;
    }
  };

  const saveSubject = async () => {
    errors.value = {};
    if (!subject.value.name.trim()) {
      errors.value.name = "សូមបញ្ចូលឈ្មោះមុខវិជ្ជា";
      return;
    }

    isLoading.value = true;
    try {
      if (editingId.value) {
        await SubjectService.update(editingId.value, { name: subject.value.name });
        toastMessage.value = "កែប្រែបានជោគជ័យ ✅";
      } else {
        await SubjectService.create({ name: subject.value.name });
        toastMessage.value = "បង្កើតបានជោគជ័យ ✅";
      }

      subject.value.name = "";
      editingId.value = null;
      fetchSubjects();

      const toastEl = document.getElementById("successToast");
      const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
      toast.show();
    } catch (err) {
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  };

  const editSubject = (s) => {
    subject.value.name = s.name;
    editingId.value = s.id;
  };

  const cancelEdit = () => {
    subject.value.name = "";
    editingId.value = null;
    errors.value = {};
  };

  const toggleStatus = async (s) => {
    try {
      await SubjectService.toggleStatus(s.id);
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    subject,
    subjects,
    editingId,
    errors,
    toastMessage,
    isLoading,
    fetchSubjects,
    saveSubject,
    editSubject,
    cancelEdit,
    toggleStatus,
  };
}
