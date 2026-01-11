// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', 'nuxt-toast','@nuxtjs/tailwindcss'],
    ui: {
    // optional configuration
  },
  components: true,
 
  compatibilityDate: '2025-08-22',
  pages: true,

  app: {
    head: {
      title: 'Nuxt SCHOOLFRONTEND',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
        { name: 'description', content: 'Nuxt MOTOFRONTEND' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@400;700&display=swap',
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css'
        },

        {
          rel: 'stylesheet',
          href: 'https://db.onlinewebfonts.com/c/98074c2952cf712f03204967c998d2ca?family=Khmer+OS+Muol'
        }

      ],
      script: [
        {
          src: 'https://code.jquery.com/jquery-3.7.1.min.js',
          type: 'text/javascript',
        },
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js',
          type: 'text/javascript',
        }
      ]
    }
  }
})
