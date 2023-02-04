<script setup>
import {onMounted} from 'vue'
import useGameStore from "./stores/GameStore"
import Loader from "./components/Loader.vue"

const store = useGameStore();

onMounted(() => {
  store.loadGame()
  window.addEventListener('keypress', e => {
    if (e.key === 'r') {
      store.resetGame()
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

      <div v-if="store.playerChoice === null" class="mx-6">
        <h1 class="text-3xl mb-4">Pick your Pokémon Type</h1>

        <div>
          <button @click="store.playGame('fire')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-orange-500">
            <img src="./assets/fire.png" alt="Fire" class="w-15"/>
          </button>

          <button @click="store.playGame('grass')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-green-900">
            <img src="./assets/grass.png" alt="Grass" class="w-15"/>
          </button>
        </div>

        <div>
          <button @click="store.playGame('rock')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-stone-500">
            <img src="./assets/rock.png" alt="Rock" class="w-15"/>
          </button>

          <button @click="store.playGame('ice')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-cyan-300">
            <img src="./assets/ice.png" alt="Ice" class="w-15"/>
          </button>

          <button @click="store.playGame('ground')"
                  class="bg-neutral-700 rounded-full shadow-lg p-2 m-3 transition-colors duration-300 hover:bg-amber-900">
            <img src="./assets/ground.png" alt="Ground" class="w-15"/>
          </button>

        </div>
      </div>

      <div v-else class="text-2xl mb-4">
        <div class="mb-4"> You sent a <span class="font-bold">{{ store.playerChoice }}</span> Pokémon into battle!</div>
        <div class="mb-12"> The rival trainer has a <span class="font-bold">{{ store.computerChoice }}</span> Pokémon.</div>

        <div v-if="store.loading === true">
          <Loader/>
        </div>

        <div v-else>
          <div class="text-3xl mb-12">
            {{ store.result }}
          </div>

          <hr class="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700">

          <div class="mt-12 text-3xl mb-4">
            Results
          </div>

          <div class="text-lg mb-4">
            {{ store.wins }} Wins : {{ store.draws }} Draws : {{ store.losses }} Losses <br>
            Your personal win rate: <span class="font-bold">{{ Math.round(store.winPercentage) }}%</span>
          </div>

          <button @click="store.resetGame" class="bg-red-800 text-lg font-bold py-2 px-4 rounded-full">Fight Again!</button>
        </div>
      </div>


    </main>
  </div>
</template>
