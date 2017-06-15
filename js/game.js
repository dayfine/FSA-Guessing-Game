var generateWinningNumber = function() {
   return Math.floor(Math.random()*100)+1
}

var shuffle = function (arr) {
  var m=arr.length, t, i
  while(m){
    i = Math.floor(Math.random()*m--)
    t = arr[m]
    arr[m]=arr[i]
    arr[i]=t
  }
  return arr
}


var Game = function() {
  this.playersGuess = null
  this.pastGuesses = []
  this.winningNumber = generateWinningNumber()
}

Game.prototype.playersGuessSubmission = function (x) {
  if (x>=1 && x<=100) {
    this.playersGuess = x
    return this.checkGuess()
  } else {
    throw ('That is an invalid guess.')
  }
}

Game.prototype.checkGuess = function () {
  if (this.playersGuess===this.winningNumber){
    return 'You Win!'
  }
  if (this.pastGuesses.includes(this.playersGuess)){
    return 'You have already guessed that number.'
  }

  this.pastGuesses.push(this.playersGuess)
  if (this.pastGuesses.length>4) return 'You Lose.'

  switch(true){
    case (this.difference()<10): return 'You\'re burning up!'
    case (this.difference()<25): return 'You\'re lukewarm.'
    case (this.difference()<50): return 'You\'re a bit chilly.'
    default: return 'You\'re ice cold!'
  }
}

Game.prototype.difference = function () {
  return Math.abs(this.playersGuess-this.winningNumber)
}

Game.prototype.isLower = function () {
  return this.playersGuess<this.winningNumber
}

Game.prototype.provideHint = function () {
  return shuffle([this.winningNumber,
            generateWinningNumber(),
            generateWinningNumber()])
}

var newGame = function () {
  return new Game()
}



