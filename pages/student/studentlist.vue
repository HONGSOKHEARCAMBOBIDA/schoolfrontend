<template>
  <div class="p-5">
    <div class="students-container">
      <!-- Dropdowns -->


      <div class="d-flex gap-3 mb-3 no-print">

      <select v-model="selectedClass" class="form-select">
  <option value="">ជ្រើសរើសថ្នាក់</option>
  <option v-for="cls in classes" :key="cls.id" :value="cls.id">
    {{ cls.name }}
  </option>
</select>
              <select v-model="selectedAcademicYear" class="form-select">
  <option value="">ជ្រើសរើសឆ្នាំសិក្សា</option>
  <option v-for="academic in academicYears" :key="academic.id" :value="academic.id">
    {{ academic.year_name }}
  </option>
</select>

          <div class="input-group" style="max-width: 150px;">
            <select
              v-model="selectActive"
             
              class="form-select border-1"
              style="box-shadow: none !important;"
            >
              <option value="">ស្ថានភាពសិស្ស</option>
              <option :value="1">កំពុងរៀន</option>
              <option :value="2">ភ្ជួរឈ្មោះ</option>
              <option :value="3">ដូរសាលា</option>
              <option :value="4">ឈប់រៀន</option>
            </select>
            <button 
              v-if="selectActive" 
              class="btn btn-sm px-2" 
              type="button" 
              @click="selectActive = ''; "
            >
              ✕
            </button>
          </div>


      </div>




      <!-- Table (only this will print) -->
      <div class="table-wrapper print-area">
        <h2 class="school-name">ព្រះរាជាណាចក្រកម្ពុជា</h2>
        <h2 class="school-name">ជាតិ សាសនា ព្រះមហាក្សត្រ</h2>
        <div class="login-image me-3">
          <img src="/public/image/logoschool-removebg-preview.png" alt="Logo">
        </div>
<div class="">
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
</div>



        <h3 class="lefclass">សាលាបឋមសិក្សា តាហែន</h3>
        
        <!-- 👇 use selected values instead of students[0] -->
       <h3 class="lefclass">
  {{ classes.find(c => c.id === selectedClass)?.name || '' }}
</h3>
<h2 class="school-name">
  បញ្ជីរាយនាមប្រវត្តិរូបសង្ខេបសិស្ស
  {{ classes.find(c => c.id === selectedClass)?.name || '' }}
  ឆ្នាំសិក្សា {{ academicYears.find(a => a.id === selectedAcademicYear)?.year_name || '' }}
</h2>

        <table class="simple-table">
          <thead>
            <tr>
              <th>ល.រ</th>
              <th>ឈ្មោះ</th>
              <th>ថ្ងៃកំណើត</th>
              <th>ភេទ</th>
              <th>លេខទូរស័ព្ទ</th>
              <th>ថ្នាក់</th>
              <th>ឆ្នាំសិក្សា</th>
              <th>ស្ថានភាព</th>
              <th>ឪពុក</th>
              <th>ម្ដាយ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="students.length === 0">
              <td colspan="9" class="text-center py-4">មិនមានសិស្ស 😢</td>
            </tr>
            <tr v-for="(s, index) in students" :key="s.id">
              <td>{{ index + 1 }}</td>
              <td>{{ s.name }}</td>
              <td>{{ formatDate(s.dob) }}</td>
              <td>
                {{ Number(s.Gender) === 1 ? 'ប្រុស' : Number(s.Gender) === 2 ? 'ស្រី' : 'មិនបញ្ជាក់' }}
              </td>
              <td>{{ s.phone }}</td>
              <td>{{ s.class_name }}</td>
              <td>{{ s.academic_name }}</td>
              <td>                  <span>
                    {{ statusText[s.student_class_is_active] || 'មិនស្គាល់' }}
                  </span></td>
              <td>{{ s.father_name }}</td>
              <td>{{ s.mother_name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStudent } from "~/composables/useStudent";
import { useclass, useAcademic } from "#imports";
import * as XLSX from "xlsx";

const { students, fetchStudents, selectedAcademicYear, selectedClass,selectActive } = useStudent();
const { fetchClasses, classes } = useclass();
const { fetchAcademicYears, academicYears } = useAcademic();
const statusText = {
  0: 'ឡើងថ្នាក់',
  1: 'នៅរៀន',
  2: 'ភ្ជួរឈ្មោះ',
  3: 'ដូរសាលា',
  4: 'ឈប់រៀន',
};
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
};


const selectAcademic = (academic) => {
  selectedAcademicYear.value = academic;
  fetchStudents();
};

const selectClass = (cls) => {
  selectedClass.value = cls;
  fetchStudents();
};

// ✅ Print
const printPage = () => {
  window.print();
};

// ✅ Export to Excel
const exportToExcel = () => {
  if (students.value.length === 0) {
    alert("មិនមានទិន្នន័យសិស្សសម្រាប់ Export 😢");
    return;
  }

  const worksheetData = students.value.map((s, index) => ({
    "ល.រ": index + 1,
    "ឈ្មោះ": s.name,
    "ថ្ងៃកំណើត": formatDate(s.dob),
    "ភេទ": Number(s.Gender) === 1 ? "ប្រុស" : Number(s.Gender) === 2 ? "ស្រី" : "មិនបញ្ជាក់",
    "លេខទូរស័ព្ទ": s.phone,
    "ថ្នាក់": s.class_name,
    "ឆ្នាំសិក្សា": s.academic_name,
    "ឪពុក": s.father_name,
    "ម្ដាយ": s.mother_name,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  XLSX.writeFile(workbook, `students_${Date.now()}.xlsx`);
};

onMounted(() => {
  fetchAcademicYears();
  fetchClasses();

});
</script>



<style scoped>
.school-name, .lefclass {
  font-family: 'Khmer OS Muol', 'Siemreap', sans-serif;
}

.login-image {
  display: flex;
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
.rightclass{
  text-align: right;
  font-size: 16px;
}

.students-container {
  font-family: "Siemreap", "Kantumruy Pro", sans-serif;
  margin: 30px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.simple-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
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


</style>

<style>
/* Print settings for A4 */
@media print {
  @page {
    size: A4 portrait; /* or landscape */
    margin: 2mm;
  }

  body * {
    visibility: hidden; /* hide everything */
  }

  .print-area, .print-area * {
    visibility: visible; /* only show table */
  }

  .print-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .no-print {
    display: none !important;
  }

  body {
    font-family: "Siemreap", "Kantumruy Pro","Khmer OS Muol", sans-serif !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
