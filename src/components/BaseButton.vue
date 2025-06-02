<template>
  <button
    :disabled="props.disabled || props.loading"
    :class="[
      'transition-all rounded-md relative',
      variantClasses[props.variant || 'primary'],
      sizeClasses[props.size || 'md'],
      { 'w-full': props.fullWidth },
      { 'opacity-50 cursor-not-allowed': props.disabled || props.loading },
    ]"
    v-bind="$attrs"
  >
    <span :class="{ 'opacity-0': props.loading }">
      <slot></slot>
    </span>

    <!-- Loading spinner -->
    <div v-if="props.loading" class="absolute inset-0 flex items-center justify-center">
      <div
        class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
}>()

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary/80',
  secondary: 'bg-secondary text-white hover:bg-secondary/80',
  outline: 'border border-primary text-white hover:bg-primary/20',
  ghost: 'text-white hover:bg-white/10',
}

const sizeClasses = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
}
</script>
