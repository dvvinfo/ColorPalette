<template>
  <div class="min-h-screen bg-background w-full">
    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4 flex flex-col gap-6">
        <BackButton />
        <h1 class="text-2xl font-bold text-center">{{ $t('about.title') }}</h1>
        <div class="flex flex-col gap-6">
          <p>
            {{ $t('about.description') }}
          </p>
        </div>
      </div>
      <RightSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import RightSidebar from '@/components/RightSidebar.vue'
import BackButton from '@/components/BackButton.vue'
</script>

<style></style>
