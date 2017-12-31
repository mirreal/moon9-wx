export default class Canvas {
  constructor() {
    this.canvas = this.getCanvas()
    this.context = this.canvas.getContext('2d')

    this.spacing = 20
  }

  getCanvas() {
    if (typeof wx !== 'undefined') {
      return wx.createCanvas()
    } else {
      const canvas = document.getElementById('canvas')
      return canvas ? canvas : this.createCanvas()
    }
  }

  createCanvas() {
    const $canvasElm = document.createElement('canvas')
    $canvasElm.setAttribute('id', 'canvas')
    $canvasElm.setAttribute('width', screen.width)
    $canvasElm.setAttribute('height', screen.height)
    $canvasElm.innerHTML = 'Your browser does not support Canvas.'

    document.body.insertBefore($canvasElm, document.body.firstChild)

    return $canvasElm
  }

  clear() {
    const canvas = this.canvas
    const ctx = this.context

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore()
  }

  drawGrid(color = 'lightgrey', stepx = this.spacing, stepy = this.spacing) {
    const canvas = this.canvas
    const ctx = this.context

    ctx.save()
    ctx.strokeStyle = color
    ctx.lineWidth = 0.5

    for (let i = stepx + 0.5; i < canvas.width; i += stepx) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, ctx.canvas.height)
      ctx.stroke()
      ctx.closePath()
    }

    for (let i = stepy + 0.5; i < canvas.height; i += stepy) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(ctx.canvas.width, i)
      ctx.stroke()
      ctx.closePath()
    }

    ctx.restore()
  }

  drawCell(cell) {
    const ctx = this.context
    const spacing = this.spacing

    const x = spacing * cell.x + spacing / 2
    const y = spacing * cell.y + spacing / 2

    ctx.fillStyle = 'orange'
    ctx.beginPath()
    ctx.arc(x, y, spacing / 2 - 1, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fill()
  }
}
