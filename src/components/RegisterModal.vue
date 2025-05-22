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
      <h2 class="text-2xl font-bold mb-6 text-white">Регистрация</h2>
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
          <Field name="username" v-slot="{ field, errorMessage }">
            <BaseInput
              v-bind="field"
              type="text"
              placeholder="Имя пользователя"
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
          <Field name="confirmPassword" v-slot="{ field, errorMessage }">
            <BaseInput
              v-bind="field"
              type="password"
              placeholder="Подтвердите пароль"
              required
              :error="!!errorMessage"
              :disabled="loading"
            />
            <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
          </Field>
          <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        </div>
        <BaseButton
          type="submit"
          variant="primary"
          class="w-full mt-4"
          :disabled="!meta.valid || loading"
          :loading="loading"
        >
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </BaseButton>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const loading = ref(false)
const error = ref<string | null>(null)

const schema = yup.object({
  email: yup.string().email('Введите корректный email').required('Email обязателен'),
  username: yup
    .string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Имя пользователя обязательно'),
  password: yup
    .string()
    .min(5, 'Минимум 5 символов')
    .matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
    .matches(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
    .required('Пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
})

async function onSubmit(values: Record<string, unknown>) {
  try {
    loading.value = true
    error.value = null
    const success = await authStore.register(
      values.username as string,
      values.email as string,
      values.password as string,
    )
    if (success) {
      setTimeout(() => {
        emit('close')
      }, 500)
    } else {
      error.value = 'Ошибка при регистрации'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Произошла ошибка при регистрации'
  } finally {
    loading.value = false
  }
}

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
