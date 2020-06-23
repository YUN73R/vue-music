import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'
import Rank from '@/pages/rank'
import Search from '@/pages/search'
import Singer from '@/pages/singer'
import listDetail from '@/pages/list_detail'
import singerDetail from '@/pages/singer_detail'
import rankDetail from '@/pages/rank_detail'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/index',
        },
        {
            path: '/index',
            component: Index,
            meta: {
                show: true
            }
        },
        {
            path: '/rank',
            component: Rank,
            meta: {
                show: true
            }
        },
        {
            path: '/search',
            component: Search,
            meta: {
                show: true
            }
        },
        {
            path: '/singer',
            component: Singer,
            meta: {
                show: true
            }
        },
        {
            name: 'songd',
            path: '/songlist/:id',
            component: listDetail,
            meta: {
                show: false
            }
        },
        {
            name: 'sigerd',
            path: '/singer/:id',
            component: singerDetail,
            meta: {
                show: false
            }
        },
        {
            name: 'rankd',
            path: '/rank/:id',
            component: rankDetail,
            meta: {
                show: false
            }
        }
    ]
})
