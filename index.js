// 環境變數
var updateFPS = 30
var showMouse = true
var time = 0
var bgColor = "#001D2E"
var ww = 0
var wh = 0



var canvas = document.getElementById("mycanvas")
var ctx = canvas.getContext("2d")


// -----------------------
// Vec2
class Vec2 {
  constructor(x,y) {
    this.x = x
    this.y = y
  }
  set(x,y) {
    this.x = x
    this.y = y
  }
  move(x,y) {
    this.x += x
    this.y += y
  }
  add(v) {
    return new Vec2(this.x + v.x, this.y - v.y)
  }
  sub(v) {
    return new Vec2(this.x - v.x, this.y - v.y)
  }
  mul(s) {
    return new Vec2(this.x*s, this.y*s)
  }
  get length() {
    return Math.sqrt(this.x*this.x + this.y*this.y)
  }
  set length(nv) {
    let temp = this.unit.mul(nv)
    this.set(temp.x, temp.y)
  }
  clone() {
    return new Vec2(this.x, this.y)
  }
  toString() {
    return `(${this.x}, ${this.y})`
  }
  equal(v) {
    return this.x == v.y && this.y == v.y
  }
  get angle() {
    return Math.atans(thix.y, this.x)
  }
  get unit() {
    return this.mul(1/this.length)
  }
}


// canvas設定
function initCanvas() {
  // ww = canvas.width = window.innerWidth
  // wh = canvas.height = window.innerHeight
  // change canvas size
  // ww = canvas.width
  // wh = canvas.height
  ww = canvas.width = 640
  wh = canvas.height = 480

}

initCanvas()

// 邏輯初始化
function init() {
  
}

// 遊戲邏輯分析
function update() {
  time++
}

// 畫面更新
function draw() {
  // 清空背景
  ctx.fillStyle = bgColor
  ctx.fillRect(0,0,ww,wh)

  // grid
  ctx.strokeStyle = "rgba(255,255,255,0.2)"
  for (var i=1 ; i<13 ; i++) {
    ctx.beginPath()
    ctx.moveTo(i*50, 0)
    ctx.lineTo(i*50, wh)
    ctx.stroke()
  }
  for (var i=1 ; i<10 ; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i*50)
    ctx.lineTo(ww, i*50)
    ctx.stroke()
  }

  // 2 arc
  ctx.save()
    ctx.translate(ww/2+10, wh/2-10)

    ctx.beginPath()
    ctx.arc(0, 0, 200, 0, Math.PI*2)
    ctx.stroke()

    ctx.strokeStyle = "white"
    ctx.beginPath()
    ctx.arc(0, 0, 130, 0, Math.PI*2)
    ctx.stroke()
  ctx.restore()

  // arc
  ctx.save()
    ctx.beginPath()
    ctx.translate(560, 80)
    ctx.fillStyle = "#F5AF5F"
    ctx.arc(0,0,40,0,Math.PI*2)
    ctx.fill()
  ctx.restore()

  // sharp 3
  ctx.save()
    // ctx.strokeStyle = "#3676BB"
    ctx.fillStyle = "#3676BB"
    ctx.beginPath()
    ctx.translate(470, 410)
    ctx.rotate(Math.PI*10/180)
    ctx.moveTo(0,0)
    ctx.lineTo(80,0)
    ctx.rotate(-Math.PI*60/180)
    ctx.lineTo(80,0)
    ctx.closePath()
    // ctx.stroke()
    ctx.fill()
  ctx.restore()

  // sharp 7
  ctx.save()
    ctx.fillStyle = "#E8465D"
    ctx.beginPath()
    ctx.translate(70, 120)
    ctx.rotate(Math.PI*20/180)
    ctx.moveTo(0,0)
    ctx.lineTo(60,0)
    ctx.translate(60, 0)
    ctx.rotate(-Math.PI*90/180)
    ctx.lineTo(50,0)
    ctx.translate(50, 0)
    ctx.rotate(-Math.PI*38/180)
    ctx.lineTo(30,0)
    ctx.translate(30, 0)
    ctx.rotate(-Math.PI*54/180)
    ctx.lineTo(60,0)
    ctx.translate(60, 0)
    ctx.rotate(-Math.PI*64/180)
    ctx.lineTo(60,0)
    ctx.closePath()
    ctx.fill()
  ctx.restore()
  
  // battery
  ctx.save()
    ctx.fillStyle = "#F5AF5F"
    ctx.translate(280, 220)
    ctx.fillRect(0,0,20,4)
    ctx.translate(0, -3)  
    ctx.fillRect(0,0,20,-35)
    ctx.fillStyle = "white"
    ctx.translate(3, -35) 
    ctx.fillRect(0,0,14,-4)
    // -------------------
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.translate(0, 20)
    ctx.moveTo(0,0)
    ctx.lineTo(4,-12)
    ctx.lineTo(6,-4)
    ctx.lineTo(16,-4)
    ctx.lineTo(9,12)
    ctx.lineTo(9,0)
    ctx.closePath()
    ctx.fill()
  ctx.restore()

  requestAnimationFrame(draw)
}

// 頁面載入
function loaded() {
  initCanvas()
  init()
  requestAnimationFrame(draw)
  setInterval(update, 1000/updateFPS)
}

// 載入 縮放的事件
window.addEventListener("load", loaded)



