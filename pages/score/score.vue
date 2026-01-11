<template>
  <div class="p-2">
    <div class="py-5">

      <!-- Filters Card (hidden in print) -->
  <!-- Filters Card (hidden in print) -->
<div class="pt-3 ps-5 pe-5">
  <div class="card mb-4 no-print">
    <div class="card-body">
      <div class="d-flex flex-wrap gap-3 align-items-center">

        <!-- Academic Year -->
        <select v-model="selectedAcademicYear" @change="fetchScores"
                class="form-select shadow-sm "
                style="width: 180px;">
          <option value="">📅 ឆ្នាំសិក្សា</option>
          <option v-for="year in academicYears" :key="year.id" :value="year.id">
            {{ year.year_name }}
          </option>
        </select>

        <!-- Class -->
        <select v-model="selectedClass" @change="onClassChange"
                class="form-select shadow-sm "
                style="width: 180px;">
          <option value="">🏫 ថ្នាក់</option>
          <option v-for="cls in classes" :key="cls.id" :value="cls.id">
            {{ cls.name }}
          </option>
        </select>
                <select v-model="selecttypeexam" @change="fetchScores"
                class="form-select shadow-sm "
                style="width: 220px;">
          <option value="">📊 ប្រចាំខែ/ឆមាស</option>
          <option v-for="tx in tyeexam" :key="tx.id" :value="tx.id">
            {{ tx.name }}
          </option>
        </select>

        <!-- Start Date -->
        <div class="form-floating" style="width: 180px;">
          <input type="date" v-model="startDate" @change="fetchScores"
                 class="form-control shadow-sm" placeholder="ថ្ងៃចាប់ផ្តើម" />
          <label>ចាប់ពីថ្ងៃ</label>
        </div>

        <!-- End Date -->
        <div class="form-floating" style="width: 180px;">
          <input type="date" v-model="endDate" @change="fetchScores"
                 class="form-control shadow-sm" placeholder="ថ្ងៃបញ្ចប់" />
          <label>រហូតដល់</label>
        </div>

        <!-- Exam Type -->


      </div>
    </div>
  </div>
</div>


      <!-- Print Area -->
      <div class="ps-5 pe-5 pb-5">
              <div class="print-area">
        <div class="card-body text-center">

          <!-- School Info -->
          <h2 class="school-name">ព្រះរាជាណាចក្រកម្ពុជា</h2>
          <h2 class="school-name">ជាតិ សាសនា ព្រះមហាក្សត្រ</h2>
        
          <img src="/public/image/logoschool-removebg-preview.png" alt="Logo" class="logo-img">
      
          <h3 class="lefclass">សាលាបឋមសិក្សា តាហែន</h3>
            <div class="d-flex justify-content-end no-print">
    <div 
      class="p-2" 
      @click="printPage" 
      style="cursor: pointer;"
    >
      <img src="/public/icon/printicon.png" alt="Print" style="width: 35px;">
    </div>

    <div 
      class="p-2" 
      @click="exportToExcel" 
      style="cursor: pointer;"
    >
      <img src="/public/icon/excell.png" alt="Excel" style="width: 35px;">
    </div>
  </div>
          <h3 class="lefclass">{{ classes.find(c => c.id === selectedClass)?.name || '' }}</h3>
          <h2 class="school-name mb-4">ចំណាត់ថ្នាក់ប្រឡងប្រចាំខែ
             <span v-if="monthRange" class="school-name"> ({{ monthRange }})</span>
          </h2>

          <!-- Scores Table -->
          <div class="table-responsive">
            <table class="simple-table">
              <thead class="table-primary text-uppercase">
                <tr>
                  <th>ល.រ</th>
                  <th>ឈ្មោះសិស្ស</th>
                  <th>ភេទ</th>
                  <th>ថ្នាក់</th>
                  <th>មធ្យមភាគ</th>
                  <th>ចំណាត់ថ្នាក់</th>
                  <th>និទ្ទេស</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="loading">
                  <td colspan="7" class="text-muted py-4">កំពុងទាញយកទិន្នន័យ... ⏳</td>
                </tr>
                <tr v-else v-for="(s, index) in scores" :key="s.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ s.student_name }}</td>
                  <td>
                    <span class="badge text-dark">
                      {{ Number(s.student_gender) === 1 ? 'ប្រុស' :
                         Number(s.student_gender) === 2 ? 'ស្រី' : 'មិនបញ្ជាក់' }}
                    </span>
                  </td>
                  <td class="fw-medium">{{ s.class_name }}</td>
                  <td class="fw-bold text-primary">{{ parseFloat(s.avg_mark).toFixed(2) }}</td>
                 <td :style="{ color: 'red' }" class="fw-bold">{{ s.rank }}</td>

                  <td>{{ s.grade }}</td>
                </tr>
                <tr v-if="!loading && scores.length === 0">
                  <td colspan="7" class="text-muted py-4">មិនមានពិន្ទុសិស្សនៅឡើយទេ 😢</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
