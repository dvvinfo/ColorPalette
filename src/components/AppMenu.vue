<template>
  <div class="flex items-center gap-4 min-w-max">
    <template v-for="item in menuItems" :key="item.label">
      <router-link v-if="item.isRouter" :to="item.to" class="nav-item">
        <span v-html="item.icon"></span>
        <span>{{ $t(item.label) }}</span>
      </router-link>
      <a
        v-else
        :href="item.to"
        class="nav-item"
        :class="{ active: item.active }"
        @click="handleAnchorClick($event, item.to)"
      >
        <span v-html="item.icon"></span>
        <span>{{ $t(item.label) }}</span>
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Обработка клика по якорным ссылкам
const handleAnchorClick = (event: Event, to: string) => {
  event.preventDefault()

  // Если ссылка содержит якорь
  if (to.includes('#')) {
    const [path, anchor] = to.split('#')

    // Если это якорь на главной странице
    if (path === '/' || path === '') {
      // Переходим на главную если мы не там
      if (router.currentRoute.value.path !== '/') {
        router.push('/').then(() => {
          // После перехода прокручиваем к якорю
          setTimeout(() => scrollToAnchor(anchor), 100)
        })
      } else {
        // Если уже на главной, просто прокручиваем
        scrollToAnchor(anchor)
      }
    }
  }
}

// Функция плавной прокрутки к якорю
const scrollToAnchor = (anchor: string) => {
  const element = document.getElementById(anchor)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const menuItems = [
  {
    label: 'navigation.promotions',
    icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>`,
    to: '/bonuses',
    isRouter: true,
    active: true,
  },
  {
    label: 'navigation.news',
    icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" /></svg>`,
    to: '/news',
    isRouter: true,
    active: true,
  },
  {
    label: 'navigation.games',
    icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" /></svg>`,
    to: '/#game',
    isRouter: false,
  },
  {
    label: 'navigation.about',
    icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z\" /></svg>`,
    to: '/about',
    isRouter: true,
  },
]
</script>
<style>
.router-link-active {
  color: var(--primary);
}
</style>
