<template>
  <div class="min-h-screen bg-background w-full">
    <div class="flex flex-col md:flex-row gap-6 mt-8">
      <div class="w-full md:w-3/4 flex flex-col gap-8">
        <BackButton />

        <!-- Hero Section -->
        <div class="bg-card-bg rounded-xl p-8 text-center">
          <h1
            class="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            {{ $t('about.title') }}
          </h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {{ $t('about.heroDescription') }}
          </p>
        </div>

        <!-- About Section -->
        <div class="bg-card-bg rounded-xl p-8">
          <h2 class="text-2xl font-bold mb-6 text-primary">{{ $t('about.aboutUs') }}</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-gray-300 leading-relaxed mb-4">
                {{ $t('about.description') }}
              </p>
              <p class="text-gray-300 leading-relaxed">
                {{ $t('about.experience') }}
              </p>
            </div>
            <div class="flex items-center justify-center">
              <div
                class="w-48 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center"
              >
                <span class="text-9xl">🎯</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Mission & Vision -->
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-card-bg rounded-xl p-6">
            <div class="flex items-center mb-4">
              <span class="text-3xl mr-3">🚀</span>
              <h3 class="text-xl font-bold text-primary">{{ $t('about.mission') }}</h3>
            </div>
            <p class="text-gray-300 leading-relaxed">
              {{ $t('about.missionText') }}
            </p>
          </div>

          <div class="bg-card-bg rounded-xl p-6">
            <div class="flex items-center mb-4">
              <span class="text-3xl mr-3">👁️</span>
              <h3 class="text-xl font-bold text-primary">{{ $t('about.vision') }}</h3>
            </div>
            <p class="text-gray-300 leading-relaxed">
              {{ $t('about.visionText') }}
            </p>
          </div>
        </div>

        <!-- Features -->
        <div class="bg-card-bg rounded-xl p-8">
          <h2 class="text-2xl font-bold mb-6 text-primary text-center">
            {{ $t('about.whyChooseUs') }}
          </h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center p-4">
              <div
                class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-6xl">🔒</span>
              </div>
              <h4 class="font-bold mb-2 text-primary">{{ $t('about.security') }}</h4>
              <p class="text-sm text-gray-300">{{ $t('about.securityText') }}</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-6xl">⚡</span>
              </div>
              <h4 class="font-bold mb-2 text-primary">{{ $t('about.performance') }}</h4>
              <p class="text-sm text-gray-300">{{ $t('about.performanceText') }}</p>
            </div>

            <div class="text-center p-4">
              <div
                class="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <span class="text-6xl">🎨</span>
              </div>
              <h4 class="font-bold mb-2 text-primary">{{ $t('about.design') }}</h4>
              <p class="text-sm text-gray-300">{{ $t('about.designText') }}</p>
            </div>
          </div>
        </div>

        <!-- Statistics -->
        <div ref="statsRef" class="bg-card-bg rounded-xl p-8">
          <h2 class="text-2xl font-bold mb-6 text-primary text-center">
            {{ $t('about.ourNumbers') }}
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div
              class="text-center transform transition-all duration-500 hover:scale-110 cursor-pointer"
              :class="{ 'scale-105 counter-animate': isStatsVisible }"
            >
              <div class="text-3xl font-bold mb-2 number-gradient transition-all duration-300">
                {{ users.toLocaleString() }}+
              </div>
              <div class="text-sm text-gray-300">{{ $t('about.happyUsers') }}</div>
            </div>

            <div
              class="text-center transform transition-all duration-500 delay-200 hover:scale-110 cursor-pointer"
              :class="{ 'scale-105 counter-animate': isStatsVisible }"
            >
              <div class="text-3xl font-bold mb-2 number-gradient transition-all duration-300">
                {{ gamesCount }}
              </div>
              <div class="text-sm text-gray-300">{{ $t('about.games') }}</div>
            </div>

            <div
              class="text-center transform transition-all duration-500 delay-300 hover:scale-110 cursor-pointer"
            >
              <div class="text-3xl font-bold mb-2 number-gradient transition-all duration-300">
                24/7
              </div>
              <div class="text-sm text-gray-300">{{ $t('about.support') }}</div>
            </div>

            <div
              class="text-center transform transition-all duration-500 delay-400 hover:scale-110 cursor-pointer"
              :class="{ 'scale-105 counter-animate': isStatsVisible }"
            >
              <div class="text-3xl font-bold mb-2 number-gradient transition-all duration-300">
                {{ uptime }}%
              </div>
              <div class="text-sm text-gray-300">{{ $t('about.uptime') }}</div>
            </div>
          </div>
        </div>

        <!-- Team Section -->
        <!-- <div class="bg-card-bg rounded-xl p-8">
          <h2 class="text-2xl font-bold mb-6 text-primary text-center">
            {{ $t('about.ourTeam') }}
          </h2>
          <div class="grid md:grid-cols-3 gap-6">
            <div class="text-center">
              <div
                class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <span class="text-2xl text-white font-bold">АИ</span>
              </div>
              <h4 class="font-bold text-primary">Алексей Иванов</h4>
              <p class="text-sm text-gray-300 mb-2">{{ $t('about.ceo') }}</p>
              <p class="text-xs text-gray-400">{{ $t('about.ceoDescription') }}</p>
            </div>

            <div class="text-center">
              <div
                class="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <span class="text-2xl text-white font-bold">МП</span>
              </div>
              <h4 class="font-bold text-primary">Мария Петрова</h4>
              <p class="text-sm text-gray-300 mb-2">{{ $t('about.cto') }}</p>
              <p class="text-xs text-gray-400">{{ $t('about.ctoDescription') }}</p>
            </div>

            <div class="text-center">
              <div
                class="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <span class="text-2xl text-white font-bold">ДС</span>
              </div>
              <h4 class="font-bold text-primary">Дмитрий Сидоров</h4>
              <p class="text-sm text-gray-300 mb-2">{{ $t('about.leadDeveloper') }}</p>
              <p class="text-xs text-gray-400">{{ $t('about.leadDeveloperDescription') }}</p>
            </div>
          </div>
        </div> -->

        <!-- Contact Section -->
        <div class="bg-card-bg rounded-xl p-8">
          <h2 class="text-2xl font-bold mb-6 text-primary text-center">
            {{ $t('about.contactUs') }}
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <div class="space-y-4">
                <div class="flex items-center">
                  <span class="text-xl mr-3">📧</span>
                  <div>
                    <div class="font-semibold text-primary">{{ $t('about.email') }}</div>
                    <div class="text-gray-300">support@colorpalette.ru</div>
                  </div>
                </div>

                <div class="flex items-center">
                  <span class="text-xl mr-3">📱</span>
                  <div>
                    <div class="font-semibold text-primary">{{ $t('about.phone') }}</div>
                    <div class="text-gray-300">+7 (495) 123-45-67</div>
                  </div>
                </div>

                <div class="flex items-center">
                  <span class="text-xl mr-3">📍</span>
                  <div>
                    <div class="font-semibold text-primary">{{ $t('about.address') }}</div>
                    <div class="text-gray-300">{{ $t('about.addressText') }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 class="font-bold text-primary mb-4">{{ $t('about.followUs') }}</h3>
              <div class="flex space-x-4">
                <!-- Telegram -->
                <a
                  href="#"
                  class="sm:w-12 sm:h-12 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors group"
                >
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
                    />
                  </svg>
                </a>

                <!-- Instagram -->
                <a
                  href="#"
                  class="sm:w-12 sm:h-12 w-10 h-10 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform group"
                >
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                </a>

                <!-- VK -->
                <a
                  href="#"
                  class="sm:w-12 sm:h-12 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors group"
                >
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.033-1.49-.734-1.49.054v1.573c0 .42-.135.672-1.242.672-1.997 0-4.215-1.219-5.784-3.487-2.377-3.438-3.034-6.013-3.034-6.558 0-.405.135-.783.672-.783h1.744c.507 0 .695.27.891.901.972 3.159 2.621 5.928 3.295 5.928.258 0 .372-.12.372-.78V9.816c-.081-1.378-.811-1.5-.811-1.996 0-.324.27-.648.702-.648h2.746c.426 0 .583.23.583.891v4.467c0 .426.189.583.31.583.258 0 .463-.155.93-.622 1.44-1.44 2.472-3.649 2.472-3.649.135-.27.405-.52.891-.52h1.744c.54 0 .659.27.54.642-.203 1.047-2.214 4.058-2.214 4.058-.216.351-.297.507 0 .85 1.057 1.242 2.214 2.715 2.214 3.622-.001.432-.217.865-.865.865z"
                    />
                  </svg>
                </a>

                <!-- YouTube -->
                <a
                  href="#"
                  class="sm:w-12 sm:h-12 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors group"
                >
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                    />
                  </svg>
                </a>

                <!-- Twitter/X -->
                <a
                  href="#"
                  class="sm:w-12 sm:h-12 w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors group"
                >
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                    />
                  </svg>
                </a>


              </div>
            </div>
          </div>
        </div>
      </div>
      <RightSidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import RightSidebar from '@/components/RightSidebar.vue'
import BackButton from '@/components/BackButton.vue'

// Анимированные счетчики
const users = ref(0)
const gamesCount = ref(0)
const uptime = ref(0)
const statsRef = ref<HTMLElement | null>(null)
const isStatsVisible = ref(false)

// Функция анимации числа
function animateNumber(
  target: number,
  refValue: { value: number },
  duration: number = 2000,
  suffix: string = '',
) {
  const start = 0
  const increment = target / (duration / 50)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }

    if (suffix === '%') {
      refValue.value = Math.floor(current * 10) / 10 // Одно десятичное место для процентов
    } else {
      refValue.value = Math.floor(current)
    }
  }, 50)
}

// Intersection Observer для запуска анимации при появлении
let observer: IntersectionObserver

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isStatsVisible.value) {
          isStatsVisible.value = true

          // Запускаем анимации с небольшими задержками
          setTimeout(() => animateNumber(1000, users, 2000), 200)
          setTimeout(() => animateNumber(8, gamesCount, 1500), 400)
          setTimeout(() => animateNumber(99.9, uptime, 2500), 600)
        }
      })
    },
    { threshold: 0.5 },
  )

  if (statsRef.value) {
    observer.observe(statsRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Анимация счетчиков */
.counter-animate {
  animation: countUp 0.8s ease-out forwards;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Пульсирующий эффект для активных счетчиков */
.pulse-glow {
  animation: pulseGlow 2s infinite;
}

@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 20px rgba(var(--primary-rgb), 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(var(--primary-rgb), 0.6);
  }
}

/* Градиентный фон для цифр */
.number-gradient {
  background: linear-gradient(135deg, var(--primary), #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
