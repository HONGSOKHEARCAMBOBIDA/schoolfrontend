<template>
  <nav class="navbar navbar-expand-lg excel-navbar fixed-top">
    <div class="container-fluid">
      <div class="login-image me-3">
        <img src="/public/image/logo.png" alt="Logo">
      </div>
      <NuxtLink class="navbar-brand excel-brand" to="/">
        ប្រព័ន្ធគ្រប់គ្រង សាលាបឋមសិក្សាតាហែន
      </NuxtLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <!-- ការកំណត់ -->
          <li class="nav-item dropdown" v-if="canAny('view-role', 'view-user')">
            <a class="nav-link dropdown-toggle" href="#" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-gear me-1"></i> ការកំណត់
            </a>
            <ul class="dropdown-menu">
              <li v-if="can('view-role')">
                <NuxtLink class="dropdown-item" to="/role/createrole">
                  <i class="bi bi-person-badge me-1"></i> តួនាទី
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li v-if="can('view-user')">
                <NuxtLink class="dropdown-item" to="/user/viewuser">
                  <i class="bi bi-people me-1"></i> អ្នកប្រើប្រាស់
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- សាលារៀន -->
          <li class="nav-item dropdown"
              v-if="canAny('view-class', 'view-subject', 'view-academicyear', 'view-class-assign-subject', 'view-student')">
            <a class="nav-link dropdown-toggle" href="#" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-box-seam me-1"></i> សាលារៀន
            </a>
            <ul class="dropdown-menu">
              <li v-if="can('view-class')">
                <NuxtLink class="dropdown-item" to="/class/classview">
                  <i class="bi bi-building me-1"></i> ថ្នាក់រៀន
                </NuxtLink>
              </li>
              <li v-if="can('view-subject')">
                <NuxtLink class="dropdown-item" to="/subject/subjectview">
                  <i class="bi bi-tags me-1"></i> មុខវិជ្ជា
                </NuxtLink>
              </li>
              <li v-if="can('view-academicyear')">
                <NuxtLink class="dropdown-item" to="/academicyear/academicyear">
                  <i class="bi bi-calendar me-1"></i> ឆ្នាំសិក្សា
                </NuxtLink>
              </li>
              <li v-if="can('view-class-assign-subject')">
                <NuxtLink class="dropdown-item" to="/classsubject/class-subject">
                  <i class="bi bi-tags me-1"></i> ចាប់មុខវិជ្ជាដាក់ថ្នាក់
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li v-if="can('view-student')">
                <NuxtLink class="dropdown-item" to="/student/studentview">
                  <i class="bi bi-person me-1"></i> សិស្ស
                </NuxtLink>
              </li>
              <li v-if="can('view-student')">
                <NuxtLink class="dropdown-item" to="/student/studentlist">
                  <i class="bi bi-person-list me-1"></i> របាយការណ៍សិស្ស
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- ការគ្រប់គ្រងសាលា -->
          <li class="nav-item dropdown"
              v-if="canAny('view-type-exam', 'assign-student-to-class', 'view-teacher-subject', 'update-status-class-teacher', 'add-score', 'view-score', 'promote-student', 'view-promote')">
            <a class="nav-link dropdown-toggle" href="#" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-grid me-1"></i> ការគ្រប់គ្រងសាលា
            </a>
            <ul class="dropdown-menu">
              <li v-if="can('view-type-exam')">
                <NuxtLink class="dropdown-item" to="/examcomponent/createexamcomponent">
                  <i class="bi bi-clipboard me-1"></i> ប្រភេទការប្រលង
                </NuxtLink>
              </li>
              <li v-if="can('assign-student-to-class')">
                <NuxtLink class="dropdown-item" to="/student/students">
                  <i class="bi bi-people me-1"></i> បញ្ចូលសិស្សទៅតាមថ្នាក់
                </NuxtLink>
              </li>
              <li v-if="can('view-teacher-subject')">
                <NuxtLink class="dropdown-item" to="/teachersubject/teachersubject">
                  <i class="bi bi-person-badge me-1"></i> មុខវិជ្ជាដែលគ្រូបានបង្រៀន
                </NuxtLink>
              </li>
              <li v-if="can('update-status-class-teacher')">
                <NuxtLink class="dropdown-item" to="/classteacher/classteacher">
                  <i class="bi bi-person-badge me-1"></i> បន្ថែមថ្នាក់អោយគ្រូគ្រប់គ្រង
                </NuxtLink>
              </li>
              <li v-if="can('add-score')">
                <NuxtLink class="dropdown-item" to="/score/addscore">
                  <i class="bi bi-pencil-square me-1"></i> ដាក់ពិន្ទុសិស្ស
                </NuxtLink>
              </li>
              <li v-if="can('view-score')">
                <NuxtLink class="dropdown-item" to="/score/scoreview">
                  <i class="bi bi-bar-chart me-1"></i> របាយការណ៍ពិន្ទុសិស្ស
                </NuxtLink>
              </li>
              <li v-if="can('view-score')">
                <NuxtLink class="dropdown-item" to="/score/score">
                  <i class="bi bi-list-ol me-1"></i> ចំណាត់ថ្នាក់សិស្ស
                </NuxtLink>
              </li>
              <li v-if="can('promote-student')">
                <NuxtLink class="dropdown-item" to="/promote/promote">
                  <i class="bi bi-arrow-up-circle me-1"></i> ដំឡើងថ្នាក់សិស្ស
                </NuxtLink>
              </li>
              <li v-if="can('view-promote')">
                <NuxtLink class="dropdown-item" to="/promote/promoteview">
                  <i class="bi bi-clock-history me-1"></i> ប្រវត្តដំឡើងថ្នាក់សិស្ស
                </NuxtLink>
              </li>
              <li v-if="can('view-score')">
                <NuxtLink class="dropdown-item" to="/score/yearresult">
                  <i class="bi bi-clock-history me-1"></i> លទ្ធិផលប្រចាំឆ្នាំ
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- របាយការណ៍ - NEW SECTION -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button"
               data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-graph-up me-1"></i> របាយការណ៍
            </a>
            <ul class="dropdown-menu dropdown-menu-end" style="min-width: 300px;">
              <li>
                <NuxtLink class="dropdown-item" to="/reports/student-enrollment">
                   របាយការណ៍ចុះឈ្មោះសិស្សតាមថ្នាក់
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/reports/gender-stats">
                  ស្ថិតិភេទសិស្ស
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/reports/student-by-address">
                  របាយការណ៍សិស្សតាមទីតាំងភូមិសាស្ត្រ
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <NuxtLink class="dropdown-item" to="/reports/poor-students-detailed">
                បញ្ជីសិស្សក្រីក្រលម្អិត
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/reports/poor-students-by-class-gender">
                  ចំនួនសិស្សក្រីក្រតាមថ្នាក់ និងភេទ
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/reports/poor-students-by-province-district">
                   សិស្សក្រីក្រតាមខេត្ត/ស្រុក
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/reports/poor-vs-non-poor">
                 ការប្រៀបធៀបសិស្សក្រ/មិនក្រ
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <NuxtLink class="dropdown-item" to="/reports/summary-dashboard">
                 សង្ខេបទូទៅ
                </NuxtLink>
              </li>

              <li>
                <NuxtLink class="dropdown-item" to="/reports/disabled-students">
                 បញ្ជីសិស្សពិការលម្អិត
                </NuxtLink>
              </li>
            </ul>
          </li>

        </ul>

        <!-- User info (desktop) -->
        <div class="user-info d-none d-lg-flex align-items-center gap-2">
          <img
            :src="`http://localhost:8080/images/${profile}`"
            class="rounded-circle"
            style="width: 40px; height: 40px; object-fit: cover;"
          />
          <span>សូមស្វាគមន៍, {{ name }} ({{ role }})</span>
          <button class="btn btn-sm btn-danger ms-2" @click="logout">
            <i class="bi bi-box-arrow-right me-1"></i> ចាកចេញ
          </button>
        </div>

        <!-- User info (mobile) -->
        <ul class="navbar-nav d-lg-none mt-3">
          <li class="nav-item">
            <a class="nav-link text-white" href="#">
              <i class="bi bi-person-circle me-1"></i>
              សូមស្វាគមន៍, {{ name }} ({{ role }})
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#" @click="logout">
              <i class="bi bi-box-arrow-right me-1"></i> ចាកចេញ
            </a>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCookie, navigateTo } from '#app'
