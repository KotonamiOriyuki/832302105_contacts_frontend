import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/register', component: () => import('./views/register.vue')},{
      path: '/login', component: () => import('./views/login.vue')
    },
    //   layout.vue: framework, contains home and personal information in el-main from layout
    {
      path: '/',
      component: () => import('./views/Layout.vue'),
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', component: () => import('./views/home.vue') },
        { path: 'profile', component: () => import('./views/Profile.vue') },
      ]
    }
  ]
})

// debug: dont allow logout user to visit page except /login and /register
// and dont allow login user to visit login and register page
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token && !['/login', '/register'].includes(to.path)) {
    next('/login')
  } else if (token && ['/login', '/register'].includes(to.path)) {
    next('/')
  } else {
    next()
  }
})

export default router