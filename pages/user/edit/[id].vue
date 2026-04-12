<template>
  <div class="pt-5 bg-light min-vh-100">
    <div class="container my-5">

      <!-- Toast Container -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
        <div id="errorToast" class="toast align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>

      <!-- Update Form -->
      <div class="card shadow-sm rounded-4 p-5">
        <h4 class="mb-4 fw-bold text-center text-primary">កែប្រែអ្នកប្រើប្រាស់</h4>
        <form @submit.prevent="updateUser">
          <div class="col-md-6">
  <label class="form-label">រូបភាព</label>
  <input type="file" @change="handleImageUpload" class="form-control" accept="image/*" />
</div>

          <div class="row g-4">

            <!-- User Info -->
            <div class="col-md-6">
              <label class="form-label">ឈ្មោះ</label>
              <input type="text" v-model="user.name_kh" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">លេខទូរស័ព្ទ</label>
              <input type="text" v-model="user.phone" class="form-control" required />
            </div>
            
            <div class="col-md-6">
              <label class="form-label">លេខអត្តសញ្ញាណប័ណ្ណ</label>
              <input type="text" v-model="user.id_card_number" class="form-control" required />
            </div>
            <div class="col-md-6">
              <label class="form-label">ពាក្យសម្ងាត់ (ទំនេរ = មិនប្តូរ)</label>
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
              <select v-model="user.province_id" @change="fetchDistricts" class="form-select" required>
                <option value="">ជ្រើសរើសខេត្ត</option>
                <option v-for="p in provinces" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ស្រុក</label>
              <select v-model="user.district_id" @change="fetchCommunes" class="form-select" required>
                <option value="">ជ្រើសរើសស្រុក</option>
                <option v-for="d in districts" :key="d.id" :value="d.id">{{ d.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ឃុំ / សង្កាត់</label>
              <select v-model="user.commune_id" @change="fetchVillages" class="form-select" required>
                <option value="">ជ្រើសរើសឃុំ</option>
                <option v-for="c in communes" :key="c.id" :value="c.id">{{ c.name }}</option>
              </select>
            </div>
            <div class="col-md-3">
              <label class="form-label">ភូមិ</label>
              <select v-model="user.village_id" class="form-select" required>
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
            <button type="submit" class="btn btn-primary btn-lg px-5">កែប្រែ</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: {
        name_kh: "",
        phone: "",
        id_card_number: "",
        password: "",
        role_id: "",
        province_id: "",
        district_id: "",
        commune_id: "",
        village_id: "",
        gender: "",
        dob: "",
        material_status: "",
        manage_class: "",
        image: ""
      },
       imageFile: null,
      roles: [],
      provinces: [],
      districts: [],
      communes: [],
      villages: [],
      toastMessage: "",
    };
  },

  async mounted() {
    await this.fetchRoles();
    await this.fetchProvinces();
    await this.fetchUser();
  },

  methods: {
    getToken() {
      return Cookies.get("token");
    },
 handleImageUpload(e) {
    this.imageFile = e.target.files[0]; // store selected file
  },
    async fetchRoles() {
      const res = await axios.get("http://localhost:8080/role", { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.roles = res.data;
    },

    async fetchProvinces() {
      const res = await axios.get("http://localhost:8080/province", { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.provinces = res.data;
    },

    async fetchDistricts() {
      if (!this.user.province_id) return;
      const res = await axios.get(`http://localhost:8080/district/${this.user.province_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.districts = res.data;
      this.communes = [];
      this.villages = [];
    },

    async fetchCommunes() {
      if (!this.user.district_id) return;
      const res = await axios.get(`http://localhost:8080/communce/${this.user.district_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.communes = res.data;
      this.villages = [];
    },

    async fetchVillages() {
      if (!this.user.commune_id) return;
      const res = await axios.get(`http://localhost:8080/village/${this.user.commune_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.villages = res.data;
    },

async fetchUser() {
  const id = this.$route.params.id;
  try {
    const res = await axios.get(`http://localhost:8080/user/${id}`, {
      headers: { Authorization: `Bearer ${this.getToken()}` },
    });

    this.user = res.data;

    // Convert DOB to YYYY-MM-DD
    if (this.user.dob) {
      this.user.dob = this.user.dob.split("T")[0];
    }

    // Resolve location cascade
    await this.resolveLocationTree(this.user.village_id);

  } catch (err) {
    console.error(err);
    this.showToast("មិនអាចទាញទិន្ន័យអ្នកប្រើប្រាស់បានទេ ❌");
  }
},


    async resolveLocationTree(village_id) {
      if (!village_id) return;

      const v = await axios.get(`http://localhost:8080/village-by-id/${village_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.user.commune_id = v.data.commune_id;

      const c = await axios.get(`http://localhost:8080/commune-by-id/${v.data.commune_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.user.district_id = c.data.district_id;

      const d = await axios.get(`http://localhost:8080/district-by-id/${c.data.district_id}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
      this.user.province_id = d.data.province_id;

      await this.fetchDistricts();
      await this.fetchCommunes();
      await this.fetchVillages();
    },

async updateUser() {
  const id = this.$route.params.id;
  try {
    const formData = new FormData();

    // Only append fields if they exist
    Object.keys(this.user).forEach(key => {
      if (this.user[key] !== null && this.user[key] !== undefined) {
        formData.append(key, this.user[key]);
      }
    });
 if (this.imageFile) {
        formData.append("image", this.imageFile);
      }
    await axios.put(`http://localhost:8080/user/${id}`, formData, {
      headers: { 
        Authorization: `Bearer ${this.getToken()}`,
        'Content-Type': 'multipart/form-data'
      },
    });


    this.showToast("កែប្រែអ្នកប្រើប្រាស់បានជោគជ័យ ✅");
    this.$router.push("/user/viewuser");
  } catch (err) {
    console.error(err);
    this.showToast("កែប្រែមិនបានទេ 🥵");
  }
},


    showToast(message) {
      this.toastMessage = message;
      const toastEl = document.getElementById("successToast");
      const toast = new bootstrap.Toast(toastEl, { delay: 3000, autohide: true });
      toast.show();
    },
  },
};
</script>
