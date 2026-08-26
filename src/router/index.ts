import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import CameraView from '../views/CameraView.vue'
import FilesView from '../views/FilesView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: DashboardView
    },
    {
      path: '/camera',
      component: CameraView
    },
    {
      path: '/files',
      component: FilesView
    },
    {
      path: '/settings',
      component: SettingsView
    }
  ]
})

export default router