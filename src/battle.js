class Player {
  constructor(name, x, y, color) {
    this.name = name
    this.x = x
    this.y = y
    this.color = color
  }

  move(x,y){
    this.x = x
    this.y = y
  }
}

const players = [
  new Player("Alice", 1, 1, "red"),
  new Player("Solas", 1, 3, "blue"),
]

export const battle = {
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
    let i = 0
    var Active = null
    let rows = 6
    let columns = 9
    for (let y = 0; y<rows; y++) {
      let row = document.createElement('div')
      row.classList = "row"
      row.id = "row" + y
      document.querySelector("#grid").append(row)
      for (let x = 0; x<columns; x++){
        let Case = document.createElement('div')
        Case.classList = "case"
        Case.id = "x" + x + "y" + y
        document.querySelector("#row" + y).append(Case)
      }
    }

    for (let player of players) {
      let pion = document.createElement('div')
      pion.classList = "pion " + player.color
      pion.id = i
      i++
      document.querySelector(`#x${player.x}y${player.y}`).append(pion)
    }

    $('.pion').click(e => {
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
  }
}
