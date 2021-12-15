
const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            position: absolute;
            z-index: 20;
            margin: 0;
            width: 400px;
            height: 300px;
            border: solid 2px white;
        }
    </style>
`

customElements.define('draggable-window',

    class extends HTMLElement {

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))
        }

    })