<template>
 <div class="min-h-screen bg-background w-full">
  <div class="flex flex-col md:flex-row gap-6 mt-8">
    <div class="w-full md:w-3/4 flex flex-col gap-6">
      <BackButton />
      <h1 class="text-2xl font-bold text-center">Казино  азартная традиция, проверенная временем</h1>
      <div class="flex flex-col gap-6">
        <p>
          Вам приходилось слышать о казино Об этой знаменитой, громадной и великолепной гемблинговой сети, прославившейся лучшими автоматами, самыми большими джекпотами, отменным сервисом и индивидуальным подходом к каждому игроку. Знаете ли вы, что история данного заведения началась много лет назад, в те времена, когда практически на каждой улице располагались залы с игровыми автоматами? Выбор подобных заведений тогда был огромен, но далеко не каждое из них могло похвастаться надлежащим уровнем, не говоря уж о честности.  Онлайн версия знаменитого казино продолжает славную традицию.
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

<style>
</style>