.school-name, .lefclass {
  font-family: 'Khmer OS Muol', 'Siemreap', sans-serif;
}

.logo-img {
  
  justify-content: center;

}


.school-name {
  text-align: center;
  font-size: 16px;
}

.lefclass {
  text-align: left;
  font-size: 16px;
}

.table-wrapper, .table-responsive {
  width: 100%;
  overflow-x: auto;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.simple-table th,
.simple-table td {
  border: 1px solid #373636;
  padding: 5px;
  text-align: center;
}

.simple-table thead th {
  background: #1f497d;
  color: #fff;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 5mm;
  }

  body {
    font-family: "Siemreap", "Kantumruy Pro","Khmer OS Muol", sans-serif !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Hide everything except print area */
  .no-print {
    display: none !important;
  }

  .print-area {
    width: 100%;
  }
}
</style>



<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      selecttypeexam: '',
      selectedAcademicYear: '',
      selectedClass: '',
      startDate: '',
      endDate: '',
      selectedSubjects: "",
      selectexamcomponent: "",
      assignedSubjects: [],
      examComponents: [],
      scores: [],
      academicYears: [],
      classes: [],
      tyeexam: [],
      loading: false,
      khmerMonths: [
        'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
        'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
      ]
    };
  },

  computed: {
    monthRange() {
      if (!this.startDate || !this.endDate) return '';

      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      const startMonth = this.khmerMonths[start.getMonth()];
      const endMonth = this.khmerMonths[end.getMonth()];

      return startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;
    }
  },

  methods: {
     printPage()  {
  window.print();
},
exportToExcel() {
  if (this.scores.length === 0) {
    alert("មិនមានទិន្នន័យសិស្សសម្រាប់ Export 😢");
    return;
  }

  const worksheetData = this.scores.map((s, index) => ({
    "ល.រ": index + 1,
    "ឈ្មោះសិស្ស": s.student_name,
    "ភេទ": Number(s.student_gender) === 1 ? "ប្រុស" : Number(s.student_gender) === 2 ? "ស្រី" : "មិនបញ្ជាក់",
    "ថ្នាក់": s.class_name,
    "មធ្យមភាគ": s.avg_mark,
    "ចំណាត់ថ្នាក់": s.rank,
    "និទ្ទេស": s.grade,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "scores");

  XLSX.writeFile(workbook, `scores_${Date.now()}.xlsx`);
},

    getToken() {
      return Cookies.get('token');
    },

    formatDate(dateStr) {
      return dateStr ? dateStr.split('T')[0] : '';
    },

    async fetchtypeexam() {
      try {
        const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/typeexam', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.tyeexam = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    async onClassChange() {
      this.scores = [];
      if (!this.selectedClass) return;

      this.loading = true;
      try {
        await this.fetchScores();
        await this.fetchClasses();
      } catch (e) {
        console.error(e);
        alert("កើតបញ្ហា ក្នុងការទាញទិន្នន័យ");
      } finally {
        this.loading = false;
      }
    },

    async fetchAcademicYears() {
      try {
        const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/viewacademicyear', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.academicYears = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    async fetchClasses() {
      try {
        const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/class', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
        });
        this.classes = res.data;
      } catch (err) {
        console.error(err);
      }
    },

    async fetchScores() {
      this.loading = true;
      try {
        const res = await axios.get('https://6mqffthw-8080.asse.devtunnels.ms/scoreavg', {
          headers: { Authorization: `Bearer ${this.getToken()}` },
          params: {
            academic_year_id: this.selectedAcademicYear,
            class_id: this.selectedClass,
            start_date: this.startDate,
            end_date: this.endDate,
            component_id: this.selectexamcomponent,
            type_exam_id: this.selecttypeexam
          },
        });
        this.scores = res.data;
      } catch (err) {
        console.error(err);
        this.scores = [];
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.fetchAcademicYears();
    this.fetchClasses();
    this.fetchScores();
    this.fetchtypeexam();
  },
};
</script>
