import '../flipping-tile/index.js'
const IMG_PATHS = []

for (let i = 1; i < 9; i++) {
  IMG_PATHS.push(`${(new URL(`images/${i}.png`, import.meta.url)).href}`)
}

const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            height: 675px;
            width: 650px;
            background-color: rgb(44, 44, 46)
        }
        .game {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr;
            grid-gap: 10px;
        }

        h1 {
            color: white;
        }

        img {
            width: 75px;
            height: 75px;
        }

        flipping-tile::part(front) {
            background: black;
        }


    </style>
    <div class="game">
    </div>
`

customElements.define('memory-game',

    class extends HTMLElement {

        #game

        #imgs

        #twoTiles

        #attempts

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#game = this.shadowRoot.querySelector('.game')
            this.#imgs = IMG_PATHS
            this.#twoTiles = []
            this.#attempts = 0
        }

        connectedCallback() {
            console.log(IMG_PATHS)
            this.#game.addEventListener('flipped', (event) => this.#tileIsFlipped(event))
            this.#startGame(this.#imgs, 16)
        }

        #createFlippingTiles (imgs, size) {
            const tiles = []

            for (let i = 0; i < size / 2; i++) {
                const flippingTile = document.createElement('flipping-tile')
                const image = document.createElement('img')
                image.setAttribute('src', `${imgs[i]}`)
                flippingTile.appendChild(image)
                tiles.push(flippingTile)
                //this.#game.appendChild(flippingTile)
            }

            for (let i = 0; i < size / 2; i++) {
                const flippingTile = document.createElement('flipping-tile')
                const image = document.createElement('img')
                image.setAttribute('src', `${imgs[i]}`)
                flippingTile.appendChild(image)
                tiles.push(flippingTile)
                //this.#game.appendChild(flippingTile)
            }

            return tiles
        }

        #tileIsFlipped (event) {

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
                    console.log('same')
                } else {
                    setTimeout(() => {
                        this.#twoTiles[0].removeAttribute('front-shown')
                        this.#twoTiles[1].removeAttribute('front-shown')
                    }, 1000)
                }
            }
            console.log(this.#twoTiles)
            console.log(this.#attempts)
        }

        #startGame(imgs, size) {
            const tiles = this.#createFlippingTiles(imgs, size)
            this.#shuffle(tiles)
            for (let i = 0; i < size; i++) {
                this.#game.appendChild(tiles[i])
            }
        }

        //This shuffler is from the exercise.
        #shuffle (deck) {
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]]
              }
        }
    })