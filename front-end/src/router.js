import VueRouter from 'vue-router'
export default {
  router: (Vue) => {
    Vue.use(VueRouter)

    const Body = () => import('./component/Body')
    const Main = () => import('./component/Main')
    const Test = () => import('./component/test')
    const Login = () => import('./component/login')
    const TLS = () => import('./component/TLS')

    const routes = [{
        path: '/',
        component: Main
      },
      {
        path: '/body',
        component: Body
      },
      {
        path: '/login',
        component: Login
      },
      {
        path: '/test',
        component: Test
      },
      {
        path: '/tls',
        component: TLS
      }
    ]

    const router = new VueRouter({
      mode: 'hash',
      routes
    })
    return router
  }
}