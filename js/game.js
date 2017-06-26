var GUESS_ALLOWED = 7

var generateWinningNumber = function() {
   return Math.floor(Math.random()*1000)+1
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
  if (x>=1 && x<=1000) {
    this.playersGuess = x
    return this.checkGuess()
  } else {
    throw ('That is an invalid guess.')
  }
}

Game.prototype.checkGuess = function () {
  if (this.playersGuess===this.winningNumber){
    $('#hint, #submit').prop("disabled",true)
    $('#subtitle').text('Omg, you are awesome!')
    return 'You Win!'
  }
  if (this.pastGuesses.includes(this.playersGuess)){
    return 'You have already guessed that number.'
  } else {
    this.pastGuesses.push(this.playersGuess)
    $('.guess:contains("-")').first().text(this.playersGuess)
  }

  if (this.pastGuesses.length>GUESS_ALLOWED) {
    $('#hint, #submit').prop("disabled",true)
    $('#subtitle').text('Uh, sometimes this happens too...')
    return 'You Lose.'
  }

  $('#subtitle').text(this.isLower()?'Go Higher!':'Go Lower!')

  switch(true){
    case (this.difference()<10): return 'As close as you can get!!'
    case (this.difference()<20): return 'You\'re erupting lava!'
    case (this.difference()<50): return 'You\'re burning up!'
    case (this.difference()<250): return 'You\'re lukewarm.'
    case (this.difference()<500): return 'You\'re a bit chilly.'
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
            generateWinningNumber(),
            generateWinningNumber()])
}

var newGame = function () {
  return new Game()
}

//Operations
function guessMade(game){
  var guess = $('#input-box').val()
  $('#input-box').val('')
  var output =  game.playersGuessSubmission(parseInt(guess,10))
  $('#title').text(output)
}

$(document).ready(function(){
  var game = newGame()
  $('#submit').on('click',function(){
    guessMade(game)
  })

  $('#input-box').keypress(function(event) {
    if (event.which === 13) guessMade(game)
  })

  $('#hint').click(function() {
    var hints = game.provideHint()
    $('#title').text('The winning number is '+hints[0]+
      ', '+hints[1]+', '+hints[2]+', or '+hints[3]);
    $('#subtitle').text('You can guess at most two more times')
    GUESS_ALLOWED = Math.min(GUESS_ALLOWED, game.pastGuesses.length + 2)
    $('#hint').prop("disabled",true)
  })

  $('#reset').click(function() {
      game = newGame();
      $('#title').text('Take a Guess...');
      $('#subtitle').html('on All Random Things!<br>Guess a number between 1~1000')
      $('.guess').text('-');
      $('#hint, #submit').prop("disabled",false);
  })


})

