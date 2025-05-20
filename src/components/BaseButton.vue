<template>
  <button
    :disabled="props.disabled"
    :class="[
      'transition-all rounded-md',
      variantClasses[props.variant || 'primary'],
      sizeClasses[props.size || 'md'],
      { 'w-full': props.fullWidth },
      { 'opacity-50 cursor-not-allowed': props.disabled },
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
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
