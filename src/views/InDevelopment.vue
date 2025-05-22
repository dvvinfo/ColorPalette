<template>
  <div class="flex flex-col items-center justify-center min-h-[60vh] text-center">
    <svg width="120" height="120" fill="none" viewBox="0 0 24 24" class="mb-6">
      <circle cx="12" cy="12" r="10" stroke="#ff3040" stroke-width="2" fill="#fff0f3" />
      <path d="M8 12h8M8 16h8" stroke="#ff3040" stroke-width="2" stroke-linecap="round" />
      <rect x="8" y="8" width="8" height="2" rx="1" fill="#ff3040" />
    </svg>
    <h1 class="text-3xl font-bold mb-2">Раздел в разработке</h1>
    <p class="text-lg text-gray-400 mb-4">
      Этот раздел скоро будет доступен.<br />Следите за обновлениями!
    </p>
    <router-link to="/" class="btn-primary">На главную</router-link>
  </div>
</template>
