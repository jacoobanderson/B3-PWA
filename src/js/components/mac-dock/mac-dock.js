const template = document.createElement('template')

template.innerHTML = `
    <style>
        :host {
            display: block;
            position: absolute;
            grid-column: 2/4;
            justify-self: center;
            bottom: 10px;
        }
        .navbar {
            display: flex;
            height: 60px;
            border-radius: 15px;
            background: rgba(83, 83, 83, 0.25);
            backdrop-filter: blur(11px);
            opacity: 0.9;
            z-index: -3;
            justify-content: center;
            align-items: center;
            border: 1px solid rgba(255, 255, 255, 0.18);
            padding: 4px;
        }
        
    </style>
    <div class="navbar">
        <slot name="memory" class="test one"></slot>
        <slot name="chat" class="test two"></slot>
        <slot name="terminal" class="test three"></slot>
        <slot name="testone" class="test four"></slot>
        <slot name="testtwo" class="test five"></slot>
        <slot name="testthree" class="test six"></slot>
    </div>
`

customElements.define('mac-dock',

class extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: 'open' })
            .appendChild(template.content.cloneNode(true))

    }
})