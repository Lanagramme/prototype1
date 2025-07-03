import './style.css'
import { setupCalendar } from './counter.js'
import { dialogue_runner } from './dialogue.js';
import { players } from "./battle.js"
import $ from 'jquery';

var open = 0
const innapp = {
  jsx : `
  <div>
    <h1>Calendar</h1>
    <div class="card">
      <p id="actions"></p>
      <button id="tomorrow" type="button">Tomorrow</button>
    </div>
    <p class="read-the-docs">
      Click on the button to pass to the next day
    </p>
  </div>
   `,
  callback:()=> {
    setupCalendar(
      document.querySelector('#counter h2'), 
      document.querySelector('#tomorrow'), 
      document.querySelector('#actions'),
      document.querySelector('#event'))
      $(".calendar .hide").toggle()
      $(".cal-switch .bi").click(e => {
        $(".cal-switch .bi").each((i, el) => {
          $(el).toggle()
        });
        if (!open) {
          $('.calendar').animate({ width: "200px" }, 500, function () {
            $(".cal-body").show();
          });
        }  else {
          $(".cal-body").hide();
          $('.calendar').animate({ width: "20px" }, 500);
        }
        open = !open
      })
  }
}

const calendar = {
  jsx : `
      <div class="inner-app">
        <div class="dialogue-window bg-transparent-low">
          <div class="portrait border bg"> <h1 class="portrait-name">NAME</h1> </div>
          <div class="dialogue bg"> 
            <div class="dialogue-text"></div> 
          </div>
        </div>
        <div class="calendar hud">
          <div class="calendar-switch">
            <div class="carret"></div>
            <div class="cal-switch">
              <i class="bi bi-caret-down-square-fill"></i>
              <i class="bi bi-caret-left-square-fill hide"></i>
            </div>
          </div>
          <div class="cal-body hide">
              <h5>Calendar</h5>
            <h6>Today</h6>
            <p id="event"></p>
            <h6>Futur</h6>
            <div class="futur_event"></div>
            <h6>Incomming</h6>
            <div class="incomming_event"></div>
          </div>
        </div>

        <div class="dices hud">
          <button class="die"></button>
          <button class="die"></button>
          <button class="die"></button>
          <button class="die"></button>
          <button class="die"></button>
        </div>
        <div class="content"></div>

        <div id="footer">
          <div id="counter" class="hud"><h2></h2></div>
        </div>
      </div>
  `,
  callback:()=>{
    Render('.inner-app .content', innapp)
    dialogue_runner(0)
  }
}

const battle = {
  jsx : `
    <div class="inner-app">
      <h1>Turn 1</h1>
      <div id="board">
        <div id="grid"></div>
        <div id="characters">
          <div id="character1"></div>
          <div id="character1"></div>
        </div>
      </div>
    </div>
  `,
  callback: () => {
    let rows = 6
    let columns = 9
    for (let y = 0; y<rows; y++) {
      let row = document.createElement('div')
      row.classList = "row"
      row.id = "row" + y
      document.querySelector("#grid").append(row)
      for (let x = 0; x< columns; x++){
        let Case = document.createElement('div')
        Case.classList = "case"
        Case.id = "x" + x + "y" + y
        document.querySelector("#row" + y).append(Case)
      }
    }

    let i = 0
    for (let player of players) {
      let pion = document.createElement('div')
      pion.classList = "pion " + player.color
      pion.id = i
      i++
      document.querySelector(`#x${player.x}y${player.y}`).append(pion)
    }

    $('.pion').click( e => {
      // console.log(players[e.target.id])
      e.stopPropagation()
      Active = e.target.id
    })

    $('.case').click(e => {
      if (Active) {
        const targetX = e.target.id[1]
        const targetY = e.target.id[3]
        const player = players[Active]
        let caseActive = $(`#x${player.x}y${player.y}`)
        let pionActive = $(`#x${player.x}y${player.y} .pion`)
        player.move(targetX, targetY)
        $(`#x${targetX}y${targetY}`).append(pionActive)
        caseActive.html('')
      }
      Active = null
    })
    var Active = null
  }
}


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

const Render = (selector, component) => { 
  const el = $(selector);
  if (!el) return console.error('Selector not found:', selector);
  el.html(component.jsx);
  if (component.callback) component.callback();
}
Render("#app", menu)
