import '../terminal-app/index.js'
import '../chat-app/index.js'
import '../memory-game/index.js'

const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            outline: 0;
            position: absolute;
            z-index: 10;
            margin: 0;
            border: solid 1px grey;
            border-radius: 7px;
            overflow: hidden;
            animation-duration: 0.5s;
            animation-name: pop;
        }

        @keyframes pop {
            from {
              transform: scale(0);
              opacity: 0;
            }
          
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

        .button {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            margin: 6px 3px 6px 3px;
        }

        .button:hover {
            background-color: white;
        }

        .menu {
            background-color: rgb(72, 72, 74);
            align-items: center;
        }

        .exit {
            background-color: red;
        }
        .yellow {
            background-color: yellow;
        }
        .green {
            background-color: rgb(52, 199, 89);
        }

    </style>
    <div class="menu">
        <button class="button exit"></button>
        <button class="button yellow"></button>
        <button class="button green"></button>
    </div>
    <div class="appcontainer"></div>
`

customElements.define('draggable-window',

  /**
   * Represents the draggable window.
   */
  class extends HTMLElement {
        #exit

        #appcontainer

        #headmenu

        /**
         * Creates an instance of this type.
         */
        constructor () {
          super()
          this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

          this.#exit = this.shadowRoot.querySelector('.exit')
          this.#appcontainer = this.shadowRoot.querySelector('.appcontainer')
          this.#headmenu = this.shadowRoot.querySelector('.menu')
        }

        /**
         * Called when the element is inserted into the DOM.
         */
        connectedCallback () {
          this.#exit.addEventListener('click', (event) => this.#exitApp(event))
          this.#headmenu.addEventListener('mousedown', (event) => this.#onMouseDown(event))
          this.addEventListener('click', (event) => this.#focusElement(event))
          this.addEventListener('click', (event) => this.#thisOnClick(event))
          this.addEventListener('mousedown', (event) => this.#thisOnClick(event))
        }

        /**
         * Fires an event that in turn exits the app.
         */
        #exitApp () {
          // removes the app from the DOM
          this.dispatchEvent(new CustomEvent('draggable-window:closed', {
            bubbles: true
          }))
          // this.remove()
        }

        /**
         * Fires an event that counts the times a window has been clicked.
         */
        #thisOnClick () {
        // Fires when this component is clicked or mousedown, allows the desktop component to register
        // when this happens and allows the change of zIndex based on that information (Each element keeps it's zIndex).
          this.dispatchEvent(new CustomEvent('windowClickCount', {
            bubbles: true
          }))
        }

        /**
         * Observes this element's attributes.
         *
         * @returns {string[]} - Represents the attributes being observed.
         */
        static get observedAttributes () {
          return ['app']
        }

        /**
         * Called when the attributes on this element changes.
         *
         * @param {string} name - The name of the attribute
         * @param {*} oldValue - The old value.
         * @param {*} newValue - The new value.
         */
        attributeChangedCallback (name, oldValue, newValue) {
          // Creates the window and the app depending on which value of the attribute.
          if (name === 'app' && newValue === 'terminal') {
            const terminal = document.createElement('terminal-app')
            this.#appcontainer.appendChild(terminal)
          } else if (name === 'app' && newValue === 'memory') {
            const memoryGame = document.createElement('memory-game')
            this.#appcontainer.appendChild(memoryGame)
          } else if (name === 'app' && newValue === 'chat') {
            const chatApp = document.createElement('chat-app')
            this.#appcontainer.appendChild(chatApp)
          }
        }

        /**
         * Makes the window draggable.
         *
         * @param {string} event - The event.
         */
        #onMouseDown (event) {
          const element = this

          this.#focusElement()

          // Temporary solution, better alternative?
          window.addEventListener('mousemove', onMouseMove)
          window.addEventListener('mouseup', onMouseUp)

          let previousX = event.clientX
          let previousY = event.clientY

          /**
           * Handles the mouse movement.
           *
           * @param {string} event - The event
           */
          function onMouseMove (event) {
            const newPosX = previousX - event.clientX
            const newPosY = previousY - event.clientY

            const domRect = element.getBoundingClientRect()
            element.style.left = domRect.left - newPosX + 'px'
            element.style.top = domRect.top - newPosY + 'px'

            previousX = event.clientX
            previousY = event.clientY
          }

          /**
           * Removes the event listeners when the mouse is up.
           */
          function onMouseUp () {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
          }
        }

        /**
         * Sets the attribute tabindex to 0 which allows the element to be focused.
         */
        #focusElement () {
          this.setAttribute('tabindex', '0')
          // this.focus()
        }
  })
