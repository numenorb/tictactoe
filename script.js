
const gameBoardCells = document.querySelectorAll('.cell');
const cellOne = document.querySelector('#cell-one');
const cellTwo = document.querySelector('#cell-two');
const cellThree = document.querySelector('#cell-three');
const cellFour = document.querySelector('#cell-four');
const cellFive = document.querySelector('#cell-five');
const cellSix = document.querySelector('#cell-six');
const cellSeven = document.querySelector('#cell-seven');
const cellEight = document.querySelector('#cell-eight');
const cellNine = document.querySelector('#cell-nine');
const resultsDisplay = document.querySelector('#results-display');
const currentPlayer = document.querySelector('#current-player');
const resetButton = document.querySelector('#reset-game');
const playAgainSection = document.querySelector('#play-again');
const playAgainButton = document.querySelector('#play-again-button');
const winnerText = document.querySelector('#winner-text');
const screen = document.querySelector('#screen');
const computerOrPlayer = document.querySelector('#player-computer'); // if checked, play computer, unchecked 2 player
const allCells = document.querySelectorAll('.cell');

let cellOneValue = parseInt(cellOne.getAttribute('value'));
let cellTwoValue = parseInt(cellTwo.getAttribute('value'));
let cellThreeValue = parseInt(cellThree.getAttribute('value'));
let cellFourValue = parseInt(cellFour.getAttribute('value'));
let cellFiveValue = parseInt(cellFive.getAttribute('value'));
let cellSixValue = parseInt(cellSix.getAttribute('value'));
let cellSevenValue = parseInt(cellSeven.getAttribute('value'));
let cellEightValue = parseInt(cellEight.getAttribute('value'));
let cellNineValue = parseInt(cellNine.getAttribute('value'));


let boardStatusArray = [];
let currentGuessSymbol = 'X';
let currentGuessValue = 1;

window.addEventListener('load', () => {
    refreshValues(true);
    resetCellValues();
});


computerOrPlayer.addEventListener('change', () =>{
    refreshValues(true);
})

resetButton.addEventListener('click', () =>{
    refreshValues(true);
})

playAgainSection.addEventListener('click', () => {
    refreshValues(true);
    resultsDisplay.innerText = ``;
    playAgainSection.style.display = 'none';
    screen.style.display = 'none';
})

for (let i = 0; i < gameBoardCells.length; i++){
    gameBoardCells[i].addEventListener('click', () =>{
        let cellDisplay = document.querySelector(`#${gameBoardCells[i].id} > p`);
        if (cellDisplay.innerText === ''){
            cellDisplay.innerText = currentGuessSymbol; 
            currentGameArray[i] = currentGuessSymbol; // on computer play, this is not setting to computers choice, but display is working.
            gameBoardCells[i].setAttribute('value', currentGuessValue); //this is currently working
            playGame();
        }
    });
}




const playGame = () =>{
    currentPlayer.innerText = `Current Player: ${currentGuessSymbol}`; // this is showing who played last instead of who is next.
    refreshValues(false);
    if (computerOrPlayer.checked){
        computerPlays(1); 
    } else{
        currentGuessSymbol = boardStatus.changeSymbol();
        currentGuessValue = boardStatus.changeValue();
    }
    boardStatus.isWinner(boardStatus.makeBoardArray()); 

    
}



const boardStatus = (() =>{
    const makeBoardArray = () => {
        array = [];
        array.push(
        sumRowColumn(cellOneValue, cellTwoValue, cellThreeValue),
        sumRowColumn(cellFourValue, cellFiveValue, cellSixValue),
        sumRowColumn(cellSevenValue, cellEightValue, cellNineValue),
        sumRowColumn(cellOneValue, cellFourValue, cellSevenValue),
        sumRowColumn(cellTwoValue, cellFiveValue, cellEightValue),
        sumRowColumn(cellThreeValue, cellSixValue, cellNineValue),
        sumRowColumn(cellOneValue, cellFiveValue, cellNineValue),
        sumRowColumn(cellThreeValue, cellFiveValue, cellSevenValue)
        );
        return array;
        }
    const changeSymbol = () =>{
        return (currentGuessSymbol ==='X' ? 'O' : 'X');
    }
    const changeValue = () =>{
        return (currentGuessValue === 1 ? -1 : 1);
    }
    const isWinner = (array) => {
        for (let i = 0; i < array.length; i++){
            if (array[i] === 3){
                gameOver('X');
            }
            else if (array[i] === -3){
                gameOver('O');
            }
        }
        let allValues = boardStatus.eachCellValue();
        let counter = 0;
        for (let i = 0; i < allValues.length; i++){ //issue, counter is only increasing on 'x' choosing
            if (Math.abs(allValues[i]) === 1){
                counter++;
            }
            if (counter === 9){
                gameOver('tie');
            }
        }

            /** 
            else if (array[i] !== Math.abs(3)){
                let counter = 0;
                for (let i = 0; i < boardStatus.eachCellValue().length; i++){
                    if (boardStatus.eachCellValue()[i] !==0){
                        counter++;
                    }
                    if (counter === 9){
                        gameOver('tie');        
                    }   
                }
            } */
         
    }
    const eachCellValue = () =>{
        let array = []
        array.push(cellOneValue,cellTwoValue,cellThreeValue,cellFourValue,cellFiveValue,cellSixValue,
            cellSevenValue,cellEightValue,cellNineValue);
        return array;
    }

    const resetBoardValues = () => {
        cellOneValue = parseInt(cellOne.getAttribute('value'));
        cellTwoValue = parseInt(cellTwo.getAttribute('value'));
        cellThreeValue = parseInt(cellThree.getAttribute('value'));
        cellFourValue = parseInt(cellFour.getAttribute('value'));
        cellFiveValue = parseInt(cellFive.getAttribute('value'));
        cellSixValue = parseInt(cellSix.getAttribute('value'));
        cellSevenValue = parseInt(cellSeven.getAttribute('value'));
        cellEightValue = parseInt(cellEight.getAttribute('value'));
        cellNineValue = parseInt(cellNine.getAttribute('value'));
    }





    return {makeBoardArray, changeSymbol, changeValue, isWinner, eachCellValue, resetBoardValues};

})()

