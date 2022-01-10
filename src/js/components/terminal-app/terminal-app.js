const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            height: 400px;
            width: 750px;
            background-color: rgb(44, 44, 46);
            overflow-y: scroll;
            overflow: hidden;
        }
        #container {
            border: solid 1px black;
            height: 400px;
            width: 750px;
            padding: 10px;
            display: inline-block;
            overflow-y: scroll;
            overflow: hidden;
            font-size: 15px;
            color: rgb(184, 184, 186);
        }

        #input {
            width: 320px;
            background-color: rgb(44, 44, 46);
            outline: none;
            border: none;
            color: rgb(184, 184, 186);
        }
    </style>
   <div id='container'>
        <div id='output'></div>
        <div id='inputcontainer'>
            <span>&nbsp;jacobandersson@Jacobs-MacBook-Air portfolio-app %&nbsp; </span><input id='input' type='text'>
        </div>
    </div>
`

customElements.define('terminal-app',

class extends HTMLElement {
    
    #input

    #output

    #container

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

        this.#input = this.shadowRoot.querySelector('#input')
        this.#output = this.shadowRoot.querySelector('#output')
        this.#container = this.shadowRoot.querySelector('#container')
    }

    connectedCallback() {
        this.#input.addEventListener('keypress', (event) => this.#onEnter(event))
        this.#container.addEventListener('click', (event) => this.#focusInput(event))
        this.#focusInput()
    }

    #focusInput() {
        this.#input.focus()
    }

    #printInput(inputString) {
        const div = document.createElement('div')
        div.textContent += 'jacobandersson@Jacobs-MacBook-Air portfolio-app %' + inputString
        this.#output.appendChild(div)
    }

    #printProcessedInputOutput(output) {
        const div = document.createElement('div')
        div.textContent += output
        this.#output.appendChild(div)
    }

    #processInput(inputString) {
        if (inputString === 'help') {
          this.#printProcessedInputOutput('Commands: ')
          this.#printProcessedInputOutput('  mkdir <name> - To create a folder.')
          this.#printProcessedInputOutput('  touch <name>.filetype - To create a file.')
          this.#printProcessedInputOutput('  clear - To clear the terminal.')
        }
        if (inputString === 'clear') {
            console.log(this.#container.firstChild)
            // while(this.#container.firstChild !== 'div') {
            //     this.#container.removeChild(this.#container.firstChild)
            // }
        }
      }

    #onEnter(event) {
        if (event.key === 'Enter') {
            this.#printInput(' ' + this.#input.value)
            this.#processInput(this.#input.value)
            this.#input.value = ''
        }
    }
})