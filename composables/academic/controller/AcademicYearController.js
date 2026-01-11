
import AcademicYearService from "../service/academicyeaarservice";
import { showError,showSuccess } from '~/composables/utils/toast'
export default {
  async fetchYears(setState) {
    try {
      const data = await AcademicYearService.fetchAll();
      setState(data);
    } catch (err) {
      showError("ទាញទិន្ន័យមិនបានទេ 🥵");
    }
  },

  async save(item, editingId, resetForm, fetchYears) {
    try {
      if (editingId) {
        await AcademicYearService.update(item);
        showSuccess("កែប្រែបានជោគជ័យ ✅");
      } else {
        await AcademicYearService.create(item);
        showSuccess("បង្កើតបានជោគជ័យ ✅");
      }
      resetForm();
      await fetchYears();
    } catch (err) {
      console.error(err);
    }
  },

  async toggle(id, fetchYears) {
    try {
      await AcademicYearService.toggleStatus(id);
      showSuccess("កែប្រែស្ថានភាពបានជោគជ័យ")
      await fetchYears();
    
    } catch (err) {
      console.error(err);
    }
  },
};
