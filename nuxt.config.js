export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FLightening',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: 'ant-design-vue/dist/antd.less', lang: 'less' },
    { src: '@assets/fonts.css', lang: 'css' },
    { src: '@assets/antd-menu-fix.css', lang: 'css' },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/antd-ui'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},
  auth: {
    redirect: {
      login: '/',
      callback: '/admin',
      home: '/admin',
    },
    strategies: {
      local: {
        token: {
          property: 'jwt',
          required: true,
          type: 'Bearer',
          maxAge: 25920000, // 30 days
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'https://localhost:8080/auth/login',
            method: 'post',
          },
          logout: false,
          // user: {
          //   url: 'https://localhost:8080/auth/me',
          //   property: false,
          //   method: 'get',
          // },
        },
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'zh',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#394AFF',
            'component-background': '#ffffff',
          },
        },
      },
    },
  },
  loading: {
    color: '#1890ff',
    continuous: true,
  },
}
