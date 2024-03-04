game = (function () {
    let gameState = [[0,0,0],
                     [0,0,0],
                     [0,0,0]];
    const placeToken = (token, x, y) => {
        if (!gameState[y][x]) {
            gameState[y][x] = token;
        } else {
            console.log('invalid placement')
        }
        updateGame()   
    }

    const updateGame  = () => {
        display.update();
        winner = checkWin();

        console.table(game.gameState)
        if (winner) {
            console.log(winner)
        }
    }

    const checkWin = () => {
        //default to DRAW
        let winningToken = ""

        // check horizontal
        for (array of gameState) {
            if (array[0] == array[1] && array[1] == array[2]) {
                winningToken = array[0];
            }
        }

        //check vertical
        for (let i = gameState.length; i > 0; i--) {
            if (gameState[0][i] == gameState[1][i] && gameState[1][i] == gameState[2][i]) {
                winningToken = gameState [0][i]
            }
        }
        
        //check diagonals HARDCODED XD
        if (gameState[0][0] == gameState[1][1] && gameState[1][1] == gameState[2][2]) {
            winningToken = gameState[0][0]
        }

        if (gameState[2][0] == gameState[1][1] && gameState[1][1] == gameState[0][2]) {
            winningToken = gameState[1][1]
        }

        //return
        return winningToken;
    }
    return {gameState, placeToken, checkWin}
})() 

function createPlayer(token) {
    const placeToken = (x,y) => {
        game.placeToken(token, x, y)
    }

    const getToken = () => {
        return token;
    }

    return {getToken, placeToken}
    
}

controller = (function () {
  let turn = [];

    // could become infinite players with 
    // const players = []
    const player1 = createPlayer('X') 
    const player2 = createPlayer('O')
    const startGame = () => {
        turn.push(player1);
        display.update();
    }
    return {player1, turn, player2, startGame}
}())

display = (function () {
    const player1 = document.querySelector('.player1').style
    const player2 = document.querySelector('.player2').style

    const update = () => {
        renderBoard();
        player1.backgroundColor = 'green';
        player2.backgroundColor = 'red'
    }
    
    const renderBoard = () => {
      table = document.querySelector('.game-table')
      table.style.backgroundColor = "gray"
      
    // clear table
    while (table.firstChild) {
      table.firstChild.remove();
    }

    for (row of game.gameState) {
      let tableRow = document.createElement('tr');
      table.appendChild(tableRow)
      for (cell of row) {
        let tableCell = document.createElement('td')
        tableCell.textContent = cell; 
        tableRow.appendChild(tableCell);
      }
    }
  }
    return {update}
}())
console.table(game.gameState)
controller.startGame();
