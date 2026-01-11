import { ref } from 'vue'
import axios from 'axios'
import { useCookie, navigateTo } from '#app'

import { showError,showSuccess } from '~/composables/utils/toast'

export default function useLogin() {
  const phone = ref('')
  const password = ref('')
  const loading = ref(false)

  const handleLogin = async () => {
    loading.value = true
    try {
      const response = await axios.post('https://6mqffthw-8080.asse.devtunnels.ms/login', {
        phone: phone.value,
        password: password.value
      })

      // save token
      const token = useCookie('token')
      token.value = response.data.token

      // navigate
      navigateTo('/')

      // ✅ reusable toast
      showSuccess('អ្នកចូលប្រព័ន្ធបានជោគជ័យ')
    } catch (err) {
     showError(`មានបញ្ហា ${err}`)
    } finally {
      loading.value = false
    }
  }

  return { phone, password, loading, handleLogin }
}
