<template>
  <div class="main-container">
    <div class="login-container">
      <!-- Logo -->
      <div class="login-image">
        <img src="/image/logo.png" alt="Logo" />
      </div>

      <!-- Title -->
      <div class="login-header">
        <h2>សាលាបឋមសិក្សាតាហែន</h2>
     
      </div>
   

      <!-- Form -->
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="phone">លេខទូរសព្ទ</label>
          <input
            type="text"
            id="phone"
            placeholder="សូមបញ្ចូលលេខទូរសព្ទ"
            v-model="phone"
          />
        </div>

        <div class="form-group">
          <label for="password">លេខសម្ងាត់</label>
          <input
            type="password"
            id="password"
            placeholder="សូមបញ្ចូលលេខសម្ងាត់"
            v-model="password"
          />
        </div>

        <button type="submit" class="btn" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
          <span v-else>ចូលប្រព័ន្ធ</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLogin from './auth/useLogin';
const {
   phone, 
   password, 
   loading, 
   handleLogin } = useLogin();
</script>

<style scoped>
/* Layout */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Kantumruy Pro', sans-serif;
}
body {
  background-color: #f8fafc;
  display: flex;
  justify-content: center;  /* center horizontally */
  align-items: center;      /* center vertically */
  min-height: 100vh;        /* full height */
  margin: 0;
}

.main-container {
  display: flex;
  justify-content: center;  /* horizontal center */
  align-items: center;      /* vertical center */
  min-height: 100vh;        /* full screen */
  padding: 20px;
}


/* Card */
.login-container {
  background: #fff;
  border-radius: 3px;
  border: 1px solid #cbd5e1; /* light gray border */
  width: 100%;
  max-width: 400px;
  padding: 40px 30px;
  text-align: center;
}


/* Logo */
.login-image img {
  width: 70px;
  margin-bottom: 20px;
}

/* Title */
.login-header h2 {
  font-size: 22px;
  color: #1f497d;
  margin-bottom: 30px;
  font-weight: 600;
}

/* Input */
.form-group {
  text-align: left;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 15px;
  transition: border 0.2s, box-shadow 0.2s;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  outline: none;
}

/* Button */
.btn {
  width: 100%;
  padding: 12px;
  background-color: #1f497d;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  background-color: #2d5fa8;
}

.btn:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}

/* Spinner */
.spinner {
  width: 18px;
  height: 18px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
