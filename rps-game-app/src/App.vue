<script setup>
import {ref, computed, onMounted} from 'vue'
import Loader from "./components/Loader.vue";

const wins = ref(0)
const losses = ref(0)
const draws = ref(0)

const playerChoice = ref(null)
const computerChoice = ref(null)
const result = ref(null)
const loading = ref(true)

const outcomes = {
  fire: {
    fire: 'draw',
    grass: 'win',
    rock: 'loss',
    ice: 'win',
    ground: 'loss'
  },
  grass: {
    fire: 'loss',
    grass: 'draw',
    rock: 'win',
    ice: 'loss',
    ground: 'win'
  },
  rock: {
    fire: 'win',
    grass: 'loss',
    rock: 'draw',
    ice: 'win',
    ground: 'loss'
  },
  ice: {
    fire: 'loss',
    grass: 'win',
    rock: 'loss',
    ice: 'draw',
    ground: 'win'
  },
  ground: {
    fire: 'win',
    grass: 'loss',
    rock: 'win',
    ice: 'loss',
    ground: 'draw'
  }
}

const winPercentage = computed(() => {
  const total = wins.value + losses.value + draws.value
  return total ? (wins.value / total) * 100 : 0
})

const setLoading = () => {
  loading.value = false
}

const playGame = c => {
  playerChoice.value = c

  const choices = ['fire', 'grass', 'rock', 'ice', 'ground']
  const random = Math.floor(Math.random() * choices.length)
  computerChoice.value = choices[random]

  const outcome = outcomes[c][computerChoice.value]

  if (outcome === 'win') {
    wins.value++
    result.value = "Your attacks are super effective! You win."
  } else if (outcome === 'loss') {
    losses.value++
    result.value = "Your attacks are not very effective! You lose."
  } else {
    draws.value++
    result.value = "Both your attacks don't do much damage. It is a draw!"
  }

  saveGame()
  setTimeout(setLoading, 3000);
}

const saveGame = () => {
  localStorage.setItem('wins', wins.value.toString())
  localStorage.setItem('losses', losses.value.toString())
  localStorage.setItem('draws', draws.value.toString())
}

const loadGame = () => {
  wins.value = parseInt(localStorage.getItem('wins')) || 0
  losses.value = parseInt(localStorage.getItem('losses')) || 0
  draws.value = parseInt(localStorage.getItem('draws')) || 0
}

const resetGame = () => {
  playerChoice.value = null
  computerChoice.value = null
  result.value = null
  loading.value = true
}

onMounted(() => {
  loadGame()
  window.addEventListener('keypress', e => {
    if (e.key === 'r') {
      resetGame()
    }
  })
})


</script>

<template>
  <div class="bg-neutral-800 text-white text-center min-h-screen flex flex-col">
    <header class="container mx-auto p-6 bg-red-800 rounded-b-lg">
      <h2 class="text-2xl font-bold">You locked eyes with a trainer! It's time to fight.</h2>
      <br>
    </header>

    <main class="container mx-auto p-6 flex-1">

      <div v-if="playerChoice === null" class="mx-6">
        <h1 class="text-3xl mb-4">Pick your Pokémon Type</h1>

        <div>
          <button @click="playGame('fire')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-orange-500">
            <img src="./assets/fire.png" alt="Fire" class="w-15"/>
          </button>

          <button @click="playGame('grass')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-green-900">
            <img src="./assets/grass.png" alt="Grass" class="w-15"/>
          </button>
        </div>

        <div>
          <button @click="playGame('rock')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-stone-500">
            <img src="./assets/rock.png" alt="Rock" class="w-15"/>
          </button>

          <button @click="playGame('ice')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-cyan-300">
            <img src="./assets/ice.png" alt="Ice" class="w-15"/>
          </button>

          <button @click="playGame('ground')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-amber-900">
            <img src="./assets/ground.png" alt="Ground" class="w-15"/>
          </button>

        </div>
      </div>

      <div v-else class="text-2xl mb-4">
        <div class="mb-4"> You sent a <span class="font-bold">{{ playerChoice }}</span> Pokémon into battle!</div>
        <div class="mb-12"> The rival trainer has a <span class="font-bold">{{ computerChoice }}</span> Pokémon.</div>

        <div v-if="loading === true">
          <Loader></Loader>
        </div>

        <div v-else>
          <div class="text-3xl mb-12">
            {{ result }}
          </div>

          <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">

          <div class="mt-12 text-3xl mb-4">
            Results
          </div>

          <div class="text-lg mb-4">
            {{ wins }} Wins : {{ draws }} Draws : {{ losses }} Losses <br>
            Your personal win rate: <span class="font-bold">{{ Math.round(winPercentage) }}%</span>
          </div>

          <button @click="resetGame" class="bg-red-800 text-lg font-bold py-2 px-4 rounded-full">Fight Again!</button>
        </div>
      </div>


    </main>
  </div>
</template>
