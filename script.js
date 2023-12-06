const cells = document.querySelectorAll(".cell")
const playerTurnText = document.querySelector("#playerTurnText")
const winnerText = document.querySelector("#winnerText")
const resetBtn = document.querySelector('#resetBtn')
const xWinNumberText = document.querySelector('#xWinNumberText')
const oWinNumberText = document.querySelector('#oWinNumberText')

const allWinCon = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let playedMoves = ["", "", "", "", "", "", "", "", "",]
let currentPlayer = "X"

let gameWin = false

let numberOfXwins = 0
let numberOfOwins = 0

startGame()
displayCurrentPlayer(currentPlayer)

function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', function myClick() {
            if(gameWin === false) {
                cell.textContent = currentPlayer
                trackPlayerMove(cell)
                checkWinner()
                changePlayer()
                displayCurrentPlayer(currentPlayer)
                cell.removeEventListener('click', myClick)
            }
        })
    })
}

function displayCurrentPlayer(currentPlayer) {
    playerTurnText.textContent = currentPlayer
}

//keeps track of played moves by taking cell index and putting it in the corresponding spot in the playedMoves Array
function trackPlayerMove(cell) {
    let cellIndex = cell.getAttribute("cellIndex")
    if(playedMoves[cellIndex] === "") {
        playedMoves[cellIndex] = currentPlayer
    }
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X"
}


function checkWinner() {
    for (let i = 0; i < allWinCon.length; i++) {
        let winCon = allWinCon[i]
        let cellA = playedMoves[winCon[0]]
        let cellB = playedMoves[winCon[1]]
        let cellC = playedMoves[winCon[2]]
        if(cellA === "" ||cellC === "" ||cellC === "") {
            continue
        } 
        else if(cellA === cellB && cellB === cellC) {
            gameWin = true
            winnerText.textContent = `${currentPlayer} won`
            tallyWins(currentPlayer)
            break
        } 
        else if(!playedMoves.includes("")) {
            gameWin = true
            winnerText.textContent = `${currentPlayer} won`
            tallyWins(currentPlayer)
            break
        }
    }
}

resetBtn.addEventListener('click', resetGame)


function resetGame() {
    playedMoves = ["", "", "", "", "", "", "", "", "",]
    currentPlayer = "X"
    cells.forEach(cell => {
        cell.textContent = ""
    })
    gameWin = false
    winnerText.textContent = ""
    playerTurnText.textContent = "X"
    startGame()

}

function tallyWins(currentPlayer) {
    if(currentPlayer === "X") {
        numberOfXwins += 1
        xWinNumberText.textContent = numberOfXwins
    }
    else {
        numberOfOwins += 1
        oWinNumberText.textContent = numberOfOwins
    }
}
