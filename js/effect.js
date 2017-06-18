//background 1. matrix
var canvas = document.getElementById('mybackgournds')
canvasW = canvas.width = document.body.clientWidth
canvasH = canvas.height = document.body.clientHeight
var ctx = canvas.getContext('2d')
ctx.globalCompositeOperation = 'lighter';

var letterDrops = ['0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','诸','神','集','新','世','夜','明','虎','鸫','啼','花','开','向','神','祈','浮','生','空','自','哀','梦','逝','恨','飘','零']

var drops =[];
for (var i = 0; i < 72; i++) {
  var newdrop = new Drop()
  newdrop.arrString = generaText()
  drops.push(newdrop)
}



draw();


function Drop(whatever){
  this.x = -50+Math.floor(Math.random()*(canvasW+100));
  this.y = Math.floor(Math.random()*-canvasH*.4);
  this.size = Math.floor(Math.random()*8)+16;
  this.speed = this.size/1.667;
  this.arrString = [];
}

function generaText(){
  let arrString =[]
  for (var j = 0; j <= Math.random()*17+8; j++) {
    arrString.push(letterDrops[Math.floor(Math.random()*letterDrops.length)])
  }
  return arrString
}

function drawDrop(x, y, size, arrString){
  ctx.fillStyle='#1153CE'
  for (var i = 0; i < arrString.length; i++) {
    ctx.fillText(arrString[i], x, y-i*size)
  }
}

function draw() {
  ctx.clearRect(0, 0, canvasW, canvasH)
  //ctx.shadowOffsetX = ctx.shadowOffsetY = 0
  //ctx.shadowBlur = 10
  //ctx.shadowColor = '#1b8193'

  for (var k = 0; k < drops.length; k++) {
    ctx.font = drops[k].size+'px Matrix Code'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    if (drops[k].y > canvasH+drops[k].size*drops[k].arrString.length) {
      drops[k] = new Drop()
      drops[k].y = 0
      drops[k].arrString = generaText()
      drawDrop(drops[k].x, drops[k].y, drops[k].size, drops[k].arrString)
    } else drawDrop(drops[k].x, drops[k].y, drops[k].size, drops[k].arrString)
    drops[k].y += drops[k].speed
  }
  setTimeout(draw, 100)
}
