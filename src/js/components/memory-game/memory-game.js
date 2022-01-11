import '../flipping-tile/index.js'
const IMG_PATHS = []

for (let i = 1; i < 9; i++) {
  IMG_PATHS.push(`${(new URL(`images/${i}.png`, import.meta.url)).href}`)
}

const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: grid;
            height: 675px;
            width: 650px;
            background-color: rgb(44, 44, 46);
            justify-content: center;
            align-items: center;
        }

        .startgame {
            display: block;
            color: white;
        }

        .playagain {
            display: none;
            color: white;
        }

        .game {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            grid-gap: 15px;
            display: none;
        }

        .game.easy {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr 1fr;
        }

        img {
            width: 75px;
            height: 75px;
        }

        flipping-tile::part(front) {
            background: black;
        }

        .timerClock {
            justify-self: center;
            align-self: center;
            color: white;
            font-size: 30px;
            display: none;
        }


    </style>
    <div class="game">
    </div>
    <div class="startgame">
        <h1>Start new game:</h1>
        <button id="easybutton">Easy</button>
        <button id="mediumbutton">Medium</button>
        <button id="hardbutton">Hard</button>
    </div>
    <div class="playagain">
        <h2 id="score"></h2>
        <h2 id="timeScore"></h2>
        <button>Play Again</button>
    </div>
    <div class="timerClock">0</div>
