const template = document.createElement('template')

template.innerHTML = `
    <style>
        .navbar {
            position: absolute;
            display: flex;
            height: 60px;
            justify-self: center;
            bottom: 15px;
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
        <div class="test"></div>
        <div class="test"></div>
        <div class="test"></div>
        <div class="test"></div>
        <div class="test"></div>
        <div class="test"></div>
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