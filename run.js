// 環境變數
var updateFPS = 30
var showMouse = true
var time = 0
var bgColor = "#001D2E"
var ww = 0
var wh = 0
var offextX = 0
var degToPi = Math.PI*2/360


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
    // console.log("a1 "+ ww/2 + " " + (wh/2-10))
    // console.log("a2 "+ this.x + " " + this.y)
    return Math.atan2(this.y - (wh/2-10),  this.x - (ww/2+10))
  }
  get unit() {
    return this.mul(1/this.length)
  }
}

class Ship {
  constructor(args) {
    let def = {
      x: 0,
      y: 0,
      r:50,
      deg: 50*degToPi 
    }
    Object.assign(def,args)
    Object.assign(this,def)
  }

  set angle(deg) {
    this.deg = deg
  }
}
class Bullet {
  constructor(args) {
    let def = {
      x: 0,
      y: 0,
      v: {
        x: 5,
        y: 5
      }
    }
    Object.assign(def,args)
    Object.assign(this,def)
  }
  update() {
    this.x+=this.v.x
    this.y+=this.v.y
  }

  draw() {
    ctx.save()
      ctx.translate(this.x, this.y)
      ctx.fillStyle="white"
      ctx.fillRect(0,0,10,10)
    ctx.restore()
  }
}

var ship
var b


// canvas設定
function initCanvas() {
  // ww = canvas.width = window.innerWidth
  // wh = canvas.height = window.innerHeight
  // change canvas size
  // ww = canvas.width
  // wh = canvas.height
  ww = canvas.width = 640
  wh = canvas.height = 480
  offextX = (window.innerWidth -640)/2 ;

}
// initCanvas()

// 邏輯初始化
function init() {
  ship = new Ship({
    deg: 0*degToPi 
  });
  b = new Bullet({
    x: 50,
    y: 50
  })
}

