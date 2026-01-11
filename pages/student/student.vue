<template>
  <div class="p-4">
    <div class="min-vh-100 py-5">
      <div class="container">
        <!-- Card -->
        <div class="card p-4 p-md-5">
          <h4 class="text-center text-primary fw-bold mb-4">ចុះឈ្មោះសិស្សថ្មី</h4>

          <form @submit.prevent="saveStudent">
            <div class="row g-3">
              <!-- Student Info -->
              <div class="col-md-6">
                <label class="form-label">ឈ្មោះ</label>
                <input
                  v-model="student.name"
                  type="text"
                  class="form-control"
                  placeholder="បញ្ចូលឈ្មោះ"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">ថ្ងៃខែឆ្នាំកំណើត</label>
                <input v-model="student.dob" type="date" class="form-control" required />
                
              </div>
              <div class="col-md-6">
                <label class="form-label">ភេទ</label>
                <select v-model.number="student.gender" class="form-select" required>
                  <option value="">ជ្រើសរើសភេទ</option>
                  <option :value="1">ប្រុស</option>
                  <option :value="2">ស្រី</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">ក្រីក្រ</label>
                <select v-model.number="student.is_poor" class="form-select" required>
                  <option value="">ជ្រើសរើស</option>
                  <option :value="1">ក្រីក្រ</option>
                  <option :value="0">មិនក្រីក្រ</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label">ពិការភាព</label>
                <select v-model.number="student.is_disability" class="form-select" required>
                  <option value="">ជ្រើសរើស</option>
                  <option :value="1">ពិការ</option>
                  <option :value="0">មិនពិការ</option>
                </select>
              </div>
              <div class="col-md-12" v-if="student.is_disability === 1">
                <label class="form-label">ជ្រើសរើសប្រភេទពិការភាព</label>
                <select v-model="student.disability_ids" class="form-select" multiple>
                  <option v-for="d in disabilities" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
              </div>

              <div class="col-md-6">
                <label class="form-label">លេខទូរស័ព្ទ</label>
                <input
                  v-model="student.phone"
                  type="text"
                  class="form-control"
                  placeholder="012345678"
                />
              </div>

              <!-- Parent Info -->
               <div class="col-md-6">
                <label class="form-label">ឈ្មោះឪពុក</label>
                <input v-model="student.father_name" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">មុខរបរឪពុក</label>
                <input v-model="student.father_occupation" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">ឈ្មោះម្ដាយ</label>
                <input v-model="student.mother_name" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">មុខរបរម្ដាយ</label>
                <input v-model="student.mother_occupation" type="text" class="form-control" />
              </div>

              <!-- Address -->
              <div class="col-md-3">
                <label class="form-label">ខេត្ត</label>
                <select
                  v-model="selectedProvince"
                  @change="fetchDistricts"
                  class="form-select"
                  required
                >
                  <option value="">ជ្រើសរើសខេត្ត</option>
                  <option v-for="p in provinces" :key="p.id" :value="p.id">{{ p.name }}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">ស្រុក</label>
                <select
                  v-model="selectedDistrict"
                  @change="fetchCommunes"
                  class="form-select"
                  :disabled="!selectedProvince"
                  required
                >
                  <option value="">ជ្រើសរើសស្រុក</option>
                  <option v-for="d in districts" :key="d.id" :value="d.id">{{ d.name }}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">ឃុំ</label>
                <select
                  v-model="selectedCommune"
                  @change="fetchVillages"
                  class="form-select"
                  :disabled="!selectedDistrict"
                  required
                >
                  <option value="">ជ្រើសរើសឃុំ</option>
                  <option v-for="c in communes" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">ភូមិ</label>
                <select
                  v-model.number="student.village_id"
                  class="form-select"
                  :disabled="!selectedCommune"
                  required
                >
                  <option value="">ជ្រើសរើសភូមិ</option>
                  <option v-for="v in villages" :key="v.id" :value="v.id">{{ v.name }}</option>
                </select>
              </div>

              <!-- Class Selection -->
              <div class="col-md-6">
                <label class="form-label">ថ្នាក់សិក្សា</label>
                <select v-model.number="student.class_id" class="form-select">
                  <option value="">ជ្រើសរើសថ្នាក់ (មិនបាច់ក៏បាន)</option>
                  <option v-for="c in classes" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>

              <!-- Academic Year Selection -->
              <div class="col-md-6">
                <label class="form-label">ឆ្នាំសិក្សា</label>
                <select v-model.number="student.academic_year_id" class="form-select">
                  <option value="">ជ្រើសរើសឆ្នាំសិក្សា (មិនបាច់ក៏បាន)</option>
                  <option v-for="a in academicYears" :key="a.id" :value="a.id">
                    {{ a.year_name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="mt-4 text-center">
              <button type="submit" class="btn btn-primary btn-lg px-5">
                {{ student.id ? "កែប្រែ" : "បញ្ជូលឈ្មោះ" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStudent } from "#imports";
import { useclass } from "#imports";
import { useAcademic } from "#imports";
import { CalendarDate } from '@internationalized/date'
export default {
  setup() {
    // composables
    
    const {
      student,
      provinces,
      districts,
      communes,
      villages,
      disabilities,
      selectedProvince,
      selectedDistrict,
      selectedCommune,
      saveStudent,
      resetForm,
      fetchInitialData,
      fetchDistricts,
      fetchCommunes,
      fetchVillages,
    } = useStudent();

    const { classes, fetchClasses } = useclass();
    const { academicYears, fetchAcademicYears } = useAcademic();

    onMounted(() => {
      fetchClasses();
      fetchAcademicYears();
      fetchInitialData();
    });

    return {
      student,
      provinces,
      districts,
      communes,
      villages,
      disabilities,
      selectedProvince,
      selectedDistrict,
      selectedCommune,
      saveStudent,
      resetForm,
      fetchDistricts,
      fetchCommunes,
      fetchVillages,
      classes,
      academicYears,
    };
  },
};
</script>

<style scoped>
* {
  font-family: "Kantumruy Pro", sans-serif;
}
</style>
