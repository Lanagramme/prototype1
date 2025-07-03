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

export const players = [
  new Player("Alice", 1, 1, "red"),
  new Player("Solas", 1, 3, "blue"),
]