import { usePermission } from '~/composables/usePermission'

const name = useCookie('name')
const role = useCookie('role_name')
const profile = useCookie('profile')

const { can, canAny } = usePermission()

function logout() {
  useCookie('token').value = null
  useCookie('name').value = null
  useCookie('role_name').value = null
  useCookie('profile').value = null
  useCookie('permissions').value = null
  navigateTo('/login')
}
</script>

<style scoped>
* {
  font-family: "Kantumruy Pro", sans-serif;
}

.login-image img {
  width: 23px;
  height: auto;
  border-radius: 10%;
}

.excel-navbar {
  background-color: #1f497d;
  padding: 0.4rem 1rem;
}

.excel-brand {
  font-weight: 600;
  color: #ffffff !important;
}
.excel-brand:hover {
  color: #d9f2e6 !important;
}

.nav-link {
  font-size: 0.95rem;
  color: #ffffff !important;
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  transition: background 0.2s;
}
.nav-link:hover,
.nav-link:focus {
  background-color: rgba(255, 255, 255, 0.15);
}

.dropdown-menu {
  border-radius: 4px;
  padding: 0.4rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transform: translateY(10px);
  visibility: hidden;
  transition: all 0.25s ease-in-out;
}

.nav-item.dropdown:hover .dropdown-menu {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
  display: block;
  margin-top: 0;
}

.nav-item.dropdown:hover > .nav-link {
  background-color: rgba(255, 255, 255, 0.15);
}

.dropdown-item {
  font-size: 0.9rem;
  border-radius: 3px;
}
.dropdown-item:hover {
  background-color: #f8f9fa;
}

.user-info {
  font-size: 0.9rem;
  color: #f8f9fa;
}

.navbar-toggler {
  border: none;
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255,1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

@media (max-width: 991px) {
  .nav-link {
    font-size: 1rem;
    padding: 0.6rem 1rem;
  }
}
</style>