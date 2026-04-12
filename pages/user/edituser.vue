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

      <!-- Back Button -->
      <div class="mb-4">
        <button @click="$router.back()" class="btn btn-outline-primary">
          <i class="fas fa-arrow-left me-2"></i>ត្រលប់ក្រោយ
        </button>
      </div>

      <!-- Form Card -->
      <div class="card shadow-sm rounded-4 p-5">
        <h4 class="mb-4 fw-bold text-center text-primary">កែប្រែព័ត៌មានអ្នកប្រើប្រាស់</h4>
        
        <!-- User Search Section -->
        <div class="row mb-4" v-if="!user.id">
          <div class="col-md-8 mx-auto">
            <div class="input-group">
              <input 
                type="text" 
                v-model="searchQuery" 
                class="form-control" 
                placeholder="ស្វែងរកដោយលេខទូរស័ព្ទ ឬឈ្មោះ" 
                @keyup.enter="searchUser"
              />
              <button class="btn btn-primary" @click="searchUser">
                <i class="fas fa-search me-2"></i>ស្វែងរក
              </button>
            </div>
          </div>
        </div>

        <!-- Search Results -->
        <div class="mb-4" v-if="searchResults.length > 0 && !user.id">
          <h6 class="mb-3">លទ្ធផលស្វែងរក:</h6>
          <div class="list-group">
            <a 
              href="#" 
              v-for="result in searchResults" 
              :key="result.id" 
              class="list-group-item list-group-item-action"
              @click="selectUser(result)"
            >
              <div class="d-flex justify-content-between">
                <div>
                  <strong>{{ result.name_kh }}</strong> - {{ result.phone }}
                  <br>
                  <small class="text-muted">លេខអត្តសញ្ញាណ: {{ result.id_card_no }}</small>
                </div>
                <div>
                  <i class="fas fa-chevron-right"></i>
                </div>
              </div>
            </a>
          </div>
        </div>

        <!-- Edit Form -->
        <form @submit.prevent="updateUser" v-if="user.id">
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
              <label class="form-label">ពាក្យសម្ងាត់ (ទុកចោលបើមិនចង់ផ្លាស់ប្តូរ)</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="********" />
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
            
            <div class="col-md-6">
              <label class="form-label">ស្ថានភាព</label>
              <select v-model="user.is_active" class="form-select" required>
                <option value="1">សកម្ម</option>
                <option value="0">អសកម្ម</option>
              </select>
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="mt-5 text-center">
            <button type="submit" class="btn btn-primary btn-lg px-5 me-3">
              <i class="fas fa-save me-2"></i>រក្សាទុក
            </button>
            <button type="button" @click="resetForm" class="btn btn-outline-secondary btn-lg px-5">
              <i class="fas fa-times me-2"></i>បោះបង់
            </button>
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

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: {
        id: null,
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
        is_active: 1
      },
      provinces: [],
      districts: [],
      communes: [],
      villages: [],
      roles: [],
      selectedProvince: "",
      selectedDistrict: "",
      selectedCommune: "",
      toastMessage: "",
      searchQuery: "",
      searchResults: [],
      originalUser: null
    };
  },
  mounted() {
    this.fetchProvinces();
    this.fetchRoles();
    
    // If user ID is passed as parameter, load user data directly
    const userId = this.$route.params.id;
    if (userId) {
      this.loadUser(userId);
    }
  },
  methods: {
    getToken() {
      return Cookies.get("token");
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

      if (!this.selectedDistrict) return;

      try {
        const res = await axios.get(
          `http://localhost:8080/commune/${this.selectedDistrict}`,
          {
            headers: { Authorization: `Bearer ${this.getToken()}` },
          }
        );
        this.communes = res.data;
      } catch (err) {
        console.error(err);
        this.showError("Failed to fetch communes");
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
    async searchUser() {
      if (!this.searchQuery) {
        this.showError("Please enter a search term");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/users/search?q=${this.searchQuery}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.searchResults = res.data;
      } catch (err) {
        console.error(err);
        this.showError("Failed to search users");
      }
    },
    async loadUser(userId) {
      try {
        const res = await axios.get(`http://localhost:8080/users/${userId}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        
        const userData = res.data;
        this.user = {
          id: userData.id,
          name_kh: userData.name_kh,
          phone: userData.phone,
          id_card_no: userData.id_card_no,
          password: "", // Don't prefill password
          role_id: userData.role_id,
          village_id: userData.village_id,
          gender: userData.gender,
          dob: this.formatDateForInput(userData.dob),
          material_status: userData.material_status,
          manage_class: userData.manage_class,
          is_active: userData.is_active
        };
        
        // Store original user data for comparison
        this.originalUser = {...this.user};
        
        // Load address hierarchy
        await this.loadAddressHierarchy(userData.village_id);
        
      } catch (err) {
        console.error(err);
        this.showError("Failed to load user data");
      }
    },
    async loadAddressHierarchy(villageId) {
      try {
        // Fetch village details to get commune ID
        const villageRes = await axios.get(`http://localhost:8080/village-details/${villageId}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        
        const villageData = villageRes.data;
        this.selectedCommune = villageData.commune_id;
        
        // Fetch communes for the district
        await this.fetchVillages();
        
        // Fetch commune details to get district ID
        const communeRes = await axios.get(`http://localhost:8080/commune-details/${villageData.commune_id}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        
        const communeData = communeRes.data;
        this.selectedDistrict = communeData.district_id;
        
        // Fetch districts for the province
        await this.fetchCommunes();
        
        // Fetch district details to get province ID
        const districtRes = await axios.get(`http://localhost:8080/district-details/${communeData.district_id}`, {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        
        const districtData = districtRes.data;
        this.selectedProvince = districtData.province_id;
        
        // Fetch provinces
        await this.fetchDistricts();
        
      } catch (err) {
        console.error(err);
        this.showError("Failed to load address data");
      }
    },
    selectUser(user) {
      this.loadUser(user.id);
      this.searchResults = [];
      this.searchQuery = "";
    },
    async updateUser() {
      try {
        // Don't send password if it's empty (not changed)
        const dataToSend = {...this.user};
        if (!dataToSend.password) {
          delete dataToSend.password;
        }

        // Convert data types
        const formattedData = {
          ...dataToSend,
          role_id: parseInt(dataToSend.role_id),
          village_id: parseInt(dataToSend.village_id),
          gender: parseInt(dataToSend.gender),
          manage_class: parseInt(dataToSend.manage_class),
          is_active: parseInt(dataToSend.is_active)
        };

        const formData = new FormData();
        Object.keys(formattedData).forEach((key) => {
          if (formattedData[key] !== null && formattedData[key] !== undefined) {
            formData.append(key, formattedData[key]);
          }
        });

        await axios.put(`http://localhost:8080/users/${this.user.id}`, formData, {
          headers: { 
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        this.showSuccess("កែប្រែព័ត៌មានអ្នកប្រើប្រាស់បានជោគជ័យ ✅");
        
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          this.showError(`កែប្រែព័ត៌មានមិនបានទេ: ${err.response.data.error}`);
        } else {
          this.showError("កែប្រែព័ត៌មានមិនបានទេ 🥵");
        }
      }
    },
    resetForm() {
      if (this.originalUser) {
        this.user = {...this.originalUser};
      } else {
        this.user = {
          id: null,
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
          is_active: 1
        };
      }
      this.searchResults = [];
    },
    formatDateForInput(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
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