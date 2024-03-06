startButton = document.querySelector('.start-button')


game = (function () {
    let state = [['','',''],
    ['','',''],
    ['','','']];
    let turn = "player1";

    const resetState = () => {
        state = [['','',''],['','',''],['','','']];
    }

    const getState = () => {
        return state
    }
    
    const placeToken = (token, x, y) => {
        if (!state[y][x] && active) {
            state[y][x] = token;
            swapTurn();
        } else {
            console.log('invalid placement')
        }
        update()
    }
    
    let active = false;
    
    const isActive = () => {
        return active;
    }

    const setActive = (bool) => {
        if (typeof bool == 'boolean') {
            active = bool
        }
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

    let winner;
    
    const getWinner = () => {
        return winner
    }

    const resetWinner = () => {
        winner = undefined;
    }
    const update  = () => {
        display.update();
        winner = checkWin();
        
        if (winner) {
            setActive(false)
            console.log('Winner is:', winner)
            display.update()
        }
    }
    
    const checkWin = () => {
        //default to DRAW
        let winningToken;
        
        console.log(state)
        console.log("starter winning token:", winningToken)
        // check horizontal
        for (array of state) {
            if ((array[0] == array[1] && array[1] == array[2]) && array[0]) {
                winningToken = array[0];
                console.log("epic hor token:", winningToken)
            }
        }
        
        //check vertical
        for (let i = 0; i < state.length; i++) {
            console.log('column:', i + 1)
            if ((state[0][i] == state[1][i] && state[1][i] == state[2][i]) && state[0][i]) {
                winningToken = state[0][i]
                console.log("epic vert token:", winningToken)
            }
        }
        
        //check diagonals HARDCODED XD
        if ((state[0][0] == state[1][1] && state[1][1] == state[2][2]) && state[0][0]) {
            winningToken = state[0][0]
            console.log('epic diag token:', winningToken)
        }
        
        if ((state[2][0] == state[1][1] && state[1][1] == state[0][2]) && state[1][1]) {
            winningToken = state[1][1]
            console.log('epic diag token:', winningToken)
        }
        
        //return
        return winningToken;
    }
    return {state, resetState, getState, placeToken, checkWin, getCurrentToken, getTurn, update, isActive, setActive, getWinner, resetWinner}
})()

function createPlayer(token) {
    const placeToken = (x,y) => {
        game.placeToken(token, x, y)
        game.swapTurn();
        game.update();
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
        console.log(game.state) 
        game.resetState();
        console.log(game.state) 
        game.setActive(true);
        game.resetWinner();
        display.update();
    }
    return {player1, player2, startGame}
}())

display = (function () {
    const player1 = document.querySelector('.player1')
    const player2 = document.querySelector('.player2')
    
    const update = () => {
        renderBoard();
        renderPlayers();
        renderMessage();
    }
    
    const renderPlayers = () => {
        if (game.getTurn() == "player1") {
            console.log()
            player1.style.backgroundColor = "green"
            player2.style.backgroundColor = "red"
        } else {
            player2.style.backgroundColor = "green"
            player1.style.backgroundColor = "red"
        }
    }

    const renderMessage = () => {
        messagebox = document.querySelector('.message')
        console.log(game.getWinner())
        if (game.getWinner()) {
            messagebox.innerText = 'And the winner is: ' + game.getWinner();
        } else {
            messagebox.innerText = ''
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
            for (cell in game.getState()[row]) {
                let tableCell = document.createElement('td')
                tableCell.textContent = game.getState()[row][cell];
                
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
startButton.addEventListener('click', controller.startGame)
