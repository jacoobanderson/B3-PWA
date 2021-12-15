
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

    })