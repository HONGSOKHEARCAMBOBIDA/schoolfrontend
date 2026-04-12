<template>
  <div class="pt-5">
    <div class="container py-5">
      <!-- Toast -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert">
          <div class="d-flex">
            <div class="toast-body">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hideToast"></button>
          </div>
        </div>
      </div>

      <div class="card shadow-sm">
        <div class="card-body">

          <!-- Select Class -->
          <div class="mb-4">
            <label class="form-label">ជ្រើសរើសថ្នាក់</label>
            <div class="dropdown" @mouseleave="classDropdown = false">
              <button 
                class="btn btn-outline-primary w-100 text-start" 
                @mouseenter="classDropdown = true">
                {{ selectedClassName || '-- ជ្រើសរើស --' }}
              </button>
              <ul class="dropdown-menu w-100" :class="{ show: classDropdown }">
                <li v-for="c in classes" :key="c.id">
                  <a class="dropdown-item" href="#" @click.prevent="selectClass(c)">{{ c.name }}</a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="mb-3 text-muted">កំពុងផ្ទុក...</div>
          <hr />

          <!-- Assigned Subjects -->
          <div v-if="selectedClassId && !loading">
            <h5 class="fw-bold mb-2">មុខវិជ្ជាដែលបានភ្ជាប់</h5>
            <div class="dropdown" @mouseleave="subjectDropdown = false">
              <button 
                class="btn btn-outline-secondary w-100 text-start mb-2"
                @mouseenter="subjectDropdown = true">
                {{ selectedSubjectName || '-- ជ្រើសរើសមុខវិជ្ជា --' }}
              </button>
              <ul class="dropdown-menu w-100" :class="{ show: subjectDropdown }">
                <li v-for="a in assignedSubjects" :key="a.id">
                  <a class="dropdown-item" href="#" @click.prevent="selectSubject(a)">{{ a.subject_name }}</a>
                </li>
                <li v-if="assignedSubjects.length === 0">
                  <span class="dropdown-item text-muted">មិនទាន់មាន</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Create Exam Component -->
          <div v-if="selectedSubjectId" class="mt-4">
            <h5>បង្កើត Exam Component សម្រាប់: {{ selectedSubjectName }}</h5>
            <input type="text" v-model="examComponentName" class="form-control mb-2" placeholder="ឈ្មោះ Exam Component" />
            <button class="btn btn-success" @click="createExamComponent">បង្កើត</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

const classes = ref([])
const assignedSubjects = ref([])
const selectedClassId = ref(null)
const selectedClassName = ref('')
const selectedSubjectId = ref(null)
const selectedSubjectName = ref('')
const examComponentName = ref('')
const loading = ref(false)
const toastMessage = ref('')

// Dropdown states
const classDropdown = ref(false)
const subjectDropdown = ref(false)

const getToken = () => Cookies.get('token')

// Fetch classes
const fetchClasses = async () => {
  try {
    const res = await axios.get('http://localhost:8080/class', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    classes.value = res.data
  } catch (e) {
    console.error(e)
  }
}

// Select class
const selectClass = async (c) => {
  selectedClassId.value = c.id
  selectedClassName.value = c.name
  classDropdown.value = false
  assignedSubjects.value = []
  selectedSubjectId.value = null
  selectedSubjectName.value = ''
  examComponentName.value = ''
  await fetchAssignedSubjects()
}

// Fetch subjects for selected class
const fetchAssignedSubjects = async () => {
  if (!selectedClassId.value) return
  loading.value = true
  try {
    const res = await axios.get('http://localhost:8080/viewclassasignsubjectnotinexamcomponent', {
      headers: { Authorization: `Bearer ${getToken()}` },
      params: { class_id: selectedClassId.value }
    })
    assignedSubjects.value = res.data || []
  } catch (e) {
    console.error(e)
    toastMessage.value = 'កើតបញ្ហា ក្នុងការទាញទិន្នន័យ'
    showToast()
  } finally {
    loading.value = false
  }
}

// Select subject
const selectSubject = (a) => {
  selectedSubjectId.value = a.id
  selectedSubjectName.value = a.subject_name
  subjectDropdown.value = false
}

// Create exam component
const createExamComponent = async () => {
  if (!examComponentName.value || !selectedSubjectId.value) {
    toastMessage.value = 'សូមបញ្ចូលឈ្មោះ Exam Component និងជ្រើសរើសមុខវិជ្ជា'
    showToast()
    return
  }
  try {
    await axios.post('http://localhost:8080/examcomponent', {
      name: examComponentName.value,
      class_subject_id: selectedSubjectId.value
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    toastMessage.value = 'បង្កើត Exam Component បានជោគជ័យ'
    showToast()
    examComponentName.value = ''
  } catch (e) {
    console.error(e)
    toastMessage.value = 'កើតបញ្ហា ក្នុងការបង្កើត'
    showToast()
  }
}

// Toast
const showToast = () => {
  const el = document.getElementById('successToast')
  if (!el) return
  const t = new bootstrap.Toast(el, { delay: 2000, autohide: true })
  t.show()
}
const hideToast = () => {
  const el = document.getElementById('successToast')
  const t = bootstrap.Toast.getInstance(el)
  if (t) t.hide()
}

onMounted(fetchClasses)
</script>

<style scoped>
* { font-family: 'Kantumruy Pro', sans-serif; }
.dropdown-menu.show {
  display: block !important;
}
</style>
