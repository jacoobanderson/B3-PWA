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
        
        .test {
            width: 50px;
            height: 50px;
            background-color: white;
            margin-left: 8px;
            margin-right: 8px;
            border-radius: 10px;
        }
    </style>
    <div class="navbar">
        <div class="test one"></div>
        <div class="test two"></div>
        <div class="test three"></div>
        <div class="test four"></div>
        <div class="test five"></div>
        <div class="test six"></div>
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