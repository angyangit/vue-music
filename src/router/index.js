import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import('views/HomeRecommend')
  },
  {
    path: '/hot',
    name: 'hot',
    component: () => import('views/HomeHot.vue'),
    children: [
      {
        path: ':id',
        name: 'HomeHotDetail',
        component: (resolve) => {
          import('views/HomeHotDetail').then((module) => {
            resolve(module)
          })
        }
        // require('views/HomeHotDetail').default
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('views/HomeSearch')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('views/HomeRanking'),
    children: [
      {
        path: 'detail',
        name: 'HomeRankingDetail',
        component: require('views/HomeRankingDetail.vue').default
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
