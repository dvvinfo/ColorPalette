<template>
  <div class="min-h-screen bg-background p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold">{{ $t('profile.myProfile') }}</h1>

      <TabGroup :tabs="tabs" v-model:activeTab="activeTab" />

      <div class="mt-6">
        <div v-if="activeTab === $t('profile.myProfile')">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- User info card -->
            <div class="bg-card-bg p-6 rounded-lg">
              <div class="flex items-center gap-4 mb-6">
                <img
                  src="/images/user/avatar.png"
                  class="w-16 h-16 rounded-full"
                  :alt="$t('profile.myProfile')"
                />
                <div>
                  <div class="text-white font-bold text-lg">{{ $t('profile.myProfile') }}</div>
                  <div class="text-primary">{{ $t('profile.myProfile') }}</div>
                </div>
              </div>
              <div class="flex justify-between">
                <div class="text-center">
                  <img
                    src="/images/user/red_emblem.png"
                    class="w-12 h-12"
                    :alt="$t('profile.myProfile')"
                  />
                  <div class="text-white text-xs">{{ $t('profile.myProfile') }}</div>
                </div>
                <div class="text-center">
                  <div class="text-white font-bold text-2xl">152</div>
                  <img
                    src="/images/user/points.webp"
                    class="w-12 h-12"
                    :alt="$t('profile.myProfile')"
                  />
                  <div class="text-white text-xs">{{ $t('profile.myProfile') }}</div>
                </div>
              </div>
            </div>

            <!-- Profile form -->
            <div class="bg-card-bg p-6 rounded-lg">
              <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ meta: formMeta }">
                <div class="grid grid-cols-1 gap-4">
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

                  <Field name="email" v-slot="{ field, errorMessage }">
                    <label class="block text-gray-400 mb-1">{{ $t('auth.email') }}</label>
                    <div class="flex gap-2 items-center">
                      <BaseInput
                        v-bind="field"
                        :value="formData.email"
                        @input="formData.email = $event.target.value"
                        type="email"
                        class="flex-1"
                        :error="!!errorMessage"
                      />
                      <!-- <span class="text-xs text-red-500 cursor-pointer">{{ $t('messages.confirmEmail') }}</span> -->
                    </div>
                    <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                      {{ errorMessage }}
                    </div>
                  </Field>

                  <Field name="gender" v-slot="{ field, errorMessage }">
                    <label class="block text-gray-400 mb-1">{{ $t('profile.gender') }}</label>
                    <div class="flex gap-4">
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

                  <Field name="phone" v-slot="{ field, errorMessage }">
                    <label class="block text-gray-400 mb-1">{{ $t('profile.phone') }}</label>
                    <BaseInput
                      v-bind="field"
                      :value="formData.phone"
                      @input="formData.phone = $event.target.value"
                      type="tel"
                      :error="!!errorMessage"
                    />
                    <div v-if="errorMessage" class="text-red-500 text-xs mt-1">
                      {{ errorMessage }}
                    </div>
                  </Field>
                </div>

                <BaseButton type="submit" class="mt-6" :disabled="!formMeta.valid">{{
                  $t('common.save')
                }}</BaseButton>
              </Form>

              <a href="#" class="text-primary underline">{{ $t('profile.changePassword') }}</a>
            </div>
          </div>

          <div class="mt-4 text-gray-400 text-sm">
            <div>{{ $t('profile.registrationDate') }} 01.01.1970</div>
          </div>
        </div>

        <div v-if="activeTab === $t('profile.myBonuses')">
          <h2>{{ $t('profile.myBonuses') }}</h2>
        </div>
        <div v-if="activeTab === $t('profile.betHistory')">
          <h2>{{ $t('profile.betHistory') }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TabGroup from '@/components/TabGroup.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'

const { t } = useI18n()

const tabs = computed(() => [
  t('profile.myProfile'),
  t('profile.myBonuses'),
  t('profile.betHistory'),
])

const activeTab = ref(t('profile.myProfile'))

const schema = computed(() =>
  yup.object({
    username: yup.string().required(t('validation.required')),
    email: yup.string().email(t('validation.invalidEmail')).required(t('validation.required')),
    phone: yup.string().required(t('validation.required')),
    birthdate: yup.string().required(t('validation.required')),
    gender: yup
      .string()
      .oneOf(['male', 'female'], t('validation.required'))
      .required(t('validation.required')),
  }),
)

const formData = reactive({
  username: 'username',
  email: 'user@example.com',
  phone: '+7 (999) 123-45-67',
  birthdate: '1990-01-01',
  gender: 'male',
})

function onSubmit(values: Record<string, unknown>) {
  alert(t('common.success') + '! ' + JSON.stringify(values, null, 2))
}
</script>
