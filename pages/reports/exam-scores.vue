<template>
  <div class="container mt-5 pt-4">
    <div class="card shadow">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0"><i class="bi bi-file-text me-2"></i>ពិន្ទុប្រឡងសិស្ស</h4>
        <button class="btn btn-light btn-sm" @click="exportToExcel">
          <i class="bi bi-file-excel me-1"></i>ទាញយក Excel
        </button>
      </div>
      <div class="card-body">
        <input type="text" class="form-control mb-3" placeholder="ស្វែងរកតាមឈ្មោះសិស្ស ឬមុខវិជ្ជា..." v-model="search">
        <div class="table-responsive">
          <table class="table table-bordered table-hover" id="report-table">
            <thead class="table-light">
              <tr>
                <th>លេខកូដសិស្ស</th>
                <th>ឈ្មោះសិស្ស</th>
                <th>ថ្នាក់</th>
                <th>ឆ្នាំសិក្សា</th>
                <th>មុខវិជ្ជា</th>
                <th>ប្រភេទប្រឡង</th>
                <th>សមាសភាគ</th>
                <th>ពិន្ទុ</th>
                <th>ថ្ងៃប្រឡង</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredReports" :key="index">
                <td>{{ item.student_code }}</td>
                <td>{{ item.student_name }}</td>
                <td>{{ item.class_name }}</td>
                <td>{{ item.academic_year }}</td>
                <td>{{ item.subject }}</td>
                <td>{{ item.exam_type }}</td>
                <td>{{ item.component }}</td>
                <td class="text-end fw-bold">{{ item.score }}</td>
                <td>{{ formatDate(item.exam_date) }}</td>
              </tr>
              <tr v-if="filteredReports.length === 0">
                <td colspan="9" class="text-center text-muted py-4">មិនមានទិន្នន័យ</td>
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
    item.subject?.toLowerCase().includes(term) ||
    item.student_code?.toLowerCase().includes(term)
  )
})

const formatDate = (date) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('km-KH')
}

const exportToExcel = () => {
  const wsData = [
    ['លេខកូដសិស្ស', 'ឈ្មោះសិស្ស', 'ថ្នាក់', 'ឆ្នាំសិក្សា', 'មុខវិជ្ជា', 'ប្រភេទប្រឡង', 'សមាសភាគ', 'ពិន្ទុ', 'ថ្ងៃប្រឡង'],
    ...filteredReports.value.map(item => [
      item.student_code, item.student_name, item.class_name, item.academic_year,
      item.subject, item.exam_type, item.component, item.score, item.exam_date
    ])
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Exam Scores')
  XLSX.writeFile(wb, `exam_scores_${new Date().toISOString().split('T')[0]}.xlsx`)
}

onMounted(async () => {
  try {
    const token = useCookie('token').value
    const response = await axios.get('http://localhost:8080/api/StudentSubjectExamScoresByAcademicYear', {
      headers: { Authorization: `Bearer ${token}` }
    })
    reports.value = response.data
  } catch (error) {
    console.error('Error fetching report:', error)
    alert('កើតមានបញ្ហាក្នុងការទាញទិន្នន័យ')
  }
})
</script>