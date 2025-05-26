<template>
  <div class="w-full md:w-1/4">
    <div class="flex flex-col gap-6">
      <JackpotCounter class="mb-8" />
      <BonusCard title="Бонус" amount="1000" :time="10000" class="mb-8" />
      <PromotionPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import JackpotCounter from '@/components/JackpotCounter.vue'
import BonusCard from '@/components/BonusCard.vue'
import PromotionPanel from '@/components/PromotionPanel.vue'
</script>
