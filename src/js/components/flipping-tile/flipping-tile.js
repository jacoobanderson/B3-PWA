const BACK_IMG_URL = (new URL('images/lnu-symbol.png', import.meta.url)).href
const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            width: 75px;
            height: 75px;
            border: solid 1px white;
            perspective: 1000px;
        }

        .flippingtile {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.9s;
            transform-style: preserve-3d;
        }

        :host([front-shown]) .flippingtile {
            transform: rotateY(180deg);
        }

        .back, .front {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
        }

        .front {
            transform: rotateY(180deg);
        }

        .back {
            background: white url("${BACK_IMG_URL}");
        }

        .front {
            background-color: white
        }

    </style>

    <div class="flippingtile" part="flippingtile">
        <div class="front" part="front">
            <slot></slot>
        </div>
        <div class="back" part="back"></div>
    </div>
`

customElements.define('flipping-tile',

    class extends HTMLElement {

        #flippingtile

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#flippingtile = this.shadowRoot.querySelector('.flippingtile')
        }

        connectedCallback() {
            this.addEventListener('click', () => this.#flipTile())
        }

        static get observedAttributes () {
            return ['hidden', 'inactive']
        }

        #flipTile () {
            if (!(this.hasAttribute('inactive') || this.hasAttribute('hidden'))) {
                if (this.hasAttribute('front-shown')) {
                    this.removeAttribute('front-shown')
                } else {
                    this.setAttribute('front-shown', '')
                }
            }

            this.dispatchEvent(new CustomEvent('flipped', {
                bubbles: true
            }))
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (name === 'inactive' || name === 'hidden') {
                if (newValue || newValue === '') {
                    this.#flippingtile.setAttribute('inactive', '')
                } else {
                    this.#flippingtile.removeAttribute('inactive')
                }
            }
          }

          checkIfSame (tile) {
            return this.isEqualNode(tile)
          }
     
     

    })