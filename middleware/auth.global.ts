export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('token')

  // If no token and not already on /login, redirect
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})
