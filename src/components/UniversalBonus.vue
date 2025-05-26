<template>
  <div
    ref="bonusCardRef"
    class="bonus-card relative overflow-hidden rounded-xl p-6 text-white transition-transform hover:scale-105"
    :class="backgroundClass"
  >
    <!-- Info Button -->
    <button
      class="absolute top-4 right-4 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer z-10"
      @click.stop="showInfo = !showInfo"
    >
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        />
      </svg>
    </button>

    <!-- Main Content -->
    <div class="relative z-10">
      <!-- Title -->
      <h3 class="text-xl md:text-2xl font-bold mb-2">{{ title }}</h3>

      <!-- Subtitle -->
      <p v-if="subtitle" class="text-white/80 mb-4">{{ subtitle }}</p>

      <!-- Bonus Details -->
      <div class="mb-6">
        <div v-if="amount" class="text-lg font-semibold mb-1">{{ amount }}</div>
        <div v-if="description" class="text-sm text-white/70 mb-3">{{ description }}</div>

        <!-- Requirements -->
        <div v-if="requirements" class="text-sm">
          <div v-if="requirements.deposit" class="mb-1">
            Первый депозит от <span class="font-semibold">{{ requirements.deposit }}</span>
          </div>
          <div v-if="requirements.timer" class="mb-1">
            До завершения <span class="font-semibold">{{ requirements.timer }}</span>
          </div>
          <div v-if="requirements.minAmount" class="mb-1">
            На сумму депозитов от <span class="font-semibold">{{ requirements.minAmount }}</span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <BaseButton
        :variant="buttonVariant"
        :size="buttonSize"
        :fullWidth="true"
        :disabled="disabled"
        @click="handleActivate"
      >
        {{ buttonText }}
      </BaseButton>

      <!-- Promo Code Input (if needed) -->
      <div v-if="needsPromoCode && !isActivated" class="mt-4">
        <div class="flex gap-2">
          <input
            v-model="promoCode"
            type="text"
            placeholder="Промокод"
            class="flex-1 px-3 py-2 bg-white/20 rounded-lg border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/50"
            @click.stop
          />
          <BaseButton variant="secondary" size="sm" @click.stop="submitPromoCode"> → </BaseButton>
        </div>
        <button
          v-if="hasInvalidPromo"
          class="text-xs text-white/60 mt-2 hover:text-white/80"
          @click.stop="handleInvalidPromo"
        >
          Неверный промокод
        </button>
      </div>
    </div>

    <!-- Background Decoration -->
    <div v-if="backgroundImage" class="absolute inset-0 overflow-hidden">
      <img
        :src="backgroundImage"
        :alt="title"
        class="absolute right-0 top-0 h-full w-auto object-contain opacity-80"
      />
    </div>

    <!-- Info Tooltip -->
    <div
      v-if="showInfo && infoText"
      class="absolute top-12 right-4 bg-black/80 text-white text-xs p-3 rounded-lg max-w-xs z-20"
      @click.stop
    >
      {{ infoText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseButton from './BaseButton.vue'

interface Requirements {
  deposit?: string
  timer?: string
  minAmount?: string
}

interface Props {
  title: string
  subtitle?: string
  amount?: string
  description?: string
  requirements?: Requirements
  buttonText?: string
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  buttonSize?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  needsPromoCode?: boolean
  hasInvalidPromo?: boolean
  backgroundType?: 'red' | 'blue' | 'purple' | 'gradient'
  backgroundImage?: string
  infoText?: string
  isActivated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Активировать',
  buttonVariant: 'primary',
  buttonSize: 'md',
  disabled: false,
  needsPromoCode: false,
  hasInvalidPromo: false,
  backgroundType: 'blue',
  isActivated: false,
})

const emit = defineEmits<{
  activate: [promoCode?: string]
  invalidPromo: []
}>()

const showInfo = ref(false)
const promoCode = ref('')
const bonusCardRef = ref<HTMLElement | null>(null)

const backgroundClass = computed(() => {
  const baseClasses = 'relative'

  switch (props.backgroundType) {
    case 'red':
      return `${baseClasses} bg-gradient-to-br from-red-600 to-red-800`
    case 'blue':
      return `${baseClasses} bg-gradient-to-br from-blue-600 to-blue-800`
    case 'purple':
      return `${baseClasses} bg-gradient-to-br from-purple-600 to-purple-800`
    case 'gradient':
      return `${baseClasses} bg-gradient-to-br from-pink-500 to-purple-600`
    default:
      return `${baseClasses} bg-gradient-to-br from-blue-600 to-blue-800`
  }
})

const handleActivate = () => {
  if (props.disabled || props.isActivated) return

  if (props.needsPromoCode) {
    emit('activate', promoCode.value)
  } else {
    emit('activate')
  }
}

const submitPromoCode = () => {
  if (promoCode.value.trim()) {
    emit('activate', promoCode.value)
  }
}

const handleInvalidPromo = () => {
  emit('invalidPromo')
}

// Обработчик клика вне компонента для закрытия тултипа
const handleClickOutside = (event: Event) => {
  if (bonusCardRef.value && !bonusCardRef.value.contains(event.target as Node)) {
    showInfo.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.bonus-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.bonus-card:hover {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}
</style>
