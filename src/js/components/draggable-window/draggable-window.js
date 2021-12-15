
const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            position: absolute;
            z-index: 20;
            margin: 0;
            width: 400px;
            height: 300px;
            border: solid 1px white;
            border-radius: 7px;
        }

        .button {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: none;
            margin: 2px;
        }

        .button:hover {
            background-color: white;
        }

        .menu {
            background-color: grey;
            align-items: center;
        }

        .exit {
            background-color: red;
        }
        .yellow {
            background-color: yellow;
        }
        .green {
            background-color: green;
        }

    </style>
    <div class="menu">
        <button class="button exit"></button>
        <button class="button yellow"></button>
        <button class="button green"></button>
    </div>
    <div class="appcontainer">
        <slot name="app"></slot>
    </div>
`

customElements.define('draggable-window',

    class extends HTMLElement {

        #exit

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#exit = this.shadowRoot.querySelector('.exit')
        }

        connectedCallback() {
            this.#exit.addEventListener('click', (event) => this.#exitApp(event))
        }

        #exitApp () {
            this.style.display = 'none'
        }
    })