const gameOver = (winner) =>{
    if (winner == 'tie'){
        resultsDisplay.innerText = `Tie Game, no winner!`;
        winnerText.innerText = `Tie!`;
    } else{
        resultsDisplay.innerText = `${winner} is the winner`;
        winnerText.innerText = `${winner} wins!!`;
    }
    playAgainSection.style.display = 'flex';
    screen.style.display = 'inline-block';
}




const sumRowColumn = (x,y,z) =>{return x+y+z}; //will assign x = 1, y = -1, so if a row or column is === 3 or -3, we have a winner


const refreshValues = (newGame) =>{
    if (newGame){
        for(let i = 0; i < gameBoardCells.length ; i++){
            gameBoardCells[i].setAttribute('value', 0);
            document.querySelector(`#${gameBoardCells[i].id} > p`).innerText = '';
            boardStatusArray = [];
            currentGuessSymbol = 'X';
            currentGuessValue = 1;
            currentGameArray = ["","","","","","","","",""];
            boardStatus.resetBoardValues();

        }
    } else{
        cellOneValue = parseInt(cellOne.getAttribute('value'));
        cellTwoValue = parseInt(cellTwo.getAttribute('value'));
        cellThreeValue = parseInt(cellThree.getAttribute('value'));
        cellFourValue = parseInt(cellFour.getAttribute('value'));
        cellFiveValue = parseInt(cellFive.getAttribute('value'));
        cellSixValue = parseInt(cellSix.getAttribute('value'));
        cellSevenValue = parseInt(cellSeven.getAttribute('value'));
        cellEightValue = parseInt(cellEight.getAttribute('value'));
        cellNineValue = parseInt(cellNine.getAttribute('value'));
    }
}

const computerPlays = (mode) => { // 1 = easy, 2 = normal, 3 = hard
    //let currentBoardValues = boardStatus.makeBoardArray();
    /**let boardValue = currentBoardValues.reduce((a,b) => a + b);
    let currentBoard = [cellOneValue, cellTwoValue, cellThreeValue, cellFourValue, cellFiveValue, cellSixValue,
        cellSevenValue, cellEightValue, cellNineValue];
    let currentBoardVale = currentBoard.reduce((a,b) => a+b);
    for (let i = 0; i < 10; i++){
        console.log(`board[${i}]: ${currentBoard[i]}`);
            return boardValue;
*/
    if (mode === 1){
        let choice = gameBoardCells[easyMode(boardStatus.eachCellValue())].id; //randomly returns an empty cell id "cell-####"
        document.querySelector(`#${choice}`).setAttribute('value', -1);
        document.querySelector(`#${choice} > p`).innerText = 'O';
        resetCellValues();
    }
}
       


//boardStatus.eachCellValue to get values of board
const easyMode = (board) =>{
    let computerOptions = [];
    for (let i = 0;i < board.length; i++){
        if(board[i] === 0 || isNaN(board[i])){
            computerOptions.push(i);
        }
    }
    console.log(computerOptions)
    let computerChoice = Math.floor(Math.random() * computerOptions.length);
    return computerOptions[computerChoice];
}





const gameBoard = (() =>{
    const currentGameBoard = ['','','','','','','','',''];
    // put some code here 
    // return ....
    return {currentGameBoard};
})();

currentGameArray = gameBoard.currentGameBoard;


const resetCellValues = () => {
    cellOneValue = parseInt(cellOne.getAttribute('value'));
    cellTwoValue = parseInt(cellTwo.getAttribute('value'));
    cellThreeValue = parseInt(cellThree.getAttribute('value'));
    cellFourValue = parseInt(cellFour.getAttribute('value'));
    cellFiveValue = parseInt(cellFive.getAttribute('value'));
    cellSixValue = parseInt(cellSix.getAttribute('value'));
    cellSevenValue = parseInt(cellSeven.getAttribute('value'));
    cellEightValue = parseInt(cellEight.getAttribute('value'));
    cellNineValue = parseInt(cellNine.getAttribute('value'));
}



/**
 * TO DO
 * Figure out the basic AI to play vs. computer
 * --- stretch goal, levels of difficulty
 * I didn't make player objects.... 
 */