// 遊戲邏輯分析
function update() {
  time++
  // b.update()
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

  // b.draw()

  
  // 砲台
  ctx.save()
    ctx.translate(ww/2+10, wh/2-10)
    ctx.rotate(ship.deg);
    ctx.rotate(Math.PI*90/180)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(0, 0, 40, 0, Math.PI*2)
    ctx.shadowBlur=12
    ctx.shadowColor="white"
    ctx.stroke()

    ctx.lineWidth = 5
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(0,-40)
    ctx.rotate(Math.PI*120/180)
    ctx.moveTo(0,0)
    ctx.lineTo(0,-40)
    ctx.rotate(Math.PI*120/180)
    ctx.moveTo(0,0)
    ctx.lineTo(0,-40)
    ctx.shadowBlur=12
    ctx.shadowColor="white"
    ctx.stroke()

    ctx.lineWidth = 1
    ctx.beginPath()
    for(var i=0;i<30;i++) {
      ctx.beginPath()
      ctx.arc(0, 0, 70, Math.PI*i*12/180, Math.PI*(i*12+8)/180)
      ctx.stroke()
    }
  ctx.restore()
  // 砲口
  ctx.save()
    ctx.translate(ww/2+10, wh/2-10)
    ctx.rotate(ship.deg);
    ctx.rotate(Math.PI*90/180)
    ctx.fillStyle = "white"
    ctx.translate(-9, -68)
    ctx.fillRect(0,0,18,18)
    ctx.fill()
    // ctx.strokeStyle = "white"
    ctx.beginPath()
    ctx.moveTo(0,0)
    ctx.lineTo(4,-18)
    ctx.lineTo(14,-18)
    ctx.lineTo(18,0)
    ctx.closePath()
    ctx.fill()
  ctx.restore()
  // 砲後盾
  ctx.save()
    ctx.translate(ww/2+10, wh/2-10)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(0, 0, 90,  Math.PI*45/180,  Math.PI*135/180)
    ctx.stroke()
  ctx.restore()

  // battery
  ctx.save()
    ctx.fillStyle = "#F5AF5F"
    ctx.translate(510,449)
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

  // bar 
  ctx.save()
    // ctx.lineWidth = 1
    ctx.fillStyle = "#F5AF5F"
    ctx.translate(500, 20)
    ctx.fillRect(0,0,120,10)
  ctx.restore()

  // sharp 7
  ctx.save()
    ctx.translate(120, 350)
    ctx.fillStyle = "#E8465D"
    ctx.beginPath()
    // ctx.translate(70, 120)
    ctx.rotate(Math.PI*20/180)
    ctx.moveTo(0,0)
    ctx.lineTo(30,0)
    ctx.translate(30, 0)
    ctx.rotate(-Math.PI*90/180)
    ctx.lineTo(25,0)
    ctx.translate(25, 0)
    ctx.rotate(-Math.PI*38/180)
    ctx.lineTo(15,0)
    ctx.translate(15, 0)
    ctx.rotate(-Math.PI*54/180)
    ctx.lineTo(30,0)
    ctx.translate(30, 0)
    ctx.rotate(-Math.PI*64/180)
    ctx.lineTo(30,0)
    ctx.closePath()
    ctx.fill()
    // -------------------
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.rotate(Math.PI*60/180)
    ctx.translate(-20, -20)
    ctx.moveTo(0,0)
    ctx.lineTo(4,-12)
    ctx.lineTo(6,-4)
    ctx.lineTo(16,-4)
    ctx.lineTo(9,12)
    ctx.lineTo(9,0)
    ctx.closePath()
    ctx.fill()
  ctx.restore()

  // arc
  ctx.save()
    ctx.beginPath()
    ctx.translate(100, 235)
    ctx.fillStyle = "#F5AF5F"
    ctx.arc(0,0,25,0,Math.PI*2)
    ctx.fill()
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(0,14,3,0,Math.PI*2)
    ctx.arc(-15,-5,3,0,Math.PI*2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(18,-5,3,0,Math.PI*2)
    ctx.fill()   
  ctx.restore()

  // sharp 3
  ctx.save()
    ctx.fillStyle = "#3676BB"
    ctx.beginPath()
    ctx.translate(490, 180)
    ctx.rotate(Math.PI*10/180)
    ctx.moveTo(0,0)
    ctx.lineTo(50,0)
    ctx.rotate(-Math.PI*60/180)
    ctx.lineTo(50,0)
    ctx.closePath()
    ctx.fill()

    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.translate(15, 14)
    ctx.rotate(Math.PI*60/180)
    ctx.moveTo(0,0)
    ctx.lineTo(10,0)
    ctx.rotate(-Math.PI*60/180)
    ctx.lineTo(10,0)
    ctx.closePath()
    ctx.fill()

  ctx.restore()

  //king hat
  ctx.save()
    // ctx.rotate(-Math.PI*30/180)
    ctx.fillStyle = "white"
    ctx.translate(420,360)
    ctx.rotate(-Math.PI*30/180)
    ctx.fillRect(0,0,50,35)
    ctx.beginPath()
    ctx.strokeStyle = "#001D2E";
    lineWidth = 2
    ctx.arc(25, 10, 4, 0, Math.PI*2)
    ctx.moveTo(0,10)
    ctx.lineTo(22,10)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(28,10)
    ctx.lineTo(50,10)
    ctx.stroke()

    ctx.fillStyle = "#F5AF5F"
    ctx.moveTo(16,28)
    ctx.lineTo(34,28)
    ctx.lineTo(34,18)
    ctx.lineTo(29,23)
    ctx.lineTo(25,18)
    ctx.lineTo(20,23)
    ctx.lineTo(16,18)
    ctx.closePath()
    ctx.fill()
  ctx.restore()

  // 盾牌
  ctx.save()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.translate(500,230)
    // ctx.arc(0, 0, 80, 0, Math.PI*2)
    ctx.arc(0, 0, 50, Math.PI*61/180, Math.PI*84/180)
    ctx.stroke()
    ctx.beginPath()
    ctx.translate(50,0)
    ctx.arc(0, 0, 50, Math.PI*96/180, Math.PI*121/180)
    ctx.stroke()
    ctx.beginPath()
    ctx.translate(-25,60)
    ctx.arc(0, 0, 12, Math.PI*40/180, Math.PI*150/180)
    ctx.stroke()

    ctx.beginPath()
    ctx.translate(10,-16)
    ctx.arc(0, 0, 30, Math.PI*120/180, Math.PI*170/180)
    ctx.stroke()

    ctx.beginPath()
    ctx.translate(-20,0)
    ctx.arc(0, 0, 30, Math.PI*10/180, Math.PI*60/180)
    ctx.stroke()

    ctx.beginPath()
    ctx.translate(10,14)
    ctx.beginPath()
    ctx.moveTo(0,-8)
    ctx.lineTo(0,8)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(-4,-2)
    ctx.lineTo(4,-2)
    ctx.stroke()
    
    ctx.lineWidth = 1
    ctx.strokeStyle = "rgba(255,255,255,0.2)"
    ctx.beginPath()
    ctx.arc(0, 0, 30, 0, Math.PI*2)
    ctx.stroke()
  ctx.restore()

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
  mousePos.set(evt.x-offextX, evt.y)
  ship.deg = mousePos.angle;
  // console.log(mousePos)
  // console.log(mousePos.angle)
}

function mouseup(evt) {
  mousePos.set(evt.x, evt.y)
  mousePosUp = mousePos.clone()
}

function mousedown(evt) {
  mousePos.set(evt.x, evt.y)
  mousePosDown = mousePos.clone()
}