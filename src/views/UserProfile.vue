<template>
  <div class="mx-auto bg-card-bg rounded-2xl p-8 mt-8 shadow-lg">
    <div class="flex items-center gap-4 mb-6">
      <BackButton />
      <h1 class="text-2xl font-bold">Профиль</h1>
    </div>
    <!-- Tabs -->
    <BaseTabs v-model="activeTab" :tabs="tabs" />
    <div v-if="activeTab === 'ПРОФИЛЬ'">
      <!-- Profile Form -->
      <Form :validation-schema="schema" @submit="onSubmit" class="space-y-6">
        <div class="flex gap-8 items-center mb-6">
          <img
            src="/images/user/avatar.png"
            class="w-20 h-20 rounded-full border-4 border-primary"
            alt="Аватар"
          />
          <div>
            <div class="text-white font-bold text-lg">Статус</div>
            <div class="text-primary">Новичок</div>
          </div>
          <div class="ml-auto flex flex-col items-center">
            <img src="/images/user/red_emblem.png" class="w-12 h-12" alt="Достижения" />
            <div class="text-white text-xs">Достижения</div>
            <div class="text-primary text-sm">0/0</div>
          </div>
          <div class="ml-8 flex flex-col items-center">
            <img src="/images/user/points.webp" class="w-12 h-12" alt="Баллы" />
            <div class="text-white text-xs">Баллы</div>
            <div class="text-primary text-sm">0</div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Field name="username" v-slot="{ field, errorMessage }">
            <div>
              <label class="block text-gray-400 mb-1">Имя</label>
              <input
                v-bind="field"
                type="text"
                class="w-full rounded-lg px-4 py-3 bg-white/90 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="Имя"
              />
              <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
            </div>
          </Field>
          <Field name="birthdate" v-slot="{ field, errorMessage }">
            <div>
              <label class="block text-gray-400 mb-1">Дата рождения</label>
              <input
                v-bind="field"
                type="date"
                class="w-full rounded-lg px-4 py-3 bg-white/90 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
              />
              <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
            </div>
          </Field>
          <Field name="email" v-slot="{ field, errorMessage }">
            <div>
              <label class="block text-gray-400 mb-1">E-mail</label>
              <div class="flex items-center gap-2">
                <input
                  v-bind="field"
                  type="email"
                  class="w-full rounded-lg px-4 py-3 bg-white/90 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
                  placeholder="E-mail"
                />
                <!-- <span class="text-xs text-red-500 cursor-pointer">Подтвердить</span> -->
              </div>
              <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
            </div>
          </Field>
          <Field name="gender" v-slot="{ field, errorMessage }">
            <div>
              <label class="block text-gray-400 mb-1">Пол</label>
              <div class="flex gap-2">
                <label class="flex-1">
                  <input type="radio" value="male" v-model="field.value" class="hidden" />
                  <div
                    :class="[
                      'rounded-full px-6 py-2 text-center cursor-pointer',
                      field.value === 'male' ? 'bg-primary text-white' : 'bg-white/90 text-black',
                    ]"
                  >
                    Мужской
                  </div>
                </label>
                <label class="flex-1">
                  <input type="radio" value="female" v-model="field.value" class="hidden" />
                  <div
                    :class="[
                      'rounded-full px-6 py-2 text-center cursor-pointer',
                      field.value === 'female' ? 'bg-primary text-white' : 'bg-white/90 text-black',
                    ]"
                  >
                    Женский
                  </div>
                </label>
              </div>
              <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
            </div>
          </Field>
          <Field name="phone" v-slot="{ field, errorMessage }">
            <div>
              <label class="block text-gray-400 mb-1">Телефон</label>
              <input
                v-bind="field"
                type="tel"
                class="w-full rounded-lg px-4 py-3 bg-white/90 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary transition"
                placeholder="+7"
              />
              <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
            </div>
          </Field>
        </div>
        <div class="flex justify-center">
          <BaseButton type="submit" class="mt-6" :disabled="!isValid"> Сохранить </BaseButton>
        </div>
        <div class="text-center mt-2">
          <a href="#" class="text-primary underline">Сменить пароль</a>
        </div>
        <div class="flex justify-between text-xs text-gray-400 mt-6">
          <div>ID 86234833</div>
          <div>Дата регистрации 01.01.1970</div>
        </div>
      </Form>
    </div>
    <div v-if="activeTab === 'МОИ БОНУСЫ'">
      <h2>Мои бонусы</h2>
    </div>
    <div v-if="activeTab === 'ИСТОРИЯ СТАВОК'">
      <h2>История ставок</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Form, Field, useForm } from 'vee-validate'
import * as yup from 'yup'
import BaseButton from '@/components/BaseButton.vue'
import BaseTabs from '@/components/BaseTabs.vue'
import BackButton from '@/components/BackButton.vue'

const tabs = ['ПРОФИЛЬ', 'МОИ БОНУСЫ', 'ИСТОРИЯ СТАВОК']
const activeTab = ref(tabs[0])

const schema = yup.object({
  username: yup.string().required('Имя обязательно'),
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  phone: yup.string().required('Телефон обязателен'),
  birthdate: yup.string().required('Дата рождения обязательна'),
  gender: yup.string().oneOf(['male', 'female'], 'Выберите пол').required('Пол обязателен'),
})

const { meta } = useForm()
const isValid = computed(() => meta.value.valid)

function onSubmit(values: Record<string, unknown>) {
  alert('Сохранено! ' + JSON.stringify(values, null, 2))
}
</script>
