<template>
  <div class="min-h-screen bg-background flex items-center justify-center">
    <div class="text-center">
      <div class="mb-8">
        <svg
          class="mx-auto h-24 w-24 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      </div>
      <h1 class="text-3xl font-bold mb-2">{{ $t('common.inDevelopment') }}</h1>
      <p class="text-gray-400 mb-6">
        {{ $t('common.inDevelopmentText') }}<br />{{ $t('common.stayTuned') }}
      </p>
      <router-link to="/" class="btn-primary">{{ $t('navigation.home') }}</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Логика компонента
</script>
