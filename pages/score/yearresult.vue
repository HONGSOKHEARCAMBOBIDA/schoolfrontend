<template>
    <div class="p-5 pt-5">
          <div class="pt-3">
    <!-- Filters -->
            <div class="card">
                  <div class="p-3 d-flex gap-3 align-items-center">
      <select v-model="selectedAcademicYear" @change="fetchScores" class="form-select form-select-lg shadow-sm" style="flex: 1;">
        <option value="">📅 ឆ្នាំសិក្សា</option>
        <option v-for="year in academicYears" :key="year.id" :value="year.id">{{ year.year_name }}</option>
      </select>

      <select v-model="selectedClass" @change="fetchScores" class="form-select form-select-lg shadow-sm" style="flex: 1;">
        <option value="">🏫 ថ្នាក់</option>
        <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.name }}</option>
      </select>
    </div>

            </div>

    <!-- Table -->
            <div class="pt-2">
                  <div class="table-responsive card p-4">
      <table class="table table-hover align-middle text-center mb-0">
        <thead class="table-primary text-uppercase thead">
          <tr>
            <th>ល.រ</th>
            <th class="text-start">ឈ្មោះសិស្ស</th>
            <th>ពិន្ទុសរុបប្រចាំឆ្នាំ</th>
            <th>ចំណាត់ថ្នាក់សិស្ស</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="3" class="text-muted py-4">កំពុងទាញយកទិន្នន័យ... ⏳</td>
          </tr>

          <tr v-else v-for="(s, index) in scores" :key="s.student_id">
            <td>{{ index +1 }}</td>
            <td class="text-start fw-medium">{{ s.student_name }}</td>
            <td class="fw-bold text-primary">{{ parseFloat(s.avg_mark).toFixed(2) }}</td>
            <td class="fw-bold text-primary">{{ parseFloat(s.rank)}}</td>
            
          </tr>

          <tr v-if="!loading && scores.length === 0">
            <td colspan="3" class="text-muted py-4">មិនមានពិន្ទុសិស្សនៅឡើយទេ 😢</td>
          </tr>
        </tbody>
      </table>
    </div>

            </div>
  </div>

    </div>
</template>
<style scoped>

.thead th {
  position: sticky;
  top: 0;
  background: #1f497d;
  color: #fff;
  z-index: 2;
}
</style>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      selectedAcademicYear: '',
      selectedClass: '',
      scores: [],
      academicYears: [],
      classes: [],
      loading: false,
    };
  },
  methods: {
    getToken() {
      return Cookies.get('token');
    },
    async fetchAcademicYears() {
      try {
        const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/viewacademicyear', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.academicYears = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchClasses() {
      try {
        const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/class', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.classes = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    async fetchScores() {
      this.loading = true;
      try {
        const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/scoreAnnual', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
          params: {
            academic_year_id: this.selectedAcademicYear,
            class_id: this.selectedClass,
          },
        });
        this.scores = res.data;
      } catch (err) {
        console.error(err);
        this.scores = [];
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchAcademicYears();
    this.fetchClasses();
    this.fetchScores();
  },
};
</script>
