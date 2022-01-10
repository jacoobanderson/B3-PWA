
const template = document.createElement('template')

template.innerHTML = `
    <style>
        .icon {
            width: 100px;
            height: 100px;
            z-index: 5;
        }
    </style>
    <img class="icon">
`

customElements.define('terminal-file',

    class extends HTMLElement {

        #icon

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#icon = this.shadowRoot.querySelector('.icon')
        }

        static get observedAttributes () {
            return ['src']
        }

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