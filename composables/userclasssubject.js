import { ref } from 'vue'
import { ClassSubjectService } from '~/services/classsubjectService'
import { classService } from '~/services/classService'
import { showError, showSuccess } from './utils/toast'

export function useClassSubject() {
  const classes = ref([])
  const assignedSubjects = ref([])
  const notAssignedSubjects = ref([])
  const selectedClass = ref('')
  const selectedClassName = ref('')
  const selectedSubjects = ref([])
  const loading = ref(false)
  const deleteId = ref(null)

  const fetchClasses = async () => {
    try {
      const res = await classService.fetchClasses()
      classes.value = res.data.data
    } catch {
      showError('មានបញ្ហាក្នុងការទាញថ្នាក់')
    }
  }

  const onClassChange = async () => {
    if (!selectedClass.value) return
    loading.value = true
    try {
      const [assigned, notAssigned] = await Promise.all([
        ClassSubjectService.fetchAssigned(selectedClass.value),
        ClassSubjectService.fetchNotAssigned(selectedClass.value),
      ])
      assignedSubjects.value = assigned.data || []
      notAssignedSubjects.value = notAssigned.data || []
    } catch {
      showError('មានបញ្ហាក្នុងការទាញទិន្នន័យ')
    } finally {
      loading.value = false
    }
  }

  const selectClass = async (cls) => {
    selectedClass.value = cls.id
    selectedClassName.value = cls.name
    await onClassChange()
  }

  const clearSelectedClass = () => {
    selectedClass.value = ''
    selectedClassName.value = ''
    assignedSubjects.value = []
    notAssignedSubjects.value = []
    selectedSubjects.value = []
  }

  const assignSubjects = async () => {
    if (!selectedSubjects.value.length) {
      showError('សូមជ្រើសរើសមុខវិជ្ជា')
      return
    }
    try {
      await ClassSubjectService.assignSubjects(
        selectedClass.value,
        selectedSubjects.value
      )
      showSuccess('ភ្ជាប់បានជោគជ័យ ✅')
      await onClassChange()
    } catch {
      showError('ភ្ជាប់បរាជ័យ')
    }
  }

  const confirmDelete = async () => {
    //onfirmDelete() to actually call API only when modal confirms.
    if (!deleteId.value) return
    try {
      await ClassSubjectService.deleteSubject(deleteId.value)
      showSuccess('លុបបានជោគជ័យ 🗑️')
      deleteId.value = null
      await onClassChange()
    } catch {
      showError('លុបបរាជ័យ')
    }
  }

  const setDeleteId = (id) => {
    //setDeleteId(id) to store the selected subject ID.
    deleteId.value = id
  }

  return {
    classes,
    assignedSubjects,
    notAssignedSubjects,
    selectedClass,
    selectedClassName,
    selectedSubjects,
    loading,
    fetchClasses,
    selectClass,
    clearSelectedClass,
    assignSubjects,
    confirmDelete,
    setDeleteId,
  }
}
