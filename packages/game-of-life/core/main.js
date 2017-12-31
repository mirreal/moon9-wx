import Canvas from './canvas.js'
import Cell from './cell.js'

export default class Game {
  constructor() {
    this.cells = []
    this.canvas = new Canvas()

    const spacing = this.canvas.spacing
    const canvas = this.canvas.canvas
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    this.spacing = spacing

    this.maxWidth = Math.ceil(canvasWidth / spacing)
    this.maxHeight = Math.ceil(canvasHeight / spacing)

    this.init()
  }

  init() {
    this.createRandomCells()
    this.draw()

    this.getAroundCells()

    this.loop = setInterval(() => {
      this.update()
      this.draw()
    }, 120)
  }

  createRandomCells() {
    for (let i = 0; i < this.maxWidth; i++) {
      for (let j = 0; j < this.maxHeight; j++) {
        const status = Math.random() < 0.2
        this.cells.push(
          new Cell(
            {
              x: i,
              y: j
            },
            status
          )
        )
      }
    }
  }

  draw() {
    this.canvas.clear()
    this.canvas.drawGrid()

    this.cells.forEach(cell => {
      if (cell.status === true) {
        this.canvas.drawCell(cell)
      }
    })
  }

  getAroundCells() {
    const maxWidth = this.maxWidth
    const maxHeight = this.maxHeight

    this.cells.forEach(cell => {
      cell.around = cell.getAround(maxWidth, maxHeight)

      cell.aroundCells = cell.around
        .map(position => this.cells[maxHeight * position.x + position.y])
    })
  }

  update() {
    this.cells.forEach(cell => {
      cell.aroundCells.forEach(aroundCell => {
        if (aroundCell.status === true) cell.aliveCount += 1
      })

      if (cell.status === true) {
        if (cell.aliveCount === 2 || cell.aliveCount === 3) {
          cell.nextStatus = true
        } else {
          cell.nextStatus = false
        }
      }

      if (cell.status === false) {
        if (cell.aliveCount === 3) {
          cell.nextStatus = true
        } else {
          cell.nextStatus = false
        }
      }
    })

    this.cells.forEach(cell => {
      cell.status = cell.nextStatus
      cell.aliveCount = 0
    })
  }
}
