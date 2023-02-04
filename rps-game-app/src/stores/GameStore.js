import {defineStore, acceptHMRUpdate} from "pinia";

const useGameStore = defineStore('GameStore', {
    state: () => ({
        wins: 0,
        losses: 0,
        draws: 0,
        playerChoice: null,
        computerChoice: null,
        result: null,
        loading: true,
        outcomes: {
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
        },
    }),
    getters: {
        winPercentage(state) {
            const total = state.wins + state.losses + state.draws
            return total ? (state.wins / total) * 100 : 0
        }
    },
    actions: {
        setLoading() {
            this.loading = false
        },
        playGame(c) {
            this.playerChoice = c

            const choices = ['fire', 'grass', 'rock', 'ice', 'ground']
            const random = Math.floor(Math.random() * choices.length)
            this.computerChoice = choices[random]

            const outcome = this.outcomes[c][this.computerChoice]

            if (outcome === 'win') {
                this.wins++
                this.result = "Your attacks are super effective! You win."
            } else if (outcome === 'loss') {
                this.losses++
                this.result = "Your attacks are not very effective! You lose."
            } else {
                this.draws++
                this.result = "Both your attacks don't do much damage. It is a draw!"
            }

            this.saveGame()
            setTimeout(this.setLoading, 2500)
        },
        saveGame() {
            localStorage.setItem('wins', this.wins.toString())
            localStorage.setItem('losses', this.losses.toString())
            localStorage.setItem('draws', this.draws.toString())
        },
        loadGame() {
            this.wins = parseInt(localStorage.getItem('wins')) || 0
            this.losses = parseInt(localStorage.getItem('losses')) || 0
            this.draws = parseInt(localStorage.getItem('draws')) || 0
        },
        resetGame() {
            this.playerChoice = null
            this.computerChoice = null
            this.result = null
            this.loading = true
        }
    },
});

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}

export default useGameStore;