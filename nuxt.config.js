import env from './env'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head

  server: {
    port: 8012,
    host: '0.0.0.0',
  },
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  head: {
    title: '大连海事教务-教师端',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/css/style.scss',
    '@/assets/css/icons.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/globalData', ssr: false },
  ],

  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],
  axios: {
    proxy: true, // 表示开启代理
    prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: true, // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target: env[process.env.NODE_ENV].URL, // 目标接口域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/api', // 把 /api 替换成 /
      },
    },
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  // 编译需要
  router: {
    // base: process.env.NODE_ENV === 'production' ? '/org' : '/',
    base: process.env.NODE_ENV === 'production' ? '/teacher' : '/',
    middleware: 'authenticated',
  },
  env: {
    BASE_URL: env[process.env.NODE_ENV].URL,
  },
  // Modules: https://go.nuxtjs.dev/config-modules

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    vendor: ['axios'], // 为防止重复打包
  },
  //  http://dlhs.ofapp.net/
}
