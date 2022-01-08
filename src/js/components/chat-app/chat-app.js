const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            height: 400px;
            width: 650px;
            background-color: rgb(44, 44, 46)
        }
        
        .chatapp {
            height: 100%;
            width: 100%;

        }

        .chatmessages {
            background-color: white;
            width: 100%;
            height: 70%
        }

        .sender {
            display: block;
            width: 100%;
            height: 30%;
            resize: none;
        }
    </style>
    <div class="chatapp">
        <div class="chatmessages"></div>
        <textarea class="sender" onclick="this.focus()"></textarea>
        <input type="submit">
    </div>
`

customElements.define('chat-app',

    class extends HTMLElement {

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))
        }
    })