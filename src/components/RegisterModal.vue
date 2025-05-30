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
      <h2 class="text-2xl font-bold mb-6 text-white">{{ $t('auth.registerTitle') }}</h2>
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
              :placeholder="$t('auth.email')"
              required
              :error="!!errorMessage"
            />
            <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
          </Field>
          <Field name="username" v-slot="{ field, errorMessage }">
            <BaseInput
              v-bind="field"
              type="text"
              :placeholder="$t('auth.username')"
              required
              :error="!!errorMessage"
            />
            <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
          </Field>
          <Field name="password" v-slot="{ field, errorMessage }">
            <BaseInput
              v-bind="field"
              type="password"
              :placeholder="$t('auth.password')"
              required
              :error="!!errorMessage"
            />
            <div v-if="errorMessage" class="text-red-500 text-xs mt-1">{{ errorMessage }}</div>
          </Field>
          <Field name="confirmPassword" v-slot="{ field, errorMessage }">
            <BaseInput
              v-bind="field"
              type="password"
              :placeholder="$t('auth.confirmPassword')"
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
          {{ loading ? $t('common.loading') : $t('common.register') }}
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const authStore = useAuthStore()
const loading = ref(false)
const error = ref<string | null>(null)

const schema = computed(() =>
  yup.object({
    email: yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
    username: yup
      .string()
      .min(3, t('validation.minLength', { count: 3 }))
      .max(20, t('validation.maxLength', { count: 20 }))
      .required(t('validation.required')),
    password: yup
      .string()
      .min(5, t('validation.minLength', { count: 5 }))
      .matches(/[A-Z]/, t('validation.passwordMustContain') + ' ' + t('validation.uppercase'))
      .matches(/[0-9]/, t('validation.passwordMustContain') + ' ' + t('validation.number'))
      .required(t('validation.required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('validation.passwordsMatch'))
      .required(t('validation.required')),
  }),
)

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
      error.value = t('auth.registerError')
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : t('auth.registerError')
  } finally {
    loading.value = false
  }
}

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>
