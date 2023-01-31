<script setup>
import {ref, computed, onMounted} from 'vue'

const wins = ref(0)
const losses = ref(0)
const draws = ref(0)

const playerChoice = ref(null)
const computerChoice = ref(null)
const verdict = ref(null)

const outcomes = {
  rock: {
    rock: 'draw',
    paper: 'loss',
    scissors: 'win'
  },
  paper: {
    rock: 'win',
    paper: 'draw',
    scissors: 'loss'
  },
  scissors: {
    rock: 'loss',
    paper: 'win',
    scissors: 'draw'
  }
}

const winPercentage = computed(() => {
  const total = wins.value + losses.value + draws.value
  return total ? (wins.value / total) * 100 : 0
})

const play = c => {
  playerChoice.value = c

  const choices = ['rock', 'paper', 'scissors']
  const random = Math.floor(Math.random() * choices.length)
  computerChoice.value = choices[random]

  const outcome = outcomes[c][computerChoice.value]

  if (outcome === 'win') {
    wins.value++
    verdict.value = "You win!"
  } else if (outcome === 'loss') {
    losses.value++
    verdict.value = "You lose!"
  } else {
    draws.value++
    verdict.value = "It is a draw!"
  }

  SaveGame()
}

const SaveGame = () => {
  localStorage.setItem('wins', wins.value)
  localStorage.setItem('losses', losses.value)
  localStorage.setItem('draws', draws.value)
}

const LoadGame = () => {
  wins.value = parseInt(localStorage.getItem('wins')) || 0
  losses.value = parseInt(localStorage.getItem('losses')) || 0
  draws.value = parseInt(localStorage.getItem('draws')) || 0
}

const ResetGame = () => {
  playerChoice.value = null
  computerChoice.value = null
  verdict.value = null
}

onMounted(() => {
  LoadGame()
  window.addEventListener('keypress', e => {
    if (e.key === 'r') {
      ResetGame()
    }
  })
})


</script>

<template>
  <div class="bg-amber-700 text-white text-center min-h-screen flex flex-col">
    <header class="container mx-auto p-6">
      <h1 class="text-3xl font-bold">My really cool Rock, Paper, Scissors Game</h1>
    </header>

    <main class="container mx-auto p-6 flex-1">
      <div v-if="playerChoice === null" class="flex items-center justify-center -mx-6">
        <button @click="play('rock')"
                class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-pink-500">
          <img src="./assets/rock.svg" alt="Rock" class="w-full"/>
        </button>

        <button @click="play('paper')"
                class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-cyan-500">
          <img src="./assets/paper.svg" alt="Paper" class="w-full"/>
        </button>

        <button @click="play('scissors')"
                class="bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-yellow-500">
          <img src="./assets/scissor.svg" alt="Scissors" class="w-full"/>
        </button>
      </div>

      <div v-else class="text-2xl mb-4">
        You picked <span class="font-bold">{{ playerChoice }}</span> and the computer picked <span
          class="font-bold">{{ computerChoice }}</span>.


        <div class="text-5xl mb-12">
          {{ verdict }}
        </div>

        <button @click="ResetGame" class="bg-pink-500 text-lg py-2 px-4">Reset Game</button>
      </div>

      <div class="mt-12 text-3xl mb-4">
        {{ wins }} : {{ draws }} : {{ losses }}
      </div>

      <div class="text-lg">
        Win rate: {{ Math.round(winPercentage) }}%
      </div>

    </main>
  </div>
</template>