`

customElements.define('memory-game',

  /**
   * Represents the memory game.
   */
  class extends HTMLElement {
        #game

        #imgs

        #twoTiles

        #attempts

        #easybutton

        #mediumbutton

        #hardbutton

        #startgame

        #playagain

        #sameTileAmount

        #difficulty

        #score

        #timer

        #time

        #timerClock

        #timeScore

        #finalTime

        /**
         * Creates an instance of this type.
         */
        constructor () {
          super()
          this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

          this.#game = this.shadowRoot.querySelector('.game')
          this.#easybutton = this.shadowRoot.querySelector('#easybutton')
          this.#mediumbutton = this.shadowRoot.querySelector('#mediumbutton')
          this.#hardbutton = this.shadowRoot.querySelector('#hardbutton')
          this.#imgs = IMG_PATHS
          this.#twoTiles = []
          this.#attempts = 0
          this.#sameTileAmount = 0
          this.#difficulty = undefined
          this.#startgame = this.shadowRoot.querySelector('.startgame')
          this.#playagain = this.shadowRoot.querySelector('.playagain')
          this.#score = this.shadowRoot.querySelector('#score')
          this.#timer = undefined
          this.#time = 0
          this.#timerClock = this.shadowRoot.querySelector('.timerClock')
          this.#finalTime = undefined
          this.#timeScore = this.shadowRoot.querySelector('#timeScore')
        }

        /**
         * Fired when this element is put in the DOM.
         */
        connectedCallback () {
          this.#game.addEventListener('flipped', (event) => this.#tileIsFlipped(event))
          this.#hardbutton.addEventListener('click', () => this.#startGame(this.#imgs, 16))
          this.#mediumbutton.addEventListener('click', () => this.#startGame(this.#imgs, 8))
          this.#easybutton.addEventListener('click', () => this.#startGame(this.#imgs, 4))
          this.#playagain.addEventListener('click', () => this.#onPlayAgain())
        }

        /**
         * Creates the flipping tiles depending on the difficulty chosen.
         *
         * @param {string[]} imgs - Represents an array of image urls.
         * @param {number} size - Represents the size of the memory grid.
         * @returns {string[]} Returns the two copies of each tile.
         */
        #createFlippingTiles (imgs, size) {
          const tiles = []

          for (let i = 0; i < size / 2; i++) {
            const flippingTile = document.createElement('flipping-tile')
            const image = document.createElement('img')
            image.setAttribute('src', `${imgs[i]}`)
            flippingTile.appendChild(image)
            tiles.push(flippingTile)
          }

          for (let i = 0; i < size / 2; i++) {
            const flippingTile = document.createElement('flipping-tile')
            const image = document.createElement('img')
            image.setAttribute('src', `${imgs[i]}`)
            flippingTile.appendChild(image)
            tiles.push(flippingTile)
          }

          return tiles
        }

        /**
         * Handles what happens when the tile is flipped.
         *
         * @param {string} event - The event.
         */
        #tileIsFlipped (event) {
          // const flippingTiles = Array.from(this.#game.querySelectorAll('flipping-tile'))
          // fix, should not be able to press more than two tiles.

          if (this.#twoTiles.length < 2) {
            this.#twoTiles.push(event.target)
          } else {
            this.#twoTiles = [event.target]
          }

          if (this.#twoTiles.length === 2) {
            this.#attempts++

            if (this.#twoTiles[0].isEqualNode(this.#twoTiles[1])) {
              this.#twoTiles[0].setAttribute('disabled', '')
              this.#twoTiles[1].setAttribute('disabled', '')
              this.#sameTileAmount++
              setTimeout(() => {
                this.#twoTiles[0].setAttribute('hidden', '')
                this.#twoTiles[1].setAttribute('hidden', '')
              }, 1200)
            } else {
              setTimeout(() => {
                this.#twoTiles[0].removeAttribute('front-shown')
                this.#twoTiles[1].removeAttribute('front-shown')
              }, 1000)
            }
          }

          if (this.#sameTileAmount === 2 && this.#difficulty === '4') {
            this.#score.textContent = `Your score: ${this.#attempts}`
            this.#attempts = 0
            this.#stopTime()
            setTimeout(() => {
              this.#game.style.display = 'none'
              this.#timerClock.style.display = 'none'
              this.#playagain.style.display = 'block'
            }, 1200)
          } else if (this.#sameTileAmount === 4 && this.#difficulty === '8') {
            this.#score.textContent = `Your score: ${this.#attempts}`
            this.#attempts = 0
            this.#stopTime()
            setTimeout(() => {
              this.#game.style.display = 'none'
              this.#timerClock.style.display = 'none'
              this.#playagain.style.display = 'block'
            }, 1200)
          } else if (this.#sameTileAmount === 8 && this.#difficulty === '16') {
            this.#score.textContent = `Your score: ${this.#attempts}`
            this.#attempts = 0
            this.#stopTime()
            setTimeout(() => {
              this.#game.style.display = 'none'
              this.#timerClock.style.display = 'none'
              this.#playagain.style.display = 'block'
            }, 1200)
          }
        }

        /**
         * Starts the game.
         *
         * @param {string[]} imgs - Represents an array of image urls.
         * @param {number} size - Represents the size of the memory grid.
         */
        #startGame (imgs, size) {
          this.#startgame.style.display = 'none'
          this.#game.style.display = 'grid'
          this.#timeTheGame()
          if (size === 4) {
            this.#game.classList.add('easy')
          } else {
            this.#game.classList.remove('easy')
          }

          switch (size) {
            case 4:
              this.#difficulty = '4'
              break
            case 8:
              this.#difficulty = '8'
              break
            case 16:
              this.#difficulty = '16'
              break
          }

          const tiles = this.#createFlippingTiles(imgs, size)
          this.#shuffle(tiles)
          for (let i = 0; i < size; i++) {
            this.#game.appendChild(tiles[i])
          }
        }

        /**
         * The shuffler from the exercise is being used to randomize the tiles.
         *
         * @param {string[]} deck - An array of tiles.
         */
        #shuffle (deck) {
          for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]]
          }
        }

        /**
         * Handles what happens when the play again button is clicked.
         */
        #onPlayAgain () {
          while (this.#game.firstChild) {
            this.#game.removeChild(this.#game.firstChild)
          }
          this.#playagain.style.display = 'none'
          this.#timerClock.display = 'none'
          this.#startgame.style.display = 'block'
          this.#sameTileAmount = 0
          this.#difficulty = undefined
        }

        /**
         * Sets a timer on the current game round.
         */
        #timeTheGame () {
          this.#timerClock.style.display = 'block'
          this.#timer = setInterval(() => {
            this.#time++
            console.log(this.#time)
            this.#timerClock.textContent = this.#time
          }, 1000)
        }

        /**
         * Stops the timer of the current game round.
         */
        #stopTime () {
          this.#finalTime = this.#time
          clearInterval(this.#timer)
          this.#time = 0
          this.#timeScore.textContent = `Your time was: ${this.#finalTime}`
        }
  })
