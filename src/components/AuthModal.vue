<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    @mousedown.self="$emit('close')"
  >
    <div class="bg-card-bg rounded-2xl shadow-xl w-full max-w-md p-8 relative">
      <button
        class="absolute top-4 right-4 text-2xl text-white/60 hover:text-primary"
        @click="$emit('close')"
      >
        &times;
      </button>
      <h2 class="text-2xl font-bold mb-6 text-white">Вход</h2>
      <Form
        :validation-schema="schema"
        @submit="onSubmit"
        validate-on-blur
        validate-on-change
        validate-on-input
        v-slot="{ meta }"
      >
        <div class="space-y-4">
          <Field name="email" v-slot="{ field, errorMessage }">
            <BaseInput
              v-bind="field"
              type="email"
              placeholder="Email"
              required
              :error="!!errorMessage"
            />
            <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
          </Field>
          <Field name="password" v-slot="{ field, errorMessage }">
            <BaseInput
              v-bind="field"
              type="password"
              placeholder="Пароль"
              required
              :error="!!errorMessage"
            />
            <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
          </Field>
        </div>
        <BaseButton type="submit" variant="primary" class="w-full mt-4" :disabled="!meta.valid"
          >Войти</BaseButton
        >
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Пароль обязателен'),
})

function onSubmit(values: Record<string, unknown>) {
  // Здесь будет POST /login
  // payload: values
  // Ожидается JWT токен
  emit('success', {
    email: values.email as string,
    password: values.password as string,
  })
}

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'success', data: { email: string; password: string }): void
}>()
</script>

<style scoped>
.input {
  @apply w-full rounded-lg px-4 py-3 bg-white/90 text-black placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary transition;
}
.btn-primary {
  @apply bg-primary text-white px-4 py-3 rounded-lg font-bold hover:bg-opacity-90 transition;
}
</style>
