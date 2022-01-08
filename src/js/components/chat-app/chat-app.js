const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            height: 500px;
            width: 650px;
            background-color: rgb(44, 44, 46)
        }

        .chatapp {
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        }

        .chatmessages {
            background-color: white;
            width: 95%;
            height: 95%;
            color: white;
            grid-row: 1/5;
            justify-self: center;
            align-self: center;
            background-color: rgb(58, 58, 58);
            border-radius: 8px;
        }

        .sender {
            display: block;
            width: 95%;
            height: 90%;
            resize: none;
            grid-row: 5/6;
            justify-self: center;
            align-self: center;
            padding: 4px;
            margin: 0;
            margin-bottom: 6px;
            outline: none;
            border-radius: 8px;
        }
    </style>
    <div class="chatapp">
        <div class="chatmessages"></div>
        <textarea class="sender"></textarea>
        <input type="submit" class="submitmessage">
    </div>
`

customElements.define('chat-app',

    class extends HTMLElement {

        #chatapp

        #chatmessages

        #sender

        #submitmessage

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#chatapp = this.shadowRoot.querySelector('.chatapp')
            this.#chatmessages = this.shadowRoot.querySelector('.chatmessages')
            this.#sender = this.shadowRoot.querySelector('.sender')
            this.#submitmessage = this.shadowRoot.querySelector('.submitmessage')
        }

        connectedCallback () {
            return
        }
    })