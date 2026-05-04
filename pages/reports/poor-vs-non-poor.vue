<template>
  <div class=" mt-5 p-4">
    <div class="card ">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="mb-0"><i class="bi  me-2"></i>ការប្រៀបធៀបសិស្សក្រ/មិនក្រ</h4>
        <button class="btn btn-light btn-sm" @click="exportToExcel">
          <i class="bi bi-file-excel me-1"></i>ទាញយក Excel
        </button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-hover" id="report-table">
            <thead class="table-light">
              <tr>
                <th>ឆ្នាំសិក្សា</th>
                <th>សរុបសិស្ស</th>
                <th>សិស្សក្រីក្រ</th>
                <th>សិស្សមិនក្រីក្រ</th>
                <th>% សិស្សក្រីក្រ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in reports" :key="index">
                <td>{{ item.academic_year }}</td>
                <td class="text-end">{{ item.total_students }}</td>
                <td class="text-end">{{ item.poor_students }}</td>
                <td class="text-end">{{ item.non_poor_students }}</td>
                <td class="text-end">{{ item.poor_pct }}%</td>
              </tr>
              <tr v-if="reports.length === 0">
                <td colspan="5" class="text-center text-muted py-4">មិនមានទិន្នន័យ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import * as XLSX from 'xlsx'

const reports = ref([])

const exportToExcel = () => {
  const wsData = [
    ['ឆ្នាំសិក្សា', 'សរុបសិស្ស', 'សិស្សក្រីក្រ', 'សិស្សមិនក្រីក្រ', '% សិស្សក្រីក្រ'],
    ...reports.value.map(item => [
      item.academic_year, item.total_students, item.poor_students, 
      item.non_poor_students, item.poor_pct + '%'
    ])
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Poor vs Non-Poor')
  XLSX.writeFile(wb, `poor_vs_nonpoor_${new Date().toISOString().split('T')[0]}.xlsx`)
}

onMounted(async () => {
  try {
    const token = useCookie('token').value
    const response = await axios.get('http://localhost:8080/api/PoorVsNonPoorStudentsComparisonByYear', {
      headers: { Authorization: `Bearer ${token}` }
    })
    reports.value = response.data
  } catch (error) {
    console.error('Error fetching report:', error)
    alert('កើតមានបញ្ហាក្នុងការទាញទិន្នន័យ')
  }
})
</script>