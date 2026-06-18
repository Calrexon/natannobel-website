// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: false },
  features: { manifest: false },

  modules: [
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    'nuxt-schema-org',
  ],

  app: {
    head: {
      title: 'Natan Nobel — Builder, Crafter, Dreamer',
      htmlAttrs: { lang: 'en' },
      meta: [
        { name: 'description', content: 'Personal site of Natan Nobel — frontend & backend developer obsessed with TypeScript, Python, Rust, Svelte, and making the web feel alive.' },
        { name: 'theme-color', content: '#0a0a0f' },
        // Open Graph
        { property: 'og:title', content: 'Natan Nobel — Builder, Crafter, Dreamer' },
        { property: 'og:description', content: 'Frontend & backend developer obsessed with TypeScript, Python, Rust, Svelte, and making the web feel alive.' },
        { property: 'og:image', content: 'https://dc.missuo.ru/file/1499035637704298558' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:url', content: 'https://reincal.is-a.dev/' },
        { property: 'og:type', content: 'website' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Natan Nobel — Builder, Crafter, Dreamer' },
        { name: 'twitter:description', content: 'Frontend & backend developer obsessed with TypeScript, Python, Rust, Svelte, and making the web feel alive.' },
        { name: 'twitter:image', content: 'https://dc.missuo.ru/file/1499035637704298558' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Natan Nobel Blog', href: '/rss.xml' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  googleFonts: {
    families: {
      'Bebas Neue': true,
      'DM Sans': [400, 500, 600],
      'JetBrains Mono': [400, 500],
    },
    display: 'swap',
    preload: true,
  },

  content: {},

  sitemap: {
    hostname: 'https://reincal.is-a.dev',
  },

  schemaOrg: {
    identity: {
      type: 'Person',
      name: 'Natan Nobel',
      url: 'https://reincal.is-a.dev',
    },
  },

  nitro: {
    prerender: {
      routes: ['/', '/projects', '/blog', '/contact'],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/projects': { prerender: true },
    '/blog': { prerender: true },
    '/contact': { prerender: true },
  },

  css: ['~/assets/css/main.css', '~/assets/css/reduced-motion.css'],

  vite: {
    plugins: [
      (await import('@tailwindcss/vite')).default(),
    ],
    optimizeDeps: {
      include: ['vue', 'vue-router', 'gsap', 'gsap/ScrollTrigger', '@unhead/schema-org/vue'],
    },
  },
})
