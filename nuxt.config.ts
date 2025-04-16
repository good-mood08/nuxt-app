// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['vue-yandex-maps/nuxt', '@nuxtjs/strapi'],
  yandexMaps: {
    apikey: '4b0f1bee-9061-4bf4-b1e1-6284de405188',
  },
  strapi: {
    url: 'http://localhost:1337'
  },
})