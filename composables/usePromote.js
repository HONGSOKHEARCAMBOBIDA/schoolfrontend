import { ref } from "vue";
import { promoteService } from "~/services/promoteService";
import { showError, showSuccess } from "./utils/toast";

export function usePromote() {
  const scores = ref([]);
  const loading = ref(false);
  const selectedAcademicYear = ref("");
  const selectedClass = ref("");
  const studentName = ref("");
  const promotes = ref([])
  const name = ref("");
  const oldacademic = ref("")
  const newacademic = ref("")
  const oldclasss = ref("")
  const newclass = ref("")

const fetchPromote = async () => {
  loading.value = true;
  try {
    const res = await promoteService.fetchPromote(
      oldacademic.value,
      oldclasss.value,
      name.value,
      newacademic.value,
      newclass.value
    );

    // Make sure promotes is always an array
    promotes.value = Array.isArray(res.data?.data) ? res.data.data : [];

   
  } catch (e) {
    showError(`${e}`);
    promotes.value = []; // fallback to empty array on error
  } finally {
    loading.value = false;
  }
};

  // Fetch scores
  const fetchScore = async () => {


    loading.value = true;
    try {
      const res = await promoteService.fetchScore(
        selectedAcademicYear.value,
        selectedClass.value,
        "", // startDate (if needed)
        "",  // endDate (if needed)
        studentName.value
      );

      // Map response to include dropdown state
      scores.value = res.data.map(s => ({
        ...s,
        toClassID: s.toClassID || "",
        dropdownOpen: false,
        forceClose: false,
      }));
    } catch (err) {
      console.error(err);
      showError("Failed to fetch scores!");
      scores.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Promote student
  const promoteStudent = async (studentID, toClassID) => {
    if (!studentID || !toClassID) {
      showError("សូមជ្រើសថ្នាក់ និងសិស្ស!");
      return;
    }

    try {
      await promoteService.promoteStudent(
        studentID,
        toClassID,
        selectedClass.value,
        selectedAcademicYear.value
      );
      showSuccess("តំឡេីងថ្នាក់សិស្សបានជោគជ័យ");
      fetchScore(); // refresh the list
    } catch (err) {
      
      showError(`${e}`);
    }
  };
  const deletePromotion = async (promotionID) => {
    try {
      await promoteService.deletePromotion(promotionID);
      showSuccess("លុបការលើកថ្នាក់បានជោគជ័យ");
      fetchPromote();
    } catch (err) {
      console.error(err);
      showError("បរាជ័យក្នុងការលុប: " + (err.message || ""));
    }
  };

  return {
    scores,
    loading,
    selectedAcademicYear,
    selectedClass,
    fetchScore,
    promoteStudent,
    studentName,
    deletePromotion,
    promotes,
    oldacademic,
    newacademic,
    name,
    oldclasss,
    newclass,
    fetchPromote
  };
}
