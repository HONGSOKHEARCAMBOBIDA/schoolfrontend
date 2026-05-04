<template>
  <div class=" mt-5 p-4">
    <div class="card ">
      <div class="card-header  d-flex justify-content-between align-items-center">
        <h4 class="mb-0"><i class="bi    me-2"></i>បញ្ជីសិស្សក្រីក្រលម្អិត</h4>
        <button class="btn btn-dark btn-sm" @click="exportToExcel">
          <i class="bi bi-file-excel me-1"></i>ទាញយក Excel
        </button>
      </div>
      <div class="card-body">
        <input type="text" class="form-control mb-3" placeholder="ស្វែងរក..." v-model="search">
        <div class="table-responsive">
          <table class="table table-bordered table-hover" id="report-table">
            <thead class="table-light">
              <tr>
                <th>ឆ្នាំសិក្សា</th>
                <th>ថ្នាក់</th>
                <th>លេខកូដសិស្ស</th>
                <th>ឈ្មោះសិស្ស</th>
                <th>ភេទ</th>
                <th>ថ្ងៃខែឆ្នាំកំណើត</th>
                <th>ទូរស័ព្ទ</th>
                <th>ឪពុក</th>
                <th>ម្តាយ</th>
                <th>មុខរបរឪពុក</th>
                <th>មុខរបរម្តាយ</th>
                <th>ខេត្ត</th>
                <th>ស្រុក</th>
                <th>ឃុំ</th>
                <th>ភូមិ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredReports" :key="index">
                <td>{{ item.academic_year }}</td>
                <td>{{ item.class_name }}</td>
                <td>{{ item.student_code }}</td>
                <td>{{ item.student_name }}</td>
                <td>{{ item.gender }}</td>
                <td>{{ formatDate(item.date_of_birth) }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.father_name }}</td>
                <td>{{ item.mother_name }}</td>
                <td>{{ item.father_occupation }}</td>
                <td>{{ item.mothe_occupation }}</td>
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

const filteredReports = computed(() => {
  if (!search.value) return reports.value
  const term = search.value.toLowerCase()
  return reports.value.filter(item => 
    item.student_name?.toLowerCase().includes(term) ||
    item.student_code?.toLowerCase().includes(term) ||
    item.class_name?.toLowerCase().includes(term)
  )
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('km-KH')
}

const exportToExcel = () => {
  const wsData = [
    ['ឆ្នាំសិក្សា', 'ថ្នាក់', 'លេខកូដសិស្ស', 'ឈ្មោះសិស្ស', 'ភេទ', 'ថ្ងៃខែឆ្នាំកំណើត', 
     'ទូរស័ព្ទ', 'ឪពុក', 'ម្តាយ', 'មុខរបរឪពុក', 'មុខរបរម្តាយ', 'ខេត្ត', 'ស្រុក', 'ឃុំ', 'ភូមិ'],
    ...filteredReports.value.map(item => [
      item.academic_year, item.class_name, item.student_code, item.student_name, 
      item.gender, item.date_of_birth, item.phone, item.father_name, item.mother_name,
      item.father_occupation, item.mothe_occupation, item.province, item.district, 
      item.commune, item.village
    ])
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Poor Students Detailed')
  XLSX.writeFile(wb, `poor_students_detailed_${new Date().toISOString().split('T')[0]}.xlsx`)
}

onMounted(async () => {
  try {
    const token = useCookie('token').value
    const response = await axios.get('http://localhost:8080/api/studentpoor', {
      headers: { Authorization: `Bearer ${token}` }
    })
    reports.value = response.data
  } catch (error) {
    console.error('Error fetching report:', error)
    alert('កើតមានបញ្ហាក្នុងការទាញទិន្នន័យ')
  }
})
</script>