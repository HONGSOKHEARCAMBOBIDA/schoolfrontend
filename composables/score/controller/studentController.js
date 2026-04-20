import studentService from "../service/studentService";

export default {
  async loadAcademicYears(vm) {
    try {
      const res = await studentService.fetchAcademicYears();
      vm.academicYears = res.data;
    } catch {
      vm.showError("មិនអាចទាញយកឆ្នាំសិក្សាបាន 🥵");
    }
  },

  async loadClasses(vm) {
    try {
      const res = await studentService.fetchClasses();
      vm.classes = res.data;
    } catch {
      vm.showError("មិនអាចទាញយកថ្នាក់បាន 🥵");
    }
  },

  async loadStudents(vm) {
    if (!vm.selectedClass) return;
    vm.loading = true;
    try {
      const res = await studentService.fetchStudents(vm.selectedAcademicYear, vm.selectedClass);
      vm.students = res.data || [];
      vm.studentMarks = {};
      vm.students.forEach(s => vm.$set(vm.studentMarks, s.id, 0));
      vm.showSuccess("ទាញសិស្សជោគជ័យ ✅");
    } catch {
      vm.showSuccess("ទាញសិស្សជោគជ័យ ✅");
    } finally {
      vm.loading = false;
    }
  },

  async loadSubjects(vm) {
    if (!vm.selectedClass) return;
    vm.loading = true;
    try {
      const res = await studentService.fetchSubjects(vm.selectedClass);
      vm.assignedSubjects = res.data || [];
      await this.loadStudents(vm);
    } catch {
      vm.showError("កើតបញ្ហា ក្នុងការទាញទិន្នន័យ");
    } finally {
      vm.loading = false;
    }
  },

  async loadExamComponents(vm) {
    if (!vm.selectedClass || !vm.selectedSubjects) return;
    vm.loading = true;
    try {
      const res = await studentService.fetchExamComponents(vm.selectedClass, vm.selectedSubjects);
      vm.examComponents = res.data || [];
    } catch {
      vm.showError("កើតបញ្ហា ក្នុងការទាញ Exam Component");
    } finally {
      vm.loading = false;
    }
  },

  async loadTypeExam(vm) {
    try {
      const res = await studentService.fetchTypeExam();
      vm.tyeexam = res.data;
    } catch {
      console.error("Failed to load type exam");
    }
  },

  async submitScores(vm) {
    if (!vm.selectexamcomponent) return vm.showError("សូមជ្រើសរើសការប្រឡង!");
    if (!vm.students.length) return vm.showError("មិនមានសិស្សសម្រាប់បញ្ចូលពិន្ទុ!");

const validStudents = vm.students.filter(
  s => vm.studentMarks[s.id] !== null && vm.studentMarks[s.id] !== "" && vm.studentMarks[s.id] !== undefined
);
    if (!validStudents.length) return vm.showError("សូមបញ្ចូលពិន្ទុយ៉ាងហោចណាស់សម្រាប់សិស្សម្នាក់!");

    const payload = {
      student_class_id: validStudents.map(s => s.id),
      component_id: vm.selectexamcomponent,
      type_exam_id: vm.selecttypeexam,
      mark: validStudents.map(s => vm.studentMarks[s.id]),
     exam_date: vm.selectedExamDate || new Date().toISOString().split("T")[0], 
    };

    try {
      await studentService.submitScores(payload);
      vm.showSuccess("បានរក្សាពិន្ទុសិស្សជោគជ័យ");
      vm.studentMarks = {};
    } catch(e) {
        const message = e.response?.data?.error
        vm.showError(message);
    }
  },
};
