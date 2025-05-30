<template>
  <div class="min-h-screen bg-background w-full">
    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4 flex flex-col gap-6">
        <BackButton />
        <h1 class="text-2xl font-bold text-center">{{ $t('footer.bettingRules') }}</h1>
        <div class="flex flex-col gap-6 mt-6">
          <p>
            {{ $t('bettingRules.content') }}
          </p>
        </div>
      </div>
      <RightSidebar />
    </div>
  </div>
</template>
<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import RightSidebar from '@/components/RightSidebar.vue'
</script>
