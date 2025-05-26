<template>
  <div class="flex items-center gap-4 min-w-max">
    <template v-for="item in menuItems" :key="item.label">
      <router-link v-if="item.isRouter" :to="item.to" class="nav-item">
        <span v-html="item.icon"></span>
        <span>{{ item.label }}</span>
      </router-link>
      <a v-else :href="item.to" class="nav-item" :class="{ active: item.active }">
        <span v-html="item.icon"></span>
        <span>{{ item.label }}</span>
      </a>
    </template>
  </div>
</template>

<script setup lang="ts">
const menuItems = [
  {
    label: 'Бонусы',
    icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>`,
    to: '/bonuses',
    isRouter: true,
    active: true,
  },
  {
    label: 'Новости',
    icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" /></svg>`,
    to: '/news',
    isRouter: true,
    active: true,
  },
  {
    label: 'Live казино',
    icon: `<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z\" /></svg>`,
    to: '#game',
    isRouter: true,
  },
  {
    label: 'О нас',
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
