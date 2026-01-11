import { showSuccess } from "~/composables/utils/toast";
import ClassService from "../services/ClassService";

export default {
  data() {
    return {
      classItem: { id: 0, name: "" }, // form input data
      classes: [],                    // list of classes from API
      editingId: null,                // track which item is being edited
      isLoading: false,               // loading spinner state
      errors: {},                     // validation errors
      toastMessage: "",               // message for bootstrap toast
    };
  },

  methods: {
    // ✅ Load all classes from API
    async loadClasses() {
      this.isLoading = true;
      try {
        this.classes = await ClassService.fetchAll();
      } catch (err) {
        console.error(err);
        this.toastMessage = "ទាញទិន្នន័យមិនបានទេ 🥵";
        this.showToast();
      } finally {
        this.isLoading = false;
      }
    },

    // ✅ Save (Create or Update) a class with duplicate check
    async saveClass() {
      this.errors = {};

      // 1️⃣ Validate input
      if (!this.classItem.name.trim()) {
        this.errors.name = "សូមបញ្ចូលឈ្មោះថ្នាក់";
        return;
      }

      // 2️⃣ Check duplicate name (ignore same class when editing)
      const duplicate = this.classes.some(
        (c) =>
          c.name.trim().toLowerCase() === this.classItem.name.trim().toLowerCase() &&
          c.id !== this.classItem.id
      );

      if (duplicate) {
        // 👉 Either show a browser alert
        // alert("ថ្នាក់រៀនជាន់គ្នា");
        // 👉 Or use toast (recommended)
        this.toastMessage = "ថ្នាក់រៀនជាន់គ្នា ❗";
        this.showToast();
        return;
      }

      try {
        // 3️⃣ Call API
        await ClassService.createClass(this.classItem);

        // 4️⃣ Set toast message
        this.toastMessage = this.editingId
          ? "កែប្រែបានជោគជ័យ ✅"
          : "បង្កើតបានជោគជ័យ ✅";

        // 5️⃣ Reset form and reload list
        this.resetForm();
        await this.loadClasses();
        this.showToast();
      } catch (err) {
        console.error(err);
        this.toastMessage = "មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យ ❌";
        this.showToast();
      }
    },

    // ✅ Edit button clicked
    editClass(c) {
      this.classItem = { id: c.id, name: c.name };
      this.editingId = c.id;
    },

    // ✅ Cancel editing
    cancelEdit() {
      this.resetForm();
    },

    // ✅ Toggle active/inactive status
    async toggleStatus(id) {
      try {
        await ClassService.toggleStatus(id);
        this.toastMessage = "ប្តូរស្ថានភាពបានជោគជ័យ ✅";
        this.loadClasses();
        this.showToast();
      } catch (err) {
        console.error(err);
        this.toastMessage = "ប្តូរស្ថានភាពបរាជ័យ ❌";
        this.showToast();
      }
    },

    // ✅ Reset form
    resetForm() {
      this.classItem = { id: 0, name: "" };
      this.editingId = null;
      this.errors = {};
    },

    // ✅ Show Bootstrap toast message
    showToast() {
      const toastEl = document.getElementById("successToast");
      if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, { delay: 3000, autohide: true });
        toast.show();
      }
    },
  },

  mounted() {
    this.loadClasses();
  },
};
