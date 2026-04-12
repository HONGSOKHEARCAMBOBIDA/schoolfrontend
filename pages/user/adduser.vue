<template>
  <div class="pt-5 bg-light min-vh-100">
    <div class="container my-5">

      <!-- Toast Container for both success and error -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div
          id="successToast"
          class="toast align-items-center text-bg-success border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="d-flex">
            <div class="toast-body">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
        
        <div
          id="errorToast"
          class="toast align-items-center text-bg-danger border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="d-flex">
            <div class="toast-body">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="card shadow-sm rounded-4 p-5">
        <h4 class="mb-4 fw-bold text-center text-primary">បង្កើតអ្នកប្រើប្រាស់ថ្មី</h4>
        <form @submit.prevent="createUser">
                <div class="col-md-6">
  <label class="form-label">រូបភាព</label>
  <input type="file" @change="handleFileUpload" class="form-control" accept="image/*" />
</div>
          <div class="row g-4">
      


            <!-- User Info -->
            <div class="col-md-6">
              <label class="form-label">ឈ្មោះ</label>
              <input type="text" v-model="user.name_kh" class="form-control" placeholder="បញ្ចូលឈ្មោះ" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">លេខទូរស័ព្ទ</label>
              <input type="text" v-model="user.phone" class="form-control" placeholder="012345678" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">លេខអត្តសញ្ញាណប័ណ្ណ</label>
              <input type="text" v-model="user.id_card_no" class="form-control" placeholder="012345678" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">ពាក្យសម្ងាត់</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="********" required />
            </div>
            <div class="col-md-3">
              <label class="form-label">តួនាទី</label>
              <select v-model="user.role_id" class="form-select" required>
                <option value="">ជ្រើសរើសតួនាទី</option>
                <option v-for="r in roles" :key="r.id" :value="r.id">{{ r.name }}</option>
              </select>
            </div>

            <!-- Address -->
            <div class="col-md-3">
              <label class="form-label">ខេត្ត</label>
              <select v-model="selectedProvince" @change="fetchDistricts" class="form-select" required>
                <option value="">ជ្រើសរើសខេត្ត</option>
                <option v-for="p in provinces" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ស្រុក</label>
              <select v-model="selectedDistrict" @change="fetchCommunes" class="form-select" :disabled="!selectedProvince" required>
                <option value="">ជ្រើសរើសស្រុក</option>
                <option v-for="d in districts" :key="d.id" :value="d.id">{{ d.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ឃុំ / សង្កាត់</label>
              <select v-model="selectedCommune" @change="fetchVillages" class="form-select" :disabled="!selectedDistrict" required>
                <option value="">ជ្រើសរើសឃុំ</option>
                <option v-for="c in communes" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ភូមិ</label>
              <select v-model="user.village_id" class="form-select" :disabled="!selectedCommune" required>
                <option value="">ជ្រើសរើសភូមិ</option>
                <option v-for="v in villages" :key="v.id" :value="v.id">{{ v.name }}</option>
              </select>
            </div>

            <!-- Other Info -->
            <div class="col-md-4">
              <label class="form-label">ភេទ</label>
              <select v-model="user.gender" class="form-select" required>
                <option value="">ជ្រើសរើសភេទ</option>
                <option value="1">ប្រុស</option>
                <option value="2">ស្រី</option>
              </select>
            </div>
            <div class="col-md-5">
              <label class="form-label">ស្ថានភាពគ្រួសារ</label>
              <select v-model="user.material_status" class="form-select" required>
                <option value="">ជ្រើសរើស</option>
                <option value="1">នៅលីវ</option>
                <option value="2">មានគ្រួសារ</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">គ្រប់គ្រងថ្នាក់</label>
              <select v-model="user.manage_class" class="form-select" required>
                <option value="">ជ្រើសរើស</option>
                <option value="1">គ្រប់គ្រងច្រេីន</option>
                <option value="2">គ្រប់គ្រងទាំងអស់</option>
              </select>
            </div>
            <div class="col-md-6">
              <label class="form-label">ថ្ងៃខែឆ្នាំកំណើត</label>
              <input type="date" v-model="user.dob" class="form-control" required />
            </div>
          </div>

          <!-- Submit -->
          <div class="mt-5 text-center">
            <button type="submit" class="btn btn-primary btn-lg px-5">បង្កើត</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: 'Kantumruy Pro', sans-serif;
}

body {
  background-color: #f4f6f9;
}

.card {
  border: none;
}

.form-label {
  font-weight: 500;
}

select.form-select,
input.form-control {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border-radius: 0.4rem;
  padding: 0.6rem 0.75rem;
}

.btn-primary {
  background-color: #1f497d;
  border-color: #1f497d;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: #163a5b;
  border-color: #163a5b;
}

.toast-container {
  z-index: 1080;
}
</style>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: {
        name_kh: "",
        phone: "",
        id_card_no: "",
        password: "",
        role_id: "",
        village_id: "",
        gender: "",
        dob: "",
        material_status: "",
        manage_class: "",
      },
      image: null, 
      provinces: [],
      districts: [],
      communes: [],
      villages: [],
      roles: [],
      selectedProvince: "",
      selectedDistrict: "",
      selectedCommune: "",
      toastMessage: "",
    };
  },
  mounted() {
    this.fetchProvinces();
    this.fetchRoles();
  },
  methods: {
    getToken() {
      return Cookies.get("token");
    },
     handleFileUpload(event) {
      this.image = event.target.files[0]; // 👈 keep file
    },
    async fetchProvinces() {
      try {
        const res = await axios.get("http://localhost:8080/province", {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.provinces = res.data;
      } catch (err) {
        console.error(err);
        this.showError("Failed to fetch provinces");
      }
    },
    async fetchDistricts() {
      this.selectedDistrict = "";
      this.selectedCommune = "";
      this.user.village_id = "";
      this.districts = [];
      this.communes = [];
      this.villages = [];

      if (!this.selectedProvince) return;

      try {
        const res = await axios.get(`http://localhost:8080/district/${this.selectedProvince}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.districts = res.data;
      } catch (err) {
        console.error(err);
        this.showError("Failed to fetch districts");
      }
    },
  async fetchCommunes() {
      this.selectedCommune = "";
      this.user.village_id = "";
      this.communes = [];
      this.villages = [];

      // Add proper validation to check if selectedDistrict has a value
      console.log("district")
      console.log(this.selectedDistrict)
    //   if (!this.selectedDistrict || this.selectedDistrict === "") {
    //     return;
    //   }

      try {
        const res = await axios.get(
          `http://localhost:8080/communce/${this.selectedDistrict}`,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );
        this.communes = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchVillages() {
      this.user.village_id = "";
      this.villages = [];

      if (!this.selectedCommune) return;

      try {
        const res = await axios.get(`http://localhost:8080/village/${this.selectedCommune}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.villages = res.data;
      } catch (err) {
        console.error(err);
        this.showError("Failed to fetch villages");
      }
    },
    async fetchRoles() {
      try {
        const res = await axios.get("http://localhost:8080/role", {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.roles = res.data;
      } catch (err) {
        console.error(err);
        this.showError("Failed to fetch roles");
      }
    },
    async createUser() {
      try {
        // Validate required fields
        if (!this.user.village_id) {
          this.showError("Please select a village");
          return;
        }

        const formData = new FormData();
        Object.keys(this.user).forEach((key) => {
          if (this.user[key] !== null && this.user[key] !== undefined) {
            formData.append(key, this.user[key]);
          }
        });
        if (this.image) {
          formData.append("image", this.image); // 👈 add image
        }

        await axios.post("http://localhost:8080/register", formData, {
          headers: { 
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        this.showSuccess("បង្កើតអ្នកប្រើប្រាស់បានជោគជ័យ ✅");

        // Reset form
        this.user = {
          name_kh: "",
          phone: "",
          id_card_no: "",
          password: "",
          role_id: "",
          village_id: "",
          gender: "",
          dob: "",
          material_status: "",
          manage_class: "",
        };
        this.image = null;
        this.selectedProvince = "";
        this.selectedDistrict = "";
        this.selectedCommune = "";
        this.districts = [];
        this.communes = [];
        this.villages = [];
      } catch (err) {
        console.error(err);
        this.showError("បង្កើតអ្នកប្រើប្រាស់មិនបានទេ 🥵");
      }
    },
    showSuccess(message) {
      this.toastMessage = message;
      const toastEl = document.getElementById("successToast");
      const toast = new bootstrap.Toast(toastEl, { delay: 3000, autohide: true });
      toast.show();
    },
    showError(message) {
      this.toastMessage = message;
      const toastEl = document.getElementById("errorToast");
      const toast = new bootstrap.Toast(toastEl, { delay: 3000, autohide: true });
      toast.show();
    }
  },
};
</script>