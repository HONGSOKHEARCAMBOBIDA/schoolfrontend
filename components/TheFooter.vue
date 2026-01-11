<template>
  <footer class="excel-footer">
    <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
      <!-- Left -->
      <div class="footer-left">
        <span>&copy; 2025 ប្រព័ន្ធគ្រប់គ្រង សាលាបឋមសិក្សាតាហែន ជំនាន់១</span>
      </div>

      <!-- Right -->
      <div class="footer-right">
        <a href="#" class="footer-link">អំពីយើង</a>
        <a href="#" class="footer-link">ទំនាក់ទំនង</a>
        <a href="#" class="footer-link">គោលការណ៍</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
* {
  font-family: "Kantumruy Pro", sans-serif;
}
.excel-footer {
  background-color: #1f497d; /* same as header */
  color: #fff;
  padding: 1rem 0;
  position: fixed;   /* always at bottom */
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1030; /* above other content */
}

/* container text */
.excel-footer span {
  font-size: 0.9rem;
}

/* links */
.footer-link {
  color: #ffffff;
  margin-left: 1rem;
  text-decoration: none;
  font-size: 0.9rem;
}
.footer-link:hover {
  color: #d9f2e6; /* lighter green */
}
</style>
