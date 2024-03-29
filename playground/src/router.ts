import { createRouter, createWebHistory } from 'vue-router'
import NumberDemo from './pages/NumberDemo.vue'
import ObjectDemo from './pages/ObjectDemo.vue'
import PasswordDemo from './pages/PasswordDemo.vue'
import StringDemo from './pages/StringDemo.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/number', component: NumberDemo },
    { path: '/object', component: ObjectDemo },
    { path: '/password', component: PasswordDemo },
    { path: '/string', component: StringDemo }
  ],
})
