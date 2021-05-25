

// Module for TTT board
var gameBoardModule = (function() {
    let gameBoard = [];
    let gameModule = {};

    let space = document.querySelectorAll('td');

    const boardSpaces = Array.from(space);
    gameBoard.push(boardSpaces);

    


    
    
    return gameModule;
})();
    
    






// Function Factories for 'X' + 'O' Player Markers

// Marker for 'X'

const PlayerX = () => {
    let space = document.querySelectorAll('td');
    let boardSpaces = Array.from(space);
    
    function turnOrder(e) {

        function spaceSelectionX(e) {
            e.target.style.cssText = 'color: rgb(51, 172, 202);';
            e.target.textContent = 'X';
            
        };
        
        

        spaceSelectionX(e);
    }
    
    space.forEach(space => space.addEventListener('click', turnOrder));

    return {spaceSelectionX}
}


// Marker for 'O'

const PlayerO = () => {
    let space = document.querySelectorAll('td');

    function spaceSelectionO(e) {
      
        e.target.textContent = 'O';
    };
    
    space.forEach(space => space.addEventListener('click', spaceSelectionO));

    return {spaceSelectionO}
}





// ---- Marker Selection ------

// FIRST PLAYER 
const firstPlayer = PlayerX();
firstPlayer.spaceSelectionX();

// COMPUTER
const computer = PlayerO();
computer.spaceSelectionO(e);

// LOGIC FOR TURN ORDER

