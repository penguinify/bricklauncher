import { createRouter, createWebHistory } from 'vue-router'

import Home from './Home.vue'
import Settings from './Settings.vue'
import Appearance from './Appearance.vue'
import Setup from './setup.vue'
import CustomFflags from './CustomFflags.vue'
import Credits from './Credits.vue'

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '/appearance',
        component: Appearance
    },
    {
        path: '/setup',
        component: Setup
    },
    {
        path: '/customfflags',
        component: CustomFflags
    },
    {
        path: '/credits',
        component: Credits
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
