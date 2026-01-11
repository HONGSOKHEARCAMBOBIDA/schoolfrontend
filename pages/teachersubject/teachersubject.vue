<template>
    <div class="p-5">
        <div class="pt-5 min-vh-100">
    <div class="">

      <!-- Toast -->
      <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="successToast" class="toast align-items-center text-bg-success shadow border-0 rounded-pill" role="alert">
          <div class="d-flex">
            <div class="toast-body small">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
        <div id="errorToast" class="toast align-items-center text-bg-danger shadow border-0 rounded-pill" role="alert">
          <div class="d-flex">
            <div class="toast-body small">{{ toastMessage }}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
          </div>
        </div>
      </div>

      <!-- Main Card -->
      <div class="card shadow-lg border-0 rounded-4">
        <div class="card-body p-4">
          <h4 class="fw-bold mb-4 text-primary">📘 បន្ថែមមុខវិជ្ជាអោយគ្រូបង្រៀន</h4>

          <!-- Controls -->
          <div class="row g-3 mb-4">

            <!-- Teacher Dropdown -->
            <div class="col-md-4">
              <label class="form-label fw-semibold">ជ្រើសរើសគ្រូ</label>
              <div class="dropdown">
                <button class="btn btn-outline-primary w-100 text-start dropdown-toggle" type="button">
                  {{ selectedTeacherName || '-- ជ្រើសរើស --' }}
                </button>
                <ul class="dropdown-menu w-100">
                  <li v-for="c in teachers" :key="c.id" @click="selectTeacherFn(c)">
                    <a class="dropdown-item" href="#">{{ c.name }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Class Dropdown -->
            <div class="col-md-4">
              <label class="form-label fw-semibold">ជ្រើសរើសថ្នាក់</label>
              <div class="dropdown">
                <button class="btn btn-outline-primary w-100 text-start dropdown-toggle" type="button">
                  {{ selectedClassName || '-- ជ្រើសរើសថ្នាក់ --' }}
                </button>
                <ul class="dropdown-menu w-100">
                  <li v-for="c in classes" :key="c.id" @click="selectClassFn(c)">
                    <a class="dropdown-item" href="#">{{ c.name }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Academic Year Dropdown -->
            <div class="col-md-4">
              <label class="form-label fw-semibold">ជ្រើសរើសឆ្នាំសិក្សា</label>
              <div class="dropdown">
                <button class="btn btn-outline-primary w-100 text-start dropdown-toggle" type="button">
                  {{ selectedYearName || '-- ជ្រើសរើសឆ្នាំសិក្សា --' }}
                </button>
                <ul class="dropdown-menu w-100">
                  <li v-for="y in academicYears" :key="y.id" @click="selectYearFn(y)">
                    <a class="dropdown-item" href="#">{{ y.year_name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="mb-4 text-center text-muted">
            <div class="spinner-border text-primary me-2" role="status"></div>
            កំពុងផ្ទុក...
          </div>

          <!-- Assign Panel -->
          <div v-if="ready && !loading" class="mb-4 card border-0 shadow-sm rounded-3">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h5 class="fw-bold text-secondary mb-0">មុខវិជ្ជាដែលមិនទាន់បានបង្រៀន</h5>
                <span class="badge bg-light text-dark rounded-pill px-3">
                  {{ notAssignedSubjectsFiltered.length }}
                </span>
              </div>

              <div v-if="notAssignedSubjectsFiltered.length === 0" class="text-success small">
                ✅ មុខវិជ្ជាទាំងអស់បានភ្ជាប់រួច
              </div>

              <div v-else class="row g-3">
                <div class="col-md-8">
                  <select multiple size="10" v-model="selectedSubjects" class="form-select rounded-3 border">
                    <option v-for="s in notAssignedSubjectsFiltered" :key="s.id" :value="s.id">
                      {{ s.subject_name }} — {{ s.class_name }}
                      <span v-if="s.academic_year_name"> ({{ s.academic_year_name }})</span>
                    </option>
                  </select>
                  <small class="text-muted d-block mt-2">Hold Ctrl/Cmd ដើម្បីជ្រើសច្រើន</small>
                </div>
                <div class="col-md-4 d-grid gap-2">
                  <button
                    class="btn btn-primary rounded-pill shadow-sm"
                    :disabled="selectedSubjects.length === 0"
                    @click="assignSubjects"
                  >
                    <i class="bi bi-plus-circle"></i> បន្ថែម
                  </button>
                  <button
                    class="btn btn-outline-secondary rounded-pill"
                    @click="selectedSubjects = []"
                    :disabled="selectedSubjects.length === 0"
                  >
                    សម្អាតការជ្រើស
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Assigned List -->
          <div v-if="ready && !loading">
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h5 class="fw-bold text-secondary mb-0">មុខវិជ្ជាដែលកំពុងបង្រៀន</h5>
              <span class="badge bg-light text-dark rounded-pill px-3">
                {{ assignedSubjectsFiltered.length }}
              </span>
            </div>

            <div class="table-responsive">
              <table class="table table-hover align-middle rounded-3 shadow-sm">
                <thead class="table-light">
                  <tr>
                    <th class="text-center">#</th>
                    <th>មុខវិជ្ជា</th>
                    <th>ថ្នាក់</th>
                    <th>ឆ្នាំសិក្សា</th>
                    <th>សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(a, idx) in assignedSubjects" :key="a.id || a.class_subject_id">
                    <td class="text-center">{{ idx + 1 }}</td>
                    <td>{{ a.subject_name }}</td>
                    <td>{{ a.class_name }}</td>
                    <td>{{ a.academic_year_name || '-' }}</td>
                    <td>
                      <button class="btn btn-danger btn-sm" @click="deleteSubjectById(a.id || a.class_subject_id)">
                        <i class="bi bi-trash"></i> លុប
                      </button>
                    </td>
                  </tr>
                  <tr v-if="assignedSubjects.length === 0">
                    <td colspan="5" class="text-center text-muted py-4">មិនទាន់មានទេ</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import Cookies from 'js-cookie'

// ---------- State ----------
const teachers = ref([])
const classes = ref([])
const academicYears = ref([])

const selectedTeacher = ref('')
const selectedClass = ref('')
const selectedAcademicYear = ref('')

const selectedTeacherName = ref('')
const selectedClassName = ref('')
const selectedYearName = ref('')

const assignedSubjects = ref([])
const notAssignedSubjects = ref([])
const selectedSubjects = ref([])

const loading = ref(false)
const toastMessage = ref('')

// ---------- Dropdown Selectors ----------
const selectTeacherFn = async (c) => {
  selectedTeacher.value = c.id
  selectedTeacherName.value = c.name
  if (ready.value) await fetchSubjectsForTeacher()
}

const selectClassFn = async (c) => {
  selectedClass.value = c.id
  selectedClassName.value = c.name
  if (ready.value) await fetchSubjectsForTeacher()
}

const selectYearFn = async (y) => {
  selectedAcademicYear.value = y.id
  selectedYearName.value = y.year_name
  if (ready.value) await fetchSubjectsForTeacher()
}

// ---------- Utils ----------
const getToken = () => Cookies.get('token')

const ready = computed(() =>
  Boolean(selectedTeacher.value && selectedClass.value && selectedAcademicYear.value)
)

// ---------- Fetchers ----------
const fetchTeachers = async () => {
  const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/viewuser', {
    headers: { Authorization: `Bearer ${getToken()}` },
    params: { role_id: 4 }
  })
  teachers.value = res.data || []
}

const fetchClasses = async () => {
  const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/class', {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  classes.value = res.data || []
}

const fetchAcademicYears = async () => {
  const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/viewacademicyear', {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  academicYears.value = res.data || []
}

const fetchSubjectsForTeacher = async () => {
  if (!ready.value) return
  loading.value = true
  try {
    const [assignedRes, notAssignedRes] = await Promise.all([
      axios.get('https://6mqffthw-8080.asse.devtunnels.ms/teachersubject', {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: { user_id: selectedTeacher.value, academic_year_id: selectedAcademicYear.value, class_id: selectedClass.value }
      }),
      axios.get('https://6mqffthw-8080.asse.devtunnels.ms/getsubjectclassnotassigntoteacher', {
        headers: { Authorization: `Bearer ${getToken()}` },
        params: { user_id: selectedTeacher.value, class_id: selectedClass.value, academic_year_id: selectedAcademicYear.value }
      })
    ])
    assignedSubjects.value = assignedRes.data || []
    notAssignedSubjects.value = notAssignedRes.data || []
  } catch (e) {
    showError('កើតបញ្ហា ក្នុងការទាញទិន្នន័យ')
    console.error(e)
  } finally {
    loading.value = false
  }
}

// ---------- Filters ----------
const assignedSubjectsFiltered = computed(() => {
  return assignedSubjects.value.filter((a) =>
    String(a.class_id) === String(selectedClass.value) &&
    String(a.academic_year_id) === String(selectedAcademicYear.value)
  )
})

const notAssignedSubjectsFiltered = computed(() => {
  return notAssignedSubjects.value.filter((s) =>
    String(s.class_id) === String(selectedClass.value) &&
    (!s.academic_year_id || String(s.academic_year_id) === String(selectedAcademicYear.value))
  )
})

// ---------- Actions ----------
const assignSubjects = async () => {
  if (!ready.value) {
    showError('សូមជ្រើសគ្រូ ថ្នាក់ និង ឆ្នាំសិក្សា ជាមុនសិន')
    return
  }
  if (selectedSubjects.value.length === 0) {
    showError('សូមជ្រើសមុខវិជ្ជា')
    return
  }

  try {
    await axios.post(
      'https://6mqffthw-8080.asse.devtunnels.ms/teachersubject',
      {
        user_id: Number(selectedTeacher.value),
        class_subject_id: selectedSubjects.value,
        academic_year_id: Number(selectedAcademicYear.value),
      },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    showSuccess('បានភ្ជាប់មុខវិជ្ជាដោយជោគជ័យ')
    selectedSubjects.value = []
    await fetchSubjectsForTeacher()
  } catch (e) {
    const msg = e?.response?.data?.error || 'មានបញ្ហា ក្នុងការភ្ជាប់'
    showError(msg)
    console.error(e)
  }
}

const deleteSubjectById = async (id) => {
  if (!confirm("តើអ្នកប្រាកដចង់លុបមែនទេ?")) return
  try {
    await axios.delete(`https://6mqffthw-8080.asse.devtunnels.ms/deleteteachersubject/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    showSuccess('លុបបានជោគជ័យ 🗑️')
    await fetchSubjectsForTeacher()
  } catch (e) {
    console.error(e)
    showError('លុបបរាជ័យ')
  }
}

// ---------- Toast helpers ----------
const showToast = (id) => {
  const el = document.getElementById(id)
  if (!el || !window.bootstrap || !window.bootstrap.Toast) return
  const t = new window.bootstrap.Toast(el, { delay: 2000, autohide: true })
  t.show()
}
const showSuccess = (msg) => { toastMessage.value = msg; showToast('successToast') }
const showError = (msg) => { toastMessage.value = msg; showToast('errorToast') }

// ---------- Lifecycle ----------
onMounted(async () => {
  await Promise.all([fetchTeachers(), fetchClasses(), fetchAcademicYears()])
})
</script>

<style scoped>
* {
  font-family: 'Kantumruy Pro', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
}
.table {
  border-radius: 0.75rem;
  overflow: hidden;
}
.card {
  border-radius: 1rem;
}
select[multiple] {
  min-height: 280px;
}

/* Hover dropdowns */
.dropdown-menu {
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
  transition: all 0.25s ease-in-out;
}
.dropdown:hover .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  display: block;
}
</style>
