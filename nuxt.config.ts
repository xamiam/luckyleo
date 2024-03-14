import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  css: [
    '@/assets/css/main.scss'
  ],

  modules: [
    '@nuxtjs/apollo',
    '@nuxt/test-utils/module'
  ],

  routeRules: {
    '/api': {
      proxy: {
        to: 'https://www.lottohelden.de/graphql'
      }
    }
  },

  plugins: [
    '@/plugins/global.ts'
  ],

  apollo: {
    clients: {
      default: {
        // httpEndpoint: 'https://www.lottohelden.de/graphql'
        httpEndpoint: '/api'
      }
    },
  },
})
