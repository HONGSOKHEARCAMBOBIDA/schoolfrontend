import axios from 'axios'
import { useCookie, navigateTo } from '#app'

export default defineNuxtPlugin(() => {
  axios.interceptors.response.use(
    (response) => response, // pass through successful responses

    (error) => {
      if (error.response?.status === 401) {
        // Clear all cookies
        useCookie('token').value = null
        useCookie('name').value = null
        useCookie('role_name').value = null
        useCookie('profile').value = null
        useCookie('permissions').value = null
        useCookie('id').value = null

        // Redirect to login
        navigateTo('/login')
      }

      return Promise.reject(error)
    }
  )
})