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
            padding: 0;
            margin: 0;
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
            <span id="inputspan">&nbsp;jacobandersson@Jacobs-MacBook-Air portfolio-app %&nbsp; </span><input id='input' type='text'>
        </div>
    </div>
`

customElements.define('terminal-app',

  /**
   * Represents the terminal application.
   */
  class extends HTMLElement {
    #input

    #output

    #container

    #inputspan

    #inputcontainer

    /**
     * Creates an instance of this type.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#input = this.shadowRoot.querySelector('#input')
      this.#output = this.shadowRoot.querySelector('#output')
      this.#container = this.shadowRoot.querySelector('#container')
      this.#inputcontainer = this.shadowRoot.querySelector('#inputcontainer')
      this.#inputspan = this.shadowRoot.querySelector('#inputspan')
    }

    /**
     * Fired when the element is put in the DOM.
     */
    connectedCallback () {
      this.#inputspan.textContent = `${this.#getUsername()}@${this.#getUsername()}s-PWD desktop-application % `
      this.#input.addEventListener('keypress', (event) => this.#onEnter(event))
      this.#container.addEventListener('click', (event) => this.#focusInput(event))
      this.#focusInput()
    }

    /**
     * Focuses on input.
     */
    #focusInput () {
      this.#input.focus()
    }

    /**
     * Prints the input div.
     *
     * @param {string} inputString - What has been entered in the terminal.
     */
    #printInput (inputString) {
      const div = document.createElement('div')
      div.textContent += `${this.#getUsername()}@${this.#getUsername()}s-PWD desktop-application %` + inputString
      // 'jacobandersson@Jacobs-MacBook-Air portfolio-app %'
      this.#output.appendChild(div)
    }

    /**
     * Prints the processed output.
     *
     * @param {string} output - Represents the output.
     */
    #printProcessedInputOutput (output) {
      const div = document.createElement('div')
      div.textContent += output
      this.#output.appendChild(div)
    }

    /**
     * Handles the input and determines what to do depending on what has been written.
     *
     * @param {string} inputString - Represents the input value.
     */
    #processInput (inputString) {
      const command = inputString.split(' ')[0]
      const file = inputString.split(' ')[1]

      if (inputString === 'help') {
        this.#printSpace()
        this.#printProcessedInputOutput('Commands: ')
        this.#printProcessedInputOutput('  mkdir <name> - To create a folder.')
        this.#printProcessedInputOutput('  touch <name>.filetype - To create a file.')
        this.#printProcessedInputOutput('  clear - To clear the terminal.')
        this.#printSpace()
      } else if (inputString === 'clear') {
        while (this.#output.firstChild) {
          this.#output.removeChild(this.#output.firstChild)
        }
      } else if (command === 'touch') {
        const fileName = file.split('.')[0]
        const fileType = file.split('.')[1]
        this.dispatchEvent(new CustomEvent('terminal-app:touch', {
          bubbles: true,
          composed: true,
          detail: { fileName, fileType }
        }))
      } else if (command === 'mkdir') {
        const folder = 'folder'
        const folderName = inputString.split(' ')[1]
        this.dispatchEvent(new CustomEvent('terminal-app:mkdir', {
          bubbles: true,
          composed: true,
          detail: { folderName, folder }
        }))
      }
    }

    /**
     * Handles what happens when enter is pressed.
     *
     * @param {string} event - Represents the event.
     */
    #onEnter (event) {
      if (event.key === 'Enter') {
        this.#printInput(' ' + this.#input.value)
        this.#processInput(this.#input.value)
        this.#input.value = ''
      }
    }

    /**
     * Gets the username from local storage.
     *
     * @returns {string} - The username.
     */
    #getUsername () {
      const username = window.localStorage.getItem('nickname')
      return username
    }

    /**
     * Prints spaces in the terminal.
     */
    #printSpace () {
      const div = document.createElement('div')
      div.style.height = '17px'
      this.#output.appendChild(div)
    }
  })
