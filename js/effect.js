//background 1. matrix
var canvas = document.getElementById('mybackgournds')
canvasW = canvas.width = document.body.clientWidth
canvasH = canvas.height = document.body.clientHeight
var ctx = canvas.getContext('2d')
ctx.globalCompositeOperation = 'lighter';

var chrDrops =
'虎鸫悲啼亦如昔,暮然回首百花残,宛似心慰要无踪,诸神集新世,夜明虎鸫啼,花开向神祈,浮生空自哀,梦已逝,在吾生世,悲运缠身,梦已逝,恨飘离'.replace(/,/g,'').split('')

function Drop(){
  this.x = -50+Math.floor(Math.random()*(canvasW+100))
  this.y = Math.floor(Math.random()*-canvasH*.4)
  this.chrSize = Math.floor(Math.random()*20)+10
  this.speed = this.chrSize*.5
  this.arrStr = this.geneText()
}

Drop.prototype.geneText = function(){
  let arrStr =[]
  for (var j = 0; j <= Math.floor(Math.random()*15)+5; j++) {
    arrStr.push(chrDrops[Math.floor(Math.random()*chrDrops.length)])
  }
  return arrStr
}

Drop.prototype.drawDrop = function(context){
  context.fillStyle='#ffde24'
  for (var i = 0; i < this.arrStr.length; i++) {
    context.fillText(
      this.arrStr[i],
      this.x,
      this.y-i*this.chrSize
    )
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasW, canvasH)
  ctx.shadowOffsetX = ctx.shadowOffsetY = 0
  ctx.shadowBlur = 15
  ctx.shadowColor = '#dddddd'

  for (var k = 0; k < drops.length; k++) {
    ctx.font = drops[k].chrSize+'px ZhengBanQiao' //this is definitely too much
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    if (drops[k].y > canvasH+drops[k].chrSize*drops[k].arrStr.length) {
      drops[k] = new Drop()
      drops[k].y = 0
      drops[k].drawDrop(ctx)
    } else {
      drops[k].drawDrop(ctx)
    }
    drops[k].y += drops[k].speed
  }
  setTimeout(draw, 100)
}


//Actually Drawing!!!
var drops =[];
for (var i = 0; i < 100; i++) {
  drops.push(new Drop())
}
draw();

