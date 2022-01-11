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

        :host([hidden]) {
            visibility: hidden;
        }

    </style>

    <div class="flippingtile">
        <div class="front">
            <slot></slot>
        </div>
        <div class="back"></div>
    </div>
`

customElements.define('flipping-tile',

  /**
   * Represents the flipping tile.
   */
  class extends HTMLElement {
        #flippingtile

        /**
         * Creates an instance of this type.
         */
        constructor () {
          super()
          this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

          this.#flippingtile = this.shadowRoot.querySelector('.flippingtile')
        }

        /**
         * Called when the element is inserted to the DOM.
         */
        connectedCallback () {
          this.addEventListener('click', () => this.#flipTile())
          this.addEventListener('keypress', (event) => this.#onEnter(event))
          this.focus()
          this.setAttribute('tabindex', '0')
        }

        /**
         * Monitors the attributes.
         *
         * @returns {string[]} Represents the attributes observed.
         */
        static get observedAttributes () {
          return ['hidden', 'disabled']
        }

        /**
         * Flips the tile.
         */
        #flipTile () {
          if (!(this.hasAttribute('disabled') || this.hasAttribute('hidden'))) {
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

        /**
         * Called when an attribute is changed.
         *
         * @param {string} name - The name of the attribute.
         * @param {*} oldValue - THe old value.
         * @param {*} newValue - The new value.
         */
        attributeChangedCallback (name, oldValue, newValue) {
          if (name === 'disabled' || name === 'hidden') {
            if (newValue || newValue === '') {
              this.#flippingtile.setAttribute('disabled', '')
              this.setAttribute('tabindex', '-1')
            } else {
              this.#flippingtile.removeAttribute('disabled')
            }
          }
        }

        /**
         * Flips the tile on enter.
         *
         * @param {string} event - Represents the event.
         */
        #onEnter (event) {
          if (event.key === 'Enter') {
            this.#flipTile()
          }
        }
  })
