import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SlotMachine from '../views/games/SlotMachine.vue'
import Roulette from '../views/games/RouletteGame.vue'
import Blackjack from '../views/games/BlackjackGame.vue'
import WheelOfFortune from '../views/games/WheelOfFortune.vue'
import DiceGame from '../views/games/DiceGame.vue'
import UserProfile from '../views/UserProfile.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/games/slots',
      name: 'slots',
      component: SlotMachine,
    },
    {
      path: '/games/roulette',
      name: 'roulette',
      component: Roulette,
    },
    {
      path: '/games/blackjack',
      name: 'blackjack',
      component: Blackjack,
    },
    {
      path: '/games/wheel',
      name: 'wheel',
      component: WheelOfFortune,
    },
    {
      path: '/games/dice',
      name: 'dice',
      component: DiceGame,
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
    },
  ],
})

export default router
