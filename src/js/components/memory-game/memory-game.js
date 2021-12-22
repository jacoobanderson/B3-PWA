const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            height: 400px;
            width: 650px;
            background-color: rgb(44, 44, 46)
        }
        .test {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        h1 {
            color: white;
        }
    </style>
    <div class="test"><h1>MEMORY</h1></div>
`

customElements.define('memory-game',

    class extends HTMLElement {

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))
        }
    })