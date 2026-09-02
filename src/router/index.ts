import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import FilesView from '../views/FilesView.vue'
import SettingsView from '../views/SettingsView.vue'
import ControlView from '../views/ControlView.vue'
import JobHistoryView from '../views/JobHistoryView.vue'
import SystemView from '../views/SystemView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: DashboardView,
      name: 'Dashboard',
      meta:{
        icon: 'A'
      }
    },
    {
      path: '/system',
      component: SystemView,
      name: 'System'
    },
    {
      path: '/files',
      component: FilesView,
      name: 'Files'
    },
    {
      path: '/settings',
      component: SettingsView,
      name: 'Settings'
    },
    {
      path: '/control',
      component: ControlView,
      name: 'Control'
    },
    {
      path: '/jobHistory',
      component: JobHistoryView,
      name: 'History'
    }
  ]
})

export default router