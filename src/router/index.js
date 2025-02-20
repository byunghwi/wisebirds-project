import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/Main.vue')
    },
    {
      path: '/campaigns',
      name: 'Campaigns',
      component: () => import('@/views/CampaignList.vue')
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('@/views/UserList.vue')
    }
  ],
})

export default router
