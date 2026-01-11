import scoreService from "../service/scoreService";

export default {
  async loadAcademicYears(vm) {
    try {
      const res = await scoreService.fetchAcademicYears();
      vm.academicYears = res.data;
    } catch {
      vm.showError("មិនអាចទាញយកឆ្នាំសិក្សាបាន 🥵");
    }
  },

  async loadClasses(vm) {
    try {
      const res = await scoreService.fetchClasses();
      vm.classes = res.data;
    } catch {
      vm.showError("មិនអាចទាញយកថ្នាក់បាន 🥵");
    }
  },

  async loadTypeExams(vm) {
    try {
      const res = await scoreService.fetchTypeExams();
      vm.tyeexam = res.data;
    } catch {
      vm.showError("មិនអាចទាញយកប្រភេទប្រឡងបាន 🥵");
    }
  },

  async loadAssignedSubjects(vm) {
    if (!vm.selectedClass) return;
    try {
      vm.loading = true;
      const res = await scoreService.fetchAssignedSubjects(vm.selectedClass);
      vm.assignedSubjects = res.data || [];
    } finally {
      vm.loading = false;
    }
  },

  async loadExamComponents(vm) {
    if (!vm.selectedClass || !vm.selectedSubjects) return;
    try {
      vm.loading = true;
      const res = await scoreService.fetchExamComponents(vm.selectedClass, vm.selectedSubjects);
      vm.examComponents = res.data || [];
    } finally {
      vm.loading = false;
    }
  },

  async loadScores(vm) {
    try {
      vm.loading = true;
      const res = await scoreService.fetchScores({
        academic_year_id: vm.selectedAcademicYear,
        class_id: vm.selectedClass,
        start_date: vm.startDate,
        end_date: vm.endDate,
        component_id: vm.selectexamcomponent,
        type_exam_id: vm.selecttypeexam,
      });
      vm.scores = res.data;
    } finally {
      vm.loading = false;
    }
  },

  async updateScore(vm, score) {
    const newMark = prompt("Enter new mark:", score.mark);
    if (newMark === null) return;

    const newDate = prompt("Enter new exam date (YYYY-MM-DD):", score.exam_date?.split("T")[0]);
    if (newDate === null) return;

    try {
      await scoreService.updateScore(score.id, {
        mark: parseFloat(newMark),
        exam_date: newDate,
      });
      alert("Score updated successfully!");
      this.loadScores(vm);
    } catch {
      vm.showError("បរាជ័យក្នុងការកែប្រែពិន្ទុ 😢");
    }
  },

  async deleteScore(vm, id) {
    if (!confirm("Are you sure you want to delete this score?")) return;
    try {
      await scoreService.deleteScore(id);
      alert("Score deleted successfully!");
      this.loadScores(vm);
    } catch {
      vm.showError("បរាជ័យក្នុងការលុបពិន្ទុ 😢");
    }
  }
};
