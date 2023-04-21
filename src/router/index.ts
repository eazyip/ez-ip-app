import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NetworkIpv4Classful from '@/components/NetworkIpv4Classful.vue'
import NetworkIpv4 from '@/components/NetworkIpv4.vue'
import SubnetCalculatorIpv4 from '@/components/SubnetCalculatorIpv4.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/app',
            name: 'app',
            // route level code-splitting
            // this generates a separate chunk (App.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('@/views/AppView.vue'),
            children: [
                {
                    path: '/app/ipv4/address-classful-analyses',
                    name: 'ipv4-address-classful-analyses',
                    component: NetworkIpv4Classful
                },
                {
                    path: '/app/ipv4/address-analyses',
                    name: 'ipv4-address-analyses',
                    component: NetworkIpv4
                },
                {
                    path: '/app/ipv4/subnet-calculator',
                    name: 'ipv4-subnet-calculator',
                    component: SubnetCalculatorIpv4
                }
            ]
        }
    ]
})

export default router
