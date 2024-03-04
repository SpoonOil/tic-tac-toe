game = (function () {
    let state = [['','',''],
                     ['','',''],
                     ['','','']];
    let turn = "player1";
    const placeToken = (token, x, y) => {
        if (!state[y][x]) {
            state[y][x] = token;
            swapTurn();
        } else {
            console.log('invalid placement')
        }
        updateGame()   
    }
    
    const swapTurn = () => {
        if (turn == "player1") {
            turn = "player2"
        } else {
          turn = "player1"
        }
    }

    const getCurrentToken = () => {
        if (turn == "player1") {
            return controller.player1.getToken();
        } else {
            return controller.player2.getToken();
        }
    }
    
    const getTurn = () => {
      return turn;
  }
    const updateGame  = () => {
        display.update();
        winner = checkWin();

        console.table(game.state)
        if (winner) {
            console.log(winner)
        }
    }

    const checkWin = () => {
        //default to DRAW
        let winningToken = ""

        // check horizontal
        for (array of state) {
            if (array[0] == array[1] && array[1] == array[2]) {
                winningToken = array[0];
            }
        }

        //check vertical
        for (let i = state.length; i > 0; i--) {
            if (state[0][i] == state[1][i] && state[1][i] == state[2][i]) {
                winningToken = state [0][i]
            }
        }
        
        //check diagonals HARDCODED XD
        if (state[0][0] == state[1][1] && state[1][1] == state[2][2]) {
            winningToken = state[0][0]
        }

        if (state[2][0] == state[1][1] && state[1][1] == state[0][2]) {
            winningToken = state[1][1]
        }

        //return
        return winningToken;
    }
    return {state, placeToken, checkWin, getCurrentToken, getTurn}
})() 

function createPlayer(token) {
    const placeToken = (x,y) => {
        game.placeToken(token, x, y)
        game.swapTurn();
        display.update();
    }

    const getToken = () => {
        return token;
    }

    return {getToken, placeToken}
    
}

controller = (function () {

    // could become infinite players with 
    // const players = []
    const player1 = createPlayer('X') 
    const player2 = createPlayer('O')
    const startGame = () => {
        display.update();
    }
    return {player1, player2, startGame}
}())

display = (function () {
    const player1 = document.querySelector('.player1').style
    const player2 = document.querySelector('.player2').style

    const update = () => {
        renderBoard();
        console.log(game.turn)
        renderPlayers();
    }
    
    const renderPlayers = () => {
      if (game.getTurn() == "player1") {
        player1.backgroundColor = "green"
        player2.backgroundColor = "red"
      } else {
        player2.backgroundColor = "green"
        player1.backgroundColor = "red"
      }
    }
    const renderBoard = () => {
      table = document.querySelector('.game-table')
      table.style.backgroundColor = "gray"
      
    // clear table
    while (table.firstChild) {
      table.firstChild.remove();
    }

    for (row in game.state) {
      let tableRow = document.createElement('tr');
      table.appendChild(tableRow)
      for (cell in game.state[row]) {
        let tableCell = document.createElement('td')
        tableCell.textContent = game.state[row][cell];
        
        //IIFE for cell data
        (function(cell, row) {
          const handleClick = function (e) {
            game.placeToken(game.getCurrentToken(), cell, row)
          };
          tableCell.addEventListener('click', handleClick);
        })(cell, row)

        tableCell.className = "table-cell"
        tableRow.appendChild(tableCell);
      }
    }
  }
    return {update}
}())
console.table(game.state)
controller.startGame();
