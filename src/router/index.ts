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
      path: '/games/crash',
      name: 'crash',
      component: () => import('@/views/games/CrashGame.vue'),
    },
    {
      path: '/games/coin-flip',
      name: 'coin-flip',
      component: () => import('@/views/games/CoinFlipGame.vue'),
    },
    {
      path: '/games/slot-machine',
      name: 'slot-machine',
      component: () => import('@/views/games/SlotMachine.vue'),
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
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/news/NewsView.vue'),
    },
    {
      path: '/news/:id',
      name: 'news-detail',
      component: () => import('@/views/news/[id].vue'),
    },
    {
      path: '/bonuses',
      name: 'bonuses',
      component: () => import('@/views/BonusesView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/FAQ.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/terms',
      name: 'terms',
      component: () => import('@/views/TermsView.vue'),
    },
    {
      path: '/betting-rules',
      name: 'betting-rules',
      component: () => import('@/views/BettingRules.vue'),
    },
  ],
})

export default router
