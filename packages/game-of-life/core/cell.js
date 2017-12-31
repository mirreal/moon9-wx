export default class Cell {
  constructor(position, status) {
    this.x = position.x
    this.y = position.y

    this.status = status
    this.nextStatus = false

    this.aroundCells = []
    this.aliveCount = 0

    this.around = []
  }

  getAround(maxWidth, maxHeight) {
    if (this.around.length !== 0) return this.around

    const x = this.x
    const y = this.y

    const aroundList = [
      {
        x: x - 1,
        y: y - 1
      },
      {
        x: x - 1,
        y: y
      },
      {
        x: x - 1,
        y: y + 1
      },
      {
        x: x,
        y: y - 1
      },
      {
        x: x,
        y: y + 1
      },
      {
        x: x + 1,
        y: y - 1
      },
      {
        x: x + 1,
        y: y
      },
      {
        x: x + 1,
        y: y + 1
      }
    ]

    const around = aroundList.map(position => ({
      x: (position.x + maxWidth) % maxWidth,
      y: (position.y + maxHeight) % maxHeight
    }))

    return around
    // for (let i = this.x - 1; i <= this.x + 1; i++) {
    //   for (let j = this.y - 1; j <= this.y + 1; j++) {
    //     if (i === this.x && j === this.y) continue

    //     this.around.push({
    //       x: (i + maxWidth) % maxWidth,
    //       y: (j + maxHeight) % maxHeight
    //     })
    //   }
    // }
  }
}
