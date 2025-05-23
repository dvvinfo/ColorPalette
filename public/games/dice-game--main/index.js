document.addEventListener('DOMContentLoaded', function () {
  var refreshButton = document.querySelector('.refresh-button')
  refreshButton.addEventListener('click', refresh)
})

// --- postMessage integration start ---
window.addEventListener('message', function (event) {
  if (event.data && event.data.type === 'PLAY_DICE') {
    window._diceBet = typeof event.data.bet === 'number' ? event.data.bet : 0
    refresh()
  }
})
// --- postMessage integration end ---

function refresh() {
  var randomNumber1 = Math.floor(Math.random() * 6) + 1
  var randomImageSource1 = 'images/dice' + randomNumber1 + '.png'
  var dice1 = document.querySelectorAll('img')[0]
  dice1.setAttribute('src', randomImageSource1)

  var randomNumber2 = Math.floor(Math.random() * 6) + 1
  var randomImageSource2 = 'images/dice' + randomNumber2 + '.png'
  var dice2 = document.querySelectorAll('img')[1]
  dice2.setAttribute('src', randomImageSource2)

  var result = 'draw'
  var winAmount = 0
  if (randomNumber1 > randomNumber2) {
    document.querySelector('h1').innerHTML = '🚩 Player 1 Wins!'
    result = 'win'
    winAmount = window._diceBet || 0
  } else if (randomNumber1 < randomNumber2) {
    document.querySelector('h1').innerHTML = 'Player 2 Wins! 🚩'
    result = 'lose'
  } else {
    document.querySelector('h1').innerHTML = 'Draw!'
    result = 'draw'
  }
  // --- postMessage result ---
  window.parent.postMessage(
    {
      type: 'DICE_RESULT',
      result: result,
      winAmount: winAmount,
    },
    '*',
  )
  // --- postMessage result end ---
}
