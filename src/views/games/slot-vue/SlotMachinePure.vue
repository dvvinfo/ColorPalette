<template>
  <div class="slot-vue-container">
    <h2 class="title">Слоты (Vue)</h2>
    <div class="slot-area">
      <div class="reels">
        <div v-for="(reel, i) in reels" :key="i" class="reel">
          <div
            v-for="(symbol, j) in reel"
            :key="j"
            class="symbol"
            :class="{ highlight: isWinningSymbol(i, j) }"
          >
            {{ symbol }}
          </div>
        </div>
      </div>
      <div class="jackpot">Jackpot: {{ jackpot.toLocaleString() }} ₽</div>
    </div>
    <form @submit.prevent="onPlay" class="bet-form">
      <input v-model="bet" type="number" min="1" :max="balance" placeholder="Ставка" required />
      <button type="submit" :disabled="spinning || !isValid">Играть</button>
    </form>
    <div class="result" v-if="lastResult">
      <span v-if="lastResult.result === 'win'">🎉 Выигрыш: {{ lastResult.winAmount }} ₽</span>
      <span v-else>😢 Попробуйте еще раз!</span>
    </div>
    <div class="balance">Баланс: {{ balance }} ₽</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const SYMBOLS = ['🍒', '🍋', '🔔', '⭐', '7️⃣', '🍀']
const ROWS = 3
const REELS = 5

const reels = ref<string[][]>(Array.from({ length: REELS }, () => Array(ROWS).fill('')))
const bet = ref<number | null>(null)
const balance = ref(10000)
const jackpot = ref(5555555)
const spinning = ref(false)
const lastResult = ref<{
  result: 'win' | 'lose'
  winAmount: number
  winLines: [number, number][][]
} | null>(null)

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
}

function spinReels() {
  for (let i = 0; i < REELS; i++) {
    for (let j = 0; j < ROWS; j++) {
      reels.value[i][j] = randomSymbol()
    }
  }
}

function getSymbolsMatrix() {
  // Преобразуем reels в [row][col] для удобства проверки линий
  const matrix: string[][] = Array.from({ length: ROWS }, () => Array(REELS).fill(''))
  for (let i = 0; i < REELS; i++) {
    for (let j = 0; j < ROWS; j++) {
      matrix[j][i] = reels.value[i][j]
    }
  }
  return matrix
}

function checkWin(matrix: string[][]) {
  let winAmount = 0
  const winLines: [number, number][][] = []
  // Горизонтальные линии
  for (let row = 0; row < ROWS; row++) {
    const symbol = matrix[row][0]
    if (symbol && matrix[row].every((s) => s === symbol)) {
      winAmount += 100
      winLines.push(Array.from({ length: REELS }, (_, i) => [row, i]))
    }
  }
  // Диагонали
  const diag1: string[] = []
  const diag2: string[] = []
  for (let i = 0; i < REELS; i++) {
    diag1.push(matrix[i < ROWS ? i : ROWS - 1][i])
    diag2.push(matrix[ROWS - 1 - (i < ROWS ? i : ROWS - 1)][i])
  }
  if (diag1.every((s) => s === diag1[0])) {
    winAmount += 150
    winLines.push(Array.from({ length: REELS }, (_, i) => [i < ROWS ? i : ROWS - 1, i]))
  }
  if (diag2.every((s) => s === diag2[0])) {
    winAmount += 150
    winLines.push(
      Array.from({ length: REELS }, (_, i) => [ROWS - 1 - (i < ROWS ? i : ROWS - 1), i]),
    )
  }
  const result: 'win' | 'lose' = winAmount > 0 ? 'win' : 'lose'
  return { result, winAmount, winLines }
}

function isWinningSymbol(col: number, row: number) {
  if (!lastResult.value || !lastResult.value.winLines.length) return false
  return lastResult.value.winLines.some((line) => line.some(([r, c]) => r === row && c === col))
}

const isValid = computed(() => {
  return bet.value !== null && bet.value >= 1 && bet.value <= balance.value
})

async function onPlay() {
  if (!isValid.value || spinning.value) return
  spinning.value = true
  lastResult.value = null
  // Анимация вращения (имитация)
  for (let t = 0; t < 15; t++) {
    spinReels()
    await new Promise((res) => setTimeout(res, 40 + t * 8))
  }
  const matrix = getSymbolsMatrix()
  const result = checkWin(matrix)
  if (result.result === 'win') {
    balance.value += result.winAmount
  } else {
    balance.value -= bet.value!
  }
  lastResult.value = result
  spinning.value = false
}
</script>

<style scoped>
.slot-vue-container {
  max-width: 600px;
  margin: 0 auto;
  background: #23293a;
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 2px 16px #0002;
}
.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #fff;
}
.slot-area {
  margin-bottom: 1.5rem;
}
.reels {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 1rem;
}
.reel {
  background: #fff;
  border-radius: 8px;
  width: 60px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #0001;
}
.symbol {
  font-size: 2rem;
  margin: 8px 0;
  width: 100%;
  text-align: center;
  border-radius: 4px;
  transition: background 0.2s;
}
.symbol.highlight {
  background: #ffe066;
}
.jackpot {
  text-align: center;
  color: #ffe066;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.bet-form {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 1rem;
}
.bet-form input {
  width: 120px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1.1rem;
}
.bet-form button {
  background: #e63946;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.bet-form button:disabled {
  background: #888;
  cursor: not-allowed;
}
.result {
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #fff;
}
.balance {
  text-align: center;
  color: #fff;
  font-size: 1.1rem;
}
</style>
