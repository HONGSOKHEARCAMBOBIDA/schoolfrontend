<template>
  <div class=" mt-5 p-4">
    <div class="card ">
      <div class="card-header  d-flex justify-content-between align-items-center">
        <h4 class="mb-0"><i class="bi me-2"></i>បញ្ជីសិស្សពិការលម្អិត</h4>
        <button class="btn btn-light btn-sm" @click="exportToExcel">
          <i class="bi bi-file-excel me-1"></i>ទាញយក Excel
        </button>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="ស្វែងរក..." v-model="search">
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="filterDisability">
              <option value="">ប្រភេទពិការភាពទាំងអស់</option>
              <option v-for="type in disabilityTypes" :value="type">{{ type }}</option>
            </select>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table table-bordered table-hover" id="report-table">
            <thead class="table-light">
              <tr>
                <th>លេខកូដ</th>
                <th>ឈ្មោះសិស្ស</th>
                <th>ភេទ</th>
                <th>ថ្ងៃខែឆ្នាំកំណើត</th>
                <th>ទូរស័ព្ទ</th>
                <th>ឪពុក</th>
                <th>ម្តាយ</th>
                <th>ប្រភេទពិការ</th>
                <th>ការពិពណ៌នា</th>
                <th>ថ្នាក់</th>
                <th>ឆ្នាំសិក្សា</th>
                <th>ខេត្ត</th>
                <th>ស្រុក</th>
                <th>ឃុំ</th>
                <th>ភូមិ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredReports" :key="index">
                <td>{{ item.student_code }}</td>
                <td>{{ item.student_name }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ formatDate(item.date_of_birth) }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.father_name }}</td>
                <td>{{ item.mother_name }}</td>
                <td class="text-danger fw-bold">{{ item.disability_type }}</td>
                <td>{{ item.disability_description }}</td>
                <td>{{ item.class_name }}</td>
                <td>{{ item.academic_year }}</td>
                <td>{{ item.province }}</td>
                <td>{{ item.district }}</td>
                <td>{{ item.commune }}</td>
                <td>{{ item.village }}</td>
              </tr>
              <tr v-if="filteredReports.length === 0">
                <td colspan="15" class="text-center text-muted py-4">មិនមានទិន្នន័យ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'

const reports = ref([])
const search = ref('')
const filterDisability = ref('')

const disabilityTypes = computed(() => {
  const types = new Set()
  reports.value.forEach(item => {
    if (item.disability_type) types.add(item.disability_type)
  })
  return Array.from(types)
})

const filteredReports = computed(() => {
  let filtered = reports.value
  
  if (search.value) {
    const term = search.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.student_name?.toLowerCase().includes(term) ||
      item.student_code?.toLowerCase().includes(term)
    )
  }
  
  if (filterDisability.value) {
    filtered = filtered.filter(item => item.disability_type === filterDisability.value)
  }
  
  return filtered
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('km-KH')
}

const exportToExcel = () => {
  const wsData = [
    ['លេខកូដ', 'ឈ្មោះសិស្ស', 'ភេទ', 'ថ្ងៃខែឆ្នាំកំណើត', 'ទូរស័ព្ទ', 
     'ឪពុក', 'ម្តាយ', 'ប្រភេទពិការ', 'ការពិពណ៌នា', 'ថ្នាក់', 
     'ឆ្នាំសិក្សា', 'ខេត្ត', 'ស្រុក', 'ឃុំ', 'ភូមិ'],
    ...filteredReports.value.map(item => [
      item.student_code, item.student_name, item.gender, item.date_of_birth, item.phone,
      item.father_name, item.mother_name, item.disability_type, item.disability_description,
      item.class_name, item.academic_year, item.province, item.district, item.commune, item.village
    ])
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Disabled Students')
  XLSX.writeFile(wb, `disabled_students_${new Date().toISOString().split('T')[0]}.xlsx`)
}

onMounted(async () => {
  try {
    const token = useCookie('token').value
    const response = await axios.get('http://localhost:8080/api/DetailedDisabledStudentsByDisabilityType', {
      headers: { Authorization: `Bearer ${token}` }
    })
    reports.value = response.data
  } catch (error) {
    console.error('Error fetching report:', error)
    alert('កើតមានបញ្ហាក្នុងការទាញទិន្នន័យ')
  }
})
</script>