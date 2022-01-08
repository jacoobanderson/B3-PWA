const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
        }

        .nicknameinput {
            background-color: rgb(58, 58, 58);
            border-radius: 10px;
            width: 75%;
            height: 27%;
            display: grid;
        }

        .input {
            align-self: center;
            justify-self: center;
            width: 60%;
            height: 30px;
            font-size: 20px;
            outline: none;
            border-radius: 7px;
            padding: 4px;
        }

        .title {
            align-self: center;
            justify-self: center;
            color: white;
        }
        
        .button {
            background-color: rgb(58, 58, 58);
            border: none;
            color: white;
            height: 30px;
            border-radius: 10px;
            margin-top: 25px;
        }

        .button:hover {
            background-color: rgb(78, 78, 78);
        }
    </style>
    <div class="nicknameinput">
        <h1 class="title">Enter your nickname:</h1>
        <input class="input">
        <button class="button">Enter the chat</button>
    </div>
`

customElements.define('chat-nickname',

    class extends HTMLElement {

        #nicknameinput

        #title

        #input

        #button

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#nicknameinput = this.shadowRoot.querySelector('.nicknameinput')
            this.#title = this.shadowRoot.querySelector('.title')
            this.#input = this.shadowRoot.querySelector('.input')
            this.#button = this.shadowRoot.querySelector('.button')
        }

        connectedCallback () {
            this.#button.addEventListener('click', () => this.#setNicknameValue())
            this.#button.addEventListener('click', (event) => this.#nicknameSubmitEvent(event))
        }

        #nicknameSubmitEvent () {
            this.dispatchEvent(new CustomEvent('nicknameSubmit', {
                bubbles: true
            }))
        }
        
        #getNicknameValue () {
            return this.#input.value
        }

        #setNicknameValue () {
            const value = this.#getNicknameValue()
            window.localStorage.setItem('nickname', value)
            this.#input.value = ''
        }
    })