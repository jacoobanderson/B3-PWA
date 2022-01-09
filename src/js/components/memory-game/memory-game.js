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
            display: flex;
            justify-content: center;
            align-items: center;
        }

        h1 {
            color: white;
        }

        flipping-tile::part(front) {
      border-width: 5px;
      background: black url("${IMG_PATHS[0]}") no-repeat center/80%;
    }


    </style>
    <div class="game">
        <flipping-tile>
            <img />
        </flipping-tile>
    </div>
`

customElements.define('memory-game',

    class extends HTMLElement {

        #game

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#game = this.shadowRoot.querySelector('.game')
        }

        connectedCallback() {
            console.log(IMG_PATHS)
            this.#game.addEventListener('flipped', () => console.log('flip'))
        }
    })