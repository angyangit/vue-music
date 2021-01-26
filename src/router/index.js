import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: () => import('../views/Recommend'),
    children: [
      {
        path: ':id',
        component: () => import('../views/RecommendDetail')
      }
    ]
  },
  {
    path: '/singer',
    component: () => import('../views/Singer'),
    children: [
      {
        path: ':id',
        component: () => import('../views/SingerDetail')
      }
    ]
  },
  {
    path: '/rank',
    component: () => import('../views/Rank'),
    children: [
      {
        path: ':id',
        component: () => import('../views/RankDetail')
      }
    ]
  },
  {
    path: '/search',
    component: () => import('../views/Search'),
    children: [
      {
        path: ':id',
        component: () => import('../views/SingerDetail')
      }
    ]
  },
  {
    path: '/mine',
    component: () => import('../views/Mine')
  }
]

const router = new VueRouter({
  routes
})

export default router
