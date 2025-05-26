<template>
  <div class="accordion space-y-4">
    <div
      v-for="(item, index) in items"
      :key="index"
      class=" rounded-lg overflow-hidden bg-card-bg shadow-sm"
    >
      <button
        @click="toggle(index)"
        class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{ 'bg-hover': isOpen(index) }"
      >
        <span class="font-semibold text-text-primary">{{ item.question }}</span>
        <svg
          class="w-5 h-5 text-text-secondary transition-transform duration-300 flex-shrink-0"
          :class="{ 'rotate-180': isOpen(index) }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        class="overflow-hidden transition-all duration-300 ease-in-out"
        :class="{
          'max-h-96 opacity-100': isOpen(index),
          'max-h-0 opacity-0': !isOpen(index),
        }"
      >
        <div class="px-6 py-4 border-t border-border">
          <div class="text-text-secondary leading-relaxed" v-html="item.answer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface AccordionItem {
  question: string
  answer: string
}

interface Props {
  items: AccordionItem[]
  allowMultiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  allowMultiple: false,
})

const activeIndex = ref<number | null>(null)
const activeIndices = ref<Set<number>>(new Set())

const isOpen = (index: number): boolean => {
  if (props.allowMultiple) {
    return activeIndices.value.has(index)
  }
  return activeIndex.value === index
}

const toggle = (index: number) => {
  if (props.allowMultiple) {
    // Режим множественного открытия
    if (activeIndices.value.has(index)) {
      activeIndices.value.delete(index)
    } else {
      activeIndices.value.add(index)
    }
    // Принудительное обновление реактивности
    activeIndices.value = new Set(activeIndices.value)
  } else {
    // Режим одиночного открытия
    activeIndex.value = activeIndex.value === index ? null : index
  }
}
</script>

<style scoped>
.accordion-item {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.accordion-header:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary);
}

.accordion-content {
  transition:
    max-height 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
}

.accordion-icon {
  flex-shrink: 0;
}

/* Анимация для плавного разворачивания контента */
.accordion-content.max-h-96 {
  max-height: 500px; /* Увеличиваем максимальную высоту */
}

/* Hover эффекты */
.accordion-header:hover .accordion-icon {
  color: var(--primary);
}
</style>
