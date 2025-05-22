import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/games/slots',
      name: 'slots',
      component: () => import('@/views/games/SlotMachine.vue'),
    },
    {
      path: '/games/:id',
      name: 'game',
      component: () => import('@/views/games/GameView.vue'),
    },
    {
      path: '/games/roulette',
      name: 'roulette',
      component: () => import('@/views/games/RouletteGame.vue'),
    },
    {
      path: '/games/blackjack',
      name: 'blackjack',
      component: () => import('@/views/games/BlackjackGame.vue'),
    },
    {
      path: '/games/wheel',
      name: 'wheel',
      component: () => import('@/views/games/WheelOfFortune.vue'),
    },
    {
      path: '/games/dice',
      name: 'dice',
      component: () => import('@/views/games/DiceGame.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/UserProfile.vue'),
    },
    {
      path: '/test/social-auth',
      name: 'SocialAuthTest',
      component: () => import('@/components/SocialAuthTest.vue'),
    },
    {
      path: '/in-development',
      name: 'in-development',
      component: () => import('@/views/InDevelopment.vue'),
    },
  ],
})

export default router
