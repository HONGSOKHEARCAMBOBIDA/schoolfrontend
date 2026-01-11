<template>
  <nav class="navbar navbar-expand-lg excel-navbar fixed-top">
    <div class="container-fluid">
      <div class="login-image me-3">
        <img src="/public/image/logo.png" alt="Logo">
      </div>
      <!-- Brand -->
      <NuxtLink class="navbar-brand excel-brand" to="/">
       
        ប្រព័ន្ធគ្រប់គ្រង សាលាបឋមសិក្សាតាហែន
      </NuxtLink>

      <!-- Toggler -->
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

      <!-- Navbar links -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!-- Settings -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-gear me-1"></i> ការកំណត់
            </a>
            <ul class="dropdown-menu">
          


              <li>
                <NuxtLink class="dropdown-item" to="/role/createrole">
                  <i class="bi bi-person-badge me-1"></i> តួនាទី
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <NuxtLink class="dropdown-item" to="/user/viewuser" @click.stop>
  <i class="bi bi-people me-1"></i> អ្នកប្រើប្រាស់
</NuxtLink>

            
            </ul>
          </li>

          <!-- School -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-box-seam me-1"></i> សាលារៀន
            </a>
            <ul class="dropdown-menu">
              <li>
                <NuxtLink class="dropdown-item" to="/class/classview">
                  <i class="bi bi-building me-1"></i> ថ្នាក់រៀន
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/subject/subjectview">
                  <i class="bi bi-tags me-1"></i> មុខវិជ្ជា
                </NuxtLink>
              </li>
                            <li>
                <NuxtLink class="dropdown-item" to="/academicyear/academicyear">
                  <i class="bi bi-calendar me-1"></i> ឆ្នាំសិក្សា
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/classsubject/class-subject">
                  <i class="bi bi-tags me-1"></i> ចាប់មុខវិជ្ជាដាក់ថ្នាក់
                </NuxtLink>
              </li>

              <li><hr class="dropdown-divider" /></li>
              <li>
                <NuxtLink class="dropdown-item" to="/student/studentview">
                  <i class="bi bi-person me-1"></i> សិស្ស
                </NuxtLink>
              </li>
                <li>
                <NuxtLink class="dropdown-item" to="/student/studentlist">
                  <i class="bi bi-person me-1"></i> របាយការណ៍សិស្ស
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- School Management -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="schoolDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-grid me-1"></i> ការគ្រប់គ្រងសាលា
            </a>
            <ul class="dropdown-menu" aria-labelledby="schoolDropdown">
              <li>
                <NuxtLink class="dropdown-item" to="/examcomponent/createexamcomponent">
                  <i class="bi bi-clipboard me-1"></i> ប្រភេទការប្រលង
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/student/students">
                  <i class="bi bi-people me-1"></i> បញ្ចូលសិស្សទៅតាមថ្នាក់
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/teachersubject/teachersubject">
                  <i class="bi bi-person-badge me-1"></i> មុខវិជ្ជាដែលគ្រូបានបង្រៀន
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/classteacher/classteacher">
                  <i class="bi bi-person-badge me-1"></i> បន្ថែមថ្នាក់អោយគ្រូគ្រប់គ្រង
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/score/addscore">
                  <i class="bi bi-pencil-square me-1"></i> ដាក់ពិន្ទុសិស្ស
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/score/scoreview">
                  <i class="bi bi-bar-chart me-1"></i> របាយការណ៍ពិន្ទុសិស្ស
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/score/score">
                  <i class="bi bi-list-ol me-1"></i> ចំណាត់ថ្នាក់សិស្ស
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/promote/promote">
                  <i class="bi bi-arrow-up-circle me-1"></i> ដំឡើងថ្នាក់សិស្ស
                </NuxtLink>
              </li>
              <li>
                <NuxtLink class="dropdown-item" to="/promote/promoteview">
                  <i class="bi bi-clock-history me-1"></i> ប្រវត្តដំឡើងថ្នាក់សិស្ស
                </NuxtLink>
              </li>
                            <li>
                <NuxtLink class="dropdown-item" to="/score/yearresult">
                  <i class="bi bi-clock-history me-1"></i> លទ្ធិផលប្រចាំឆ្នាំ
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>

        <!-- User info (desktop) -->
        <div class="user-info d-none d-lg-block">
          <i class="bi bi-person-circle me-1"></i>
          សូមស្វាគមន៍, អ្នកប្រើប្រាស់
        </div>

        <!-- User info (mobile) -->
        <ul class="navbar-nav d-lg-none mt-3">
          <li class="nav-item">
            <a class="nav-link text-white" href="#">
              <i class="bi bi-person-circle me-1"></i>
              សូមស្វាគមន៍, អ្នកប្រើប្រាស់
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
function logout() {
  alert("Logout functionality would execute here");
}
</script>

<style>
.login-image {
  display: flex;
  justify-content: center;

}

.login-image img {
  width: 23px; /* adjust size */
  height: auto;
  border-radius: 10%; /* optional if you want a circle logo */
}
/* Font reset */
* {
  font-family: "Kantumruy Pro", sans-serif;
}

/* Navbar */
.excel-navbar {
  background-color: #1f497d;
  padding: 0.4rem 1rem;
}

/* Brand */
.excel-brand {
  font-weight: 600;
  color: #ffffff !important;
}
.excel-brand:hover {
  color: #d9f2e6 !important;
}

/* Links */
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

/* Dropdown */
.dropdown-menu {
  border-radius: 4px;
  padding: 0.4rem;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.08);
}
.dropdown-item {
  font-size: 0.9rem;
  border-radius: 3px;
}
.dropdown-item:hover {
  background-color: #f8f9fa;
}

/* User info */
.user-info {
  font-size: 0.9rem;
  color: #f8f9fa;
}

/* Toggler icon */
.navbar-toggler {
  border: none;
}
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255,1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}

/* Mobile adjustments */
@media (max-width: 991px) {
  .nav-link {
    font-size: 1rem;
    padding: 0.6rem 1rem;
  }
}
/* Show dropdown on hover */
.nav-item.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: 0; /* fix small gap */
}

.nav-item.dropdown:hover > .nav-link {
  background-color: rgba(255, 255, 255, 0.15); /* same hover effect */
}
/* Dropdown animation */
.dropdown-menu {
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
}


</style>
