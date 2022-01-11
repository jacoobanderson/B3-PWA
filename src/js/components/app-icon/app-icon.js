
const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            margin: 0;
            display: flex;
        }
        .test {
            width: 50px;
            height: 50px;
            margin-left: 8px;
            margin-right: 8px;
            border-radius: 10px;
            align-self: center;
        }
    </style>
    <img class="image test">
`

customElements.define('app-icon',

  /**
   * Represents the app icon.
   */
  class extends HTMLElement {
        #image

        /**
         * Creates an instance of the current type.
         */
        constructor () {
          super()
          this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

          this.#image = this.shadowRoot.querySelector('.image')
        }

        /**
         * Monitor the attributes for changes.
         *
         * @returns {string[]} An array of strings that represent attributes to monitor.
         */
        static get observedAttributes () {
          return ['src']
        }

        /**
         * Called when the attributes change.
         *
         * @param {string} name - The name of the attribute.
         * @param {*} oldValue - The old value.
         * @param {*} newValue - the new value.
         */
        attributeChangedCallback (name, oldValue, newValue) {
          if (name === 'src' && newValue !== oldValue) {
            this.#image.setAttribute('src', newValue)
          }
        }

        /**
         * Called when the element is inserted in to the DOM.
         */
        connectedCallback () {
          this.#image.addEventListener('mousedown', (event) => this.#onMouseDown(event))
          this.#image.addEventListener('mouseup', (event) => this.#onMouseUp(event))
        }

        /**
         * Changes the icon when the mouse is clicked.
         */
        #onMouseDown () {
          this.#image.style.opacity = '0.8'
        }

        /**
         * Changes the icon back to normal when the mouse is up.
         */
        #onMouseUp () {
          this.#image.style.opacity = '1'
        }
  })
