import '../terminal-app/index.js'

const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            position: absolute;
            z-index: 10;
            margin: 0;
            border: solid 1px grey;
            border-radius: 7px;
            overflow: hidden;
            animation-duration:0.5s;
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

    class extends HTMLElement {

        #exit

        #appcontainer

        #headmenu

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#exit = this.shadowRoot.querySelector('.exit')
            this.#appcontainer = this.shadowRoot.querySelector('.appcontainer')
            this.#headmenu = this.shadowRoot.querySelector('.menu')
        }

        connectedCallback() {
            this.#exit.addEventListener('click', (event) => this.#exitApp(event))
            this.#headmenu.addEventListener('mousedown', (event) => this.#onMouseDown(event))
        }

        #exitApp () {
            // removes the app from the DOM
            this.remove()
            // this.style.display = 'none'
        }

        static get observedAttributes() {
            return ['app']
        }

        attributeChangedCallback (name, oldValue, newValue) {
            // Creates the window and the app depending on which value of the attribute.
            if (name === 'app' && newValue === 'terminal') {
                const terminal = document.createElement('terminal-app')
                this.#appcontainer.appendChild(terminal)
            }
        }

        #onMouseDown(event) {
            const element = this

            // Temporary solution, better alternative?
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)

            let previousX = event.clientX
            let previousY = event.clientY

            function onMouseMove (event) {
                const newPosX = previousX - event.clientX
                const newPosY = previousY - event.clientY

                const domRect = element.getBoundingClientRect()
                element.style.left = domRect.left - newPosX + 'px'
                element.style.top = domRect.top - newPosY + 'px'

                previousX = event.clientX
                previousY = event.clientY
            }

            function onMouseUp () {
                window.removeEventListener('mousemove', onMouseMove)
                window.removeEventListener('mouseup', onMouseUp)
            }
        }
    })