<template>
  <div class=" mt-5 p-4">
    <div class="row">
      <div class="col-12 mb-4">
        <h3 class="text-center text-primary"><i class="bi  me-2"></i>ផ្ទាំងសង្ខេបទូទៅ</h3>
      </div>
      
      <!-- Summary Cards -->
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-primary mb-3 shadow">
          <div class="card-header">សរុបសិស្ស</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.total_students || 0 }}</h2>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-success mb-3 shadow">
          <div class="card-header">សិស្សប្រុស</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.male_students || 0 }}</h2>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-danger mb-3 shadow">
          <div class="card-header">សិស្សស្រី</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.female_students || 0 }}</h2>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-warning mb-3 shadow">
          <div class="card-header">សិស្សក្រីក្រ</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.poor_students || 0 }}</h2>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-info mb-3 shadow">
          <div class="card-header">សិស្សពិការ</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.disabled_students || 0 }}</h2>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-secondary mb-3 shadow">
          <div class="card-header">គ្រូបង្រៀន</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.total_teachers || 0 }}</h2>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-dark mb-3 shadow">
          <div class="card-header">ថ្នាក់រៀន</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.total_classes || 0 }}</h2>
          </div>
        </div>
      </div>
      
      <div class="col-md-3 mb-3" v-for="summary in reports" :key="summary">
        <div class="card text-white bg-success mb-3 shadow">
          <div class="card-header">ឆ្នាំសិក្សា</div>
          <div class="card-body">
            <h2 class="card-title">{{ summary.year_name || 'N/A' }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const reports = ref([])

onMounted(async () => {
  try {
    const token = useCookie('token').value
    const response = await axios.get('http://localhost:8080/api/TotalSummaryStudentsTeachersClassesAcademicYears', {
      headers: { Authorization: `Bearer ${token}` }
    })
    reports.value = response.data
  } catch (error) {
    console.error('Error fetching report:', error)
    alert('កើតមានបញ្ហាក្នុងការទាញទិន្នន័យ')
  }
})
</script>