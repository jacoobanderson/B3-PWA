
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

    class extends HTMLElement {
        
        #image

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#image = this.shadowRoot.querySelector('.image')
        }

        static get observedAttributes () {
            return ['src']
        }

        attributeChangedCallback (name, oldValue, newValue) {
            if (name === 'src' && newValue !== oldValue) {
                this.#image.setAttribute('src', newValue)
            }
        }

        connectedCallback () {
            this.#image.addEventListener('mousedown', (event) => this.#onMouseDown(event))
            this.#image.addEventListener('mouseup', (event) => this.#onMouseUp(event))
        }

        #onMouseDown () {
            this.#image.style.opacity = '0.8'
        }
        #onMouseUp () {
            this.#image.style.opacity = '1'
        }


    })