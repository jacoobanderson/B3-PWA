import '../mac-dock/index.js'

const template = document.createElement('template')

template.innerHTML = `
    <style>
    :host {
        width: 100%;
        height: 100%;
        background: linear-gradient(180deg, rgb(0, 39, 3) 25%, rgb(16, 71, 45) 75%, rgb(15, 110, 66) 100%);
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
          top: -50%;
          }
        100% {
          top: 110%;
        }
      }
    </style>
    <div class="animation">
        <div class="line" id="lineone"></div>
        <div class="line" id="linetwo"></div>
        <div class="line" id="linethree"></div>
    </div>
    <mac-dock></mac-dock>
`

customElements.define('desktop-component',

    class extends HTMLElement {

        constructor() {
            super()
            this.attachShadow({ mode: 'open' })
                .appendChild(template.content.cloneNode(true))
        }
    })