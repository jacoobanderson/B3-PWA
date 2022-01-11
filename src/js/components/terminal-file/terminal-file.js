
const template = document.createElement('template')

template.innerHTML = `
    <style>
        .icon {
            width: 80px;
            height: 80px;
            z-index: 5;
        }
    </style>
    <img class="icon">
`

customElements.define('terminal-file',

  /**
   * Represents the terminal file.
   */
  class extends HTMLElement {
        #icon

        /**
         * Creates an instance of this type.
         */
        constructor () {
          super()
          this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

          this.#icon = this.shadowRoot.querySelector('.icon')
        }

        /**
         * Observes attributes.
         *
         * @returns {string} The attributes to be observed.
         */
        static get observedAttributes () {
          return ['src']
        }

        /**
         * Called when an attribute is changed.
         *
         * @param {string} name - The name of the attribute.
         * @param {*} oldValue - THe old value.
         * @param {*} newValue - The new value.
         */
        attributeChangedCallback (name, oldValue, newValue) {
          if (name === 'src' && newValue === 'pdf') {
            this.#icon.setAttribute('src', './js/components/terminal-file/images/pdf.png')
          }
          if (name === 'src' && newValue === 'folder') {
            this.#icon.setAttribute('src', './js/components/terminal-file/images/folder.png')
          }
          if (name === 'src' && newValue === 'txt') {
            this.#icon.setAttribute('src', './js/components/terminal-file/images/text.png')
          }
        }
  })
