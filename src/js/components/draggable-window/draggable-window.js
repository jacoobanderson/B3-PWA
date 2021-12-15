import '../terminal-app/index.js'

const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            position: absolute;
            z-index: 20;
            margin: 0;
            border: solid 1px grey;
            border-radius: 7px;
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

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#exit = this.shadowRoot.querySelector('.exit')
            this.#appcontainer = this.shadowRoot.querySelector('.appcontainer')
        }

        connectedCallback() {
            this.#exit.addEventListener('click', (event) => this.#exitApp(event))
        }

        #exitApp () {
            this.style.display = 'none'
        }

        static get observedAttributes() {
            return ['app']
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (name === 'app' && newValue === 'terminal') {
                const terminal = document.createElement('terminal-app')
                this.#appcontainer.appendChild(terminal)
            }
        }
    })