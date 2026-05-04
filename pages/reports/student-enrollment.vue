<template>
  <div class=" mt-5 p-4">
    <div class="card ">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h4 class="mb-0"><i class="bi me-2"></i>របាយការណ៍ចុះឈ្មោះសិស្សតាមថ្នាក់</h4>
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
                <th>ថ្នាក់</th>
                <th>សរុបសិស្ស</th>
                <th>ប្រុស</th>
                <th>ស្រី</th>
                <th>សិស្សក្រីក្រ</th>
                <th>សិស្សពិការ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in reports" :key="index">
                <td>{{ item.academic_year }}</td>
                <td>{{ item.class_name }}</td>
                <td class="text-end">{{ item.total_students }}</td>
                <td class="text-end">{{ item.male }}</td>
                <td class="text-end">{{ item.female }}</td>
                <td class="text-end">{{ item.poor_students }}</td>
                <td class="text-end">{{ item.disabled_students }}</td>
              </tr>
              <tr v-if="reports.length === 0">
                <td colspan="7" class="text-center text-muted py-4">មិនមានទិន្នន័យ</td>
              </tr>
            </tbody>
            <tfoot v-if="reports.length > 0" class="table-secondary">
              <tr>
                <th colspan="2" class="text-end">សរុប៖</th>
                <th class="text-end">{{ totalStats.totalStudents }}</th>
                <th class="text-end">{{ totalStats.totalMale }}</th>
                <th class="text-end">{{ totalStats.totalFemale }}</th>
                <th class="text-end">{{ totalStats.totalPoor }}</th>
                <th class="text-end">{{ totalStats.totalDisabled }}</th>
              </tr>
            </tfoot>
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

const totalStats = computed(() => {
  const totals = {
    totalStudents: 0,
    totalMale: 0,
    totalFemale: 0,
    totalPoor: 0,
    totalDisabled: 0
  }
  reports.value.forEach(item => {
    totals.totalStudents += Number(item.total_students) || 0
    totals.totalMale     += Number(item.male)           || 0
    totals.totalFemale   += Number(item.female)         || 0
    totals.totalPoor     += Number(item.poor_students)  || 0
    totals.totalDisabled += Number(item.disabled_students) || 0
  })
  return totals
})

const exportToExcel = () => {
  const wsData = [
    ['ឆ្នាំសិក្សា', 'ថ្នាក់', 'សរុបសិស្ស', 'ប្រុស', 'ស្រី', 'សិស្សក្រីក្រ', 'សិស្សពិការ'],
    ...reports.value.map(item => [
      item.academic_year, item.class_name, item.total_students, 
      item.male, item.female, item.poor_students, item.disabled_students
    ]),
['សរុប', '', totalStats.value.totalStudents, totalStats.value.totalMale,
 totalStats.value.totalFemale, totalStats.value.totalPoor, totalStats.value.totalDisabled]
  ]
  const ws = XLSX.utils.aoa_to_sheet(wsData)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Student Enrollment Report')
  XLSX.writeFile(wb, `student_enrollment_${new Date().toISOString().split('T')[0]}.xlsx`)
}

onMounted(async () => {
  try {
    const token = useCookie('token').value
    const response = await axios.get('http://localhost:8080/api/studentenrollreport', {
      headers: { Authorization: `Bearer ${token}` }
    })
    reports.value = response.data
  } catch (error) {
    console.error('Error fetching report:', error)
    alert('កើតមានបញ្ហាក្នុងការទាញទិន្នន័យ')
  }
})
</script>