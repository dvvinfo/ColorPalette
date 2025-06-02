<template>
  <div class="min-h-screen bg-background p-6">
    <div class=" mx-auto">
      <h1 class="text-2xl font-bold">{{ $t('profile.myProfile') }}</h1>

      <TabGroup :tabs="tabs" v-model:activeTab="activeTab" />

      <div class="mt-6">
        <div v-if="activeTab === $t('profile.myProfile')">
          <!-- Loading State -->
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div class="text-text-secondary">{{ $t('common.loading') }}</div>
          </div>

          <!-- Error State -->
          <div
            v-else-if="error"
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6"
          >
            {{ error }}
          </div>

          <!-- Profile Content -->
          <div v-else-if="userProfile" class="space-y-6">
            <!-- Main Profile Card -->
            <div class="bg-card-bg p-6 rounded-lg">
              <!-- User Header -->
              <div class="flex items-center gap-4 mb-6">
                <img
                  src="/images/user/avatar.png"
                  class="w-16 h-16 rounded-full"
                  :alt="$t('profile.userAvatar')"
                />
                <div>
                  <div class="text-white font-bold text-lg">{{ userProfile.username }}</div>
                  <div class="text-primary">{{ userProfile.role.name }}</div>
                  <div class="text-text-secondary text-sm">
                    {{ $t('profile.registrationDate') }}: {{ formatDate(userProfile.created_at) }}
                  </div>
                </div>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="text-center bg-background/50 rounded-lg p-4">
                  <div class="text-white font-bold text-2xl">
                    {{ formatCurrency(userProfile.balance) }}
                  </div>
                  <div class="text-text-secondary text-xs">{{ $t('profile.balance') }}</div>
                </div>
                <div class="text-center bg-background/50 rounded-lg p-4">
                  <div class="text-white font-bold text-2xl">152</div>
                  <div class="text-text-secondary text-xs">{{ $t('profile.points') }}</div>
                </div>
                <div class="text-center bg-background/50 rounded-lg p-4">
                  <img
                    src="/images/user/red_emblem.png"
                    class="w-8 h-8 mx-auto mb-1"
                    :alt="$t('profile.userAvatar')"
                  />
                  <div class="text-text-secondary text-xs">VIP уровень</div>
                </div>
                <div class="text-center bg-background/50 rounded-lg p-4">
                  <div class="text-green-500 font-bold text-2xl">{{ userProfile.role.name }}</div>
                  <div class="text-text-secondary text-xs">{{ $t('profile.role') }}</div>
                </div>
              </div>

              <!-- Profile Form -->
              <div class="border-t border-border pt-6 ">
                <h3 class="text-lg font-semibold mb-4">{{ $t('profile.personalInfo') }}</h3>
                <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ meta: formMeta }">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field name="username" v-slot="{ field, errorMessage }">
                      <label class="block text-gray-400 mb-1">{{ $t('auth.username') }}</label>
                      <BaseInput
                        v-bind="field"
                        :value="formData.username"
                        @input="formData.username = $event.target.value"
                        type="text"
                        :placeholder="$t('auth.username')"
                        :error="!!errorMessage"
                      />
                      <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                        {{ errorMessage }}
                      </div>
                    </Field>

                    <Field name="email" v-slot="{ field, errorMessage }">
                      <label class="block text-gray-400 mb-1">{{ $t('auth.email') }}</label>
                      <BaseInput
                        v-bind="field"
                        :value="formData.email"
                        @input="formData.email = $event.target.value"
                        type="email"
                        :placeholder="$t('auth.email')"
                        :error="!!errorMessage"
                      />
                      <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                        {{ errorMessage }}
                      </div>
                    </Field>

                    <Field name="phone" v-slot="{ field, errorMessage }">
                      <label class="block text-gray-400 mb-1">{{ $t('profile.phone') }}</label>
                      <BaseInput
                        v-bind="field"
                        :value="formData.phone"
                        @input="formData.phone = $event.target.value"
                        type="tel"
                        :placeholder="$t('profile.phone')"
                        :error="!!errorMessage"
                      />
                      <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                        {{ errorMessage }}
                      </div>
                    </Field>

                    <Field name="birthdate" v-slot="{ field, errorMessage }">
                      <label class="block text-gray-400 mb-1">{{ $t('profile.birthdate') }}</label>
                      <BaseInput
                        v-bind="field"
                        :value="formData.birthdate"
                        @input="formData.birthdate = $event.target.value"
                        type="date"
                        :error="!!errorMessage"
                      />
                      <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                        {{ errorMessage }}
                      </div>
                    </Field>

                    <Field name="gender" v-slot="{ field, errorMessage }">
                      <label class="block text-gray-400 mb-1">{{ $t('profile.gender') }}</label>
                      <div class="flex gap-4 mt-2">
                        <label class="flex items-center gap-2 cursor-pointer">
                          <input
                            v-bind="field"
                            type="radio"
                            value="male"
                            :checked="formData.gender === 'male'"
                            @change="formData.gender = 'male'"
                            class="text-primary focus:ring-primary"
                          />
                          {{ $t('profile.male') }}
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                          <input
                            v-bind="field"
                            type="radio"
                            value="female"
                            :checked="formData.gender === 'female'"
                            @change="formData.gender = 'female'"
                            class="text-primary focus:ring-primary"
                          />
                          {{ $t('profile.female') }}
                        </label>
                      </div>
                      <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                        {{ errorMessage }}
                      </div>
                    </Field>
                  </div>

                  <div class="flex gap-4 mt-6">
                    <BaseButton
                      type="submit"
                      :disabled="!formMeta.valid || updating"
                      :loading="updating"
                    >
                      {{ $t('common.save') }}
                    </BaseButton>
                    <BaseButton variant="outline" @click="loadProfile">
                      {{ $t('common.refresh') }}
                    </BaseButton>
                  </div>
                </Form>

                <div class="mt-4">
                  <a href="#" class="text-primary underline">{{ $t('profile.changePassword') }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="activeTab === $t('profile.myBonuses')">
          <UserBonuses />
        </div>
        <div v-if="activeTab === $t('profile.betHistory')">
          <BetHistory />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { userApi } from '@/services/api'
import type { User } from '@/services/api'
import TabGroup from '@/components/TabGroup.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import UserBonuses from '@/components/UserBonuses.vue'
import BetHistory from '@/components/BetHistory.vue'

const { t } = useI18n()

const tabs = computed(() => [
  t('profile.myProfile'),
  t('profile.myBonuses'),
  t('profile.betHistory'),
])

const activeTab = ref(t('profile.myProfile'))

// State
const loading = ref(false)
const updating = ref(false)
const error = ref('')
const userProfile = ref<User | null>(null)

// Form validation schema
const schema = computed(() =>
  yup.object({
    username: yup.string().required(t('validation.required')),
    email: yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
    phone: yup.string(),
    birthdate: yup.string(),
    gender: yup.string().oneOf(['male', 'female']),
  }),
)

// Form data
const formData = reactive({
  username: '',
  email: '',
  phone: '',
  birthdate: '',
  gender: 'male',
})

// Load user profile
const loadProfile = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await userApi.getProfile()
    userProfile.value = response.data

    // Update form data with user profile
    formData.username = userProfile.value.username || ''
    formData.email = userProfile.value.email || ''
    // Add other fields when they become available in the API
    formData.phone = ''
    formData.birthdate = ''
    formData.gender = 'male'
  } catch (err: unknown) {
    console.error('Error loading profile:', err)
    const errorMessage =
      err instanceof Error && 'response' in err && err.response
        ? (err.response as { data?: { error?: string } }).data?.error
        : undefined
    error.value = errorMessage || t('auth.errors.profileLoadError')
  } finally {
    loading.value = false
  }
}

// Update profile
const onSubmit = async (values: Record<string, unknown>) => {
  try {
    updating.value = true
    error.value = ''

    const updateData: Partial<User> = {
      username: values.username as string,
      email: values.email as string,
    }

    const response = await userApi.updateProfile(updateData)
    userProfile.value = response.data

    // Show success message (you can use a toast notification here)
    alert(t('common.success'))
  } catch (err: unknown) {
    console.error('Error updating profile:', err)
    const errorMessage =
      err instanceof Error && 'response' in err && err.response
        ? (err.response as { data?: { error?: string } }).data?.error
        : undefined
    error.value = errorMessage || 'Ошибка при обновлении профиля'
  } finally {
    updating.value = false
  }
}

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

// Load profile on component mount
onMounted(() => {
  loadProfile()
})
</script>
