import '../chat-nickname/index.js'

const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            height: 500px;
            width: 650px;
            background-color: rgb(44, 44, 46);
        }

        .chatapp {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            display: none;
        }

        .chatmessages {
            background-color: white;
            width: 603px;
            height: 350px;
            color: white;
            justify-self: center;
            align-self: center;
            background-color: rgb(58, 58, 58);
            border-radius: 8px;
            margin-top: 10px;
            margin-bottom: 10px;
            overflow-y: scroll;
        }

        .sender {
            display: block;
            width: 90%;
            height: 50px;;
            resize: none;
            justify-self: center;
            align-self: center;
            padding: 8px;
            margin: 0;
            margin-bottom: 6px;
            outline: none;
            border-radius: 8px;
            background-color: rgb(58, 58, 58);
            border: 1px solid black;
            color: white;
        }

        .submitmessage {
            display: block;
            justify-self: center;
            align-self: center;
            width: 603px;
            background-color: rgb(58, 58, 58);
            border: none;
            border-radius: 8px;
            height: 30px;
            color: white;
        }

        .submitmessage:hover {
            background-color: rgb(78, 78, 78);
        }

        .hidenickname {
            
        }

        p {
            border-radius: 5px;
            margin: 20px;
            width: 90%;
            padding: 10px;
            background-color: rgb(52, 130, 50);
        }

    </style>
    <div class="chatapp">
        <div class="chatmessages">
        </div>
        <textarea class="sender"></textarea>
        <button class="submitmessage">Send</button>
    </div>
    <chat-nickname class="hidenickname"></chat-nickname>
`

customElements.define('chat-app',

    class extends HTMLElement {

        #chatapp

        #hideNickname

        #chatmessages

        #sender

        #submitmessage

        #nickname

        #webSocketUrl

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#chatapp = this.shadowRoot.querySelector('.chatapp')
            this.#chatmessages = this.shadowRoot.querySelector('.chatmessages')
            this.#sender = this.shadowRoot.querySelector('.sender')
            this.#submitmessage = this.shadowRoot.querySelector('.submitmessage')
            this.#hideNickname = this.shadowRoot.querySelector('.hidenickname')
            this.#nickname = undefined
            this.#webSocketUrl = new WebSocket('wss://courselab.lnu.se/message-app/socket')

            // socket key eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd
        }

        connectedCallback () {
            this.#checkIfNickname()
            this.#sender.focus()
            this.#hideNickname.addEventListener('nicknameSubmit', () => this.#showChat())
            this.#hideNickname.addEventListener('nicknameSubmit', () => this.#getNickname())
            this.#webSocketUrl.addEventListener('message', (event) => this.#showMessages(event))
            this.#submitmessage.addEventListener('click', () => this.#sendMessage())
            this.#sender.addEventListener('keypress', (event) => this.#sendMessageOnEnter(event))
        }

        #sendMessageOnEnter(event) {
            if (event.key === 'Enter') {
                this.#sendMessage()
            }
        }

        // Remove and append nickname instead?
        #showChat() {
            this.#hideNickname.style.display = 'none'
            this.#chatapp.style.display = 'flex'
        }

        #getNickname () {
            this.#nickname = window.localStorage.getItem('nickname')
            return this.#nickname
        }

        #checkIfNickname () {
            // Checks if there is a nickname, if so - show the chat.
            if (this.#getNickname() !== null && this.#getNickname().length > 0) {
                this.#hideNickname.style.display = 'none'
                this.#chatapp.style.display = 'flex'
            // Else show the nickname input.
            } else {
                this.#hideNickname.style.display = 'flex'
                this.#chatapp.style.display = 'none'
            }
        }

        #showMessages (event) {
            const data = JSON.parse(event.data)
            if (data.type !== 'heartbeat') {
                const messageElement = document.createElement('p')
                messageElement.textContent = `${data.username}: ${data.data}`
                this.#chatmessages.appendChild(messageElement)
            }

            // automatic scroll to most recent message.
            this.#chatmessages.scrollTop = this.#chatmessages.scrollHeight

            // Clean
            if (this.shadowRoot.querySelectorAll('p').length > 20) {
                this.#chatmessages.removeChild(this.shadowRoot.querySelectorAll('p')[0])
            }

        }

        #sendMessage () {
            const message = this.#sender.value
            const nickname = this.#nickname

            if (this.#webSocketUrl.readyState === 1) {
                this.#webSocketUrl.send(JSON.stringify({
                    type: 'message',
                    data: `${message}`,
                    username: `${nickname}`,
                    key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
                }))
            }
            this.#sender.value = ''
        }
    })