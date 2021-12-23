import '../mac-dock/index.js'
import '../app-icon/index.js'
import '../draggable-window/index.js'

const template = document.createElement('template')

template.innerHTML = `
    <style>
      :host {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
      }  
      
      .desktop {
        width: 100%;
        height: 100%;
        background-color: #923cb5;
        background-image: linear-gradient(175deg, #923cb5 0%, #000000 78%);
        overflow: hidden;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: auto;
      }
      
      .animation {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        justify-self: center;
      }
      
      .line {
        position: absolute;
        width: 1px;
        height: 100%;
        top: 0;
        left: 50%;
        background: rgba(255, 255, 255, 0.1);
        overflow: hidden;
        z-index: 1;
      }
      
      #linethree {
          margin-left: -25%;
      }
      
      #lineone {
          margin-left: 25%;
      }
      
      .line::after {
          content: '';
          display: block;
          position: absolute;
          height: 25vh;
          width: 100%;
          top: -50%;
          left: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #ffffff 75%, #ffffff 100%);
          animation: drop 7s 0s infinite;
          animation-fill-mode: forwards;
          animation-timing-function: cubic-bezier(0.3, 0.25, 0, 0.96);
      }
          
      @keyframes drop {
        0% {
          top: -45%;
          }
        100% {
          top: 115%;
        }
      }

      .test {
        width: 50px;
        height: 50px;
        margin-left: 8px;
        margin-right: 8px;
        border-radius: 10px;
        border: solid 1px white;
    }
    </style>
    <div class="desktop">
        <div class="animation">
            <div class="line" id="lineone"></div>
            <div class="line" id="linetwo"></div>
            <div class="line" id="linethree"></div>
        </div>
        <mac-dock>
            <app-icon slot="memory" class="memory" src="./js/components/desktop-component/img/app_drawer.png"></app-icon>
            <app-icon slot="chat" class="chat" src="./js/components/desktop-component/img/chat_blank.png"></app-icon>
            <app-icon slot="terminal" class="terminal" src="./js/components/desktop-component/img/terminal.png"></app-icon>
            <div slot="testone" class="test"></div>
            <div slot="testtwo" class="test"></div>
            <div slot="testthree" class="test"></div>
        </mac-dock>
    </div>
`

customElements.define('desktop-component',

    class extends HTMLElement {

      #desktop

      #memory

      #terminal

      #chat

      #amountOfClicks

      #zIndexClicks

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))

            this.#memory = this.shadowRoot.querySelector('.memory')
            this.#desktop = this.shadowRoot.querySelector('.desktop')
            this.#terminal = this.shadowRoot.querySelector('.terminal')
            this.#chat = this.shadowRoot.querySelector('.chat')
            // change name
            this.#amountOfClicks = 0
            this.#zIndexClicks = 10
        }

        connectedCallback() {
          this.#terminal.addEventListener('click', () => this.#appOnClick('terminal'))
          this.#memory.addEventListener('click', () => this.#appOnClick('memory'))
          this.#chat.addEventListener('click', () => this.#appOnClick('chat'))

          // Put in seperate method.
          this.#desktop.addEventListener('draggable-window:closed', (event) => {
            this.#desktop.removeChild(event.target)
          })

          // Put in seperate method.
          this.#desktop.addEventListener('windowClickCount', (event) => {
            this.#zIndexClicks++
            event.target.style.zIndex = `${this.#zIndexClicks}`
          })
        }


        // FIX - INSTEAD MAKE FUNCTION THAT CAN BE USED FOR ALL APPS AND TAKES APP AS ARGUMENT
        #appOnClick(application) {
          // Each time the app is clicked the position changes, prevents windows from stacking.
          // Checks how many windows currently.
          const amountOfWindows = this.#desktop.querySelectorAll('draggable-window').length

          // Determines how much the position should change depending on how many windows are opened.
          this.#amountOfClicks = amountOfWindows * 20

          // Creates the window element.
          const window = document.createElement('draggable-window')

          // Specifies which app should open.
          window.setAttribute('app', `${application}`)

          // The exact values of the apps position change.
          window.style.top = `${this.#amountOfClicks + 10}px`
          window.style.left = `${this.#amountOfClicks + 10}px`

          this.#desktop.appendChild(window)
        }
    })