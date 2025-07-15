import './style.css'
import { calendar } from './counter.js'
import { battle } from "./battle.js"
import { Render } from './utils.js';
// import $ from 'jquery';

var open = 0
const menu = {
    jsx: `
      <div id="title-menu" class="screen">
        <div class="title-pannel d-grid">
          <p class="title playfair">
            BEHIND <br />
            <span class="title-small">The</span>VEIL
          </p>
        </div>
        <div class="menu-pannel d-grid grid-centered">
          <div class="menu">
            <ul>
              <li id="continue-btn">CONTINUE</li>
              <li id="new-btn">NEW GAME</li>
              <li>LOAD GAME</li>
              <li>SETTINGS</li>
              <li>QUIT</li>
            </ul>
            <hr />
            <small>BLC Games Studio</small>
          </div>
        </div>
      </div>
    `,
  callback: () => {
    document.querySelector('#continue-btn')?.addEventListener('click', start);
    document.querySelector('#new-btn')?.addEventListener('click', toBattle);
  }
} 

const start = ()=> { Render('#app', calendar) }
const toBattle = ()=> { Render('#app', battle) }

Render("#app", menu)
