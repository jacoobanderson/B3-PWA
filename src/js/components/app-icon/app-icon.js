
const template = document.createElement('template')

template.innerHTML = `
    <style>
    </style>
`

customElements.define('app-icon',

    class extends HTMLElement {

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))
        }
    })