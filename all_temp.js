// 環境變數
var updateFPS = 30
var showMouse = true
var time = 0
var bgColor = "black"

var controls = {
  value: 0
}

// var gui = new dat.GUI()
// gui.add(controls, "value", -2, 2).step(0.01).onChange(function(value){})

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
var a = new Vec2(3,4)


// -----------------------
var canvas = document.getElementById("mycanvas")
var ctx = canvas.getContext("2d")

ctx.circle = function(v,r) {
  this.arc(v.x, v.y, r, 0, Math.PI*2)
}

ctx.line = function(v1,v2) {
  this.moveTo(v1.x,v2.y)
  this.lineTo(v2.x,v2.y)
}

// canvas設定
function initCanvas() {
  // ww = canvas.width = window.innerWidth
  // wh = canvas.height = window.innerHeight
  // change canvas size
  ww = canvas.width
  wh = canvas.height

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
  
  // ------------------------
  // 在這裡繪製
 //  ctx.save()
	//   ctx.beginPath()
	//   ctx.strokeStyle = "white";
	//   ctx.fillStyle = "white";
	//   ctx.circle( new Vec2(100, 100),10)
	// 	// ctx.stroke()
	// 	ctx.fill()
	// ctx.restore()

	// ctx.arc()
	ctx.fillStyle = "white";
	ctx.fillRect(100,100,20,20)


  // ------------------------
  // 滑鼠
  // ctx.fillStyle = "red"
  // ctx.beginPath()
  // ctx.circle(mousePos,3)
  // ctx.fill()
  
  // ctx.save()
  //   ctx.beginPath()
  //   ctx.translate(mousePos.x, mousePos.y)
  //     ctx.strokeStyle = "red"
  //     let len = 20
  //     ctx.line(new Vec2(-len,0), new Vec2(len, 0))
  //     ctx.fillText(mousePos, 10, -10)
  //     ctx.rotate(Math.PI/2)
  //     ctx.line(new Vec2(-len,0), new Vec2(len, 0))
  //     ctx.stroke()
  // ctx.restore()
  
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
window.addEventListener("resize", initCanvas)

// 滑鼠事件跟紀錄
var mousePos = new Vec2(0,0)
var mousePosDown = new Vec2(0,0)
var mousePosUp = new Vec2(0,0)

window.addEventListener("mousemove", mousemove)
window.addEventListener("mouseup", mouseup)
window.addEventListener("mousedown", mousedown)

function mousemove(evt) {
  mousePos.set(evt.x, evt.y)
  // console.log(mousePos)
}

function mouseup(evt) {
  mousePos.set(evt.x, evt.y)
  mousePosUp = mousePos.clone()
}

function mousedown(evt) {
  mousePos.set(evt.x, evt.y)
  mousePosDown = mousePos.clone()
}