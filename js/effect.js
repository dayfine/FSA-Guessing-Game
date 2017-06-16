//background 1. matrix
var canvas = document.getElementById('mybackgournds')
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight
canvasW = canvas.width;
canvasH = canvas.height;
var ctx = canvas.getContext('2d')
ctx.globalCompositeOperation = 'lighter';

var drops =[];
for (var i = 0; i < Math.random()*25+50; i++) {
  drops.push(new Drop())
}

var letterDrops = ['0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','0','1','诸','神','集','新','世','夜','明','虎','鸫','啼','花','开','向','神','祈','浮','生','空','自','哀','梦','逝','恨','飘','零']

draw();


function Drop(whatever){
  this.x = Math.floor(Math.random()*canvasW);
  this.y = Math.floor(Math.random()*-50)-75;
  this.size = Math.floor(Math.random()*10)+15;
  this.speed = this.size/2;
}

function drawDrop(x,y, size){
  for (var j = 0; j <= Math.random()*20+20; j++) {
    var chr = letterDrops[Math.floor(Math.random()*letterDrops.length)]
    ctx.fillStyle='#000000'
    ctx.fillText(chr, x, y)
    y -= size;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  //ctx.shadowOffsetX = ctx.shadowOffsetY = 0
  //ctx.shadowBlur = 10
  //ctx.shadowColor = '#1b8193'

  for (var k = 0; k < drops.length; k++) {
    ctx.font = drops[k].size+'px Matrix Code'
    ctx.textBaseline = 'top'
    ctx.textAlign = 'center'
    if (drops[k].y > canvasH*1.5) {
      drops[k] = new Drop()
      drawDrop(drops[k].x, drops[k].y, drops[k].size)
    } else drawDrop(drops[k].x, drops[k].y, drops[k].size)
    drops[k].y += drops[k].speed
  }
  setTimeout(draw, 100)
}
