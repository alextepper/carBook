import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CarDetails from '../views/CarDetails.vue'
import BestReviewed from '../views/BestReviewed.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import CreateAdView from '../views/CreateAdView.vue'
import AdsListView from '../views/AdsListView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/car/:id',
    name: 'CarDetails',
    component: CarDetails
  },
  {
    path: '/best-reviewed',
    name: 'BestReviewed',
    component: BestReviewed
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPasswordView
  },
  {
    path: '/create-ad',
    name: 'CreateAd',
    component: CreateAdView
  },
  {
    path: '/ads',
    name: 'AdsList',
    component: AdsListView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
