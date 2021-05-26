/* 

                                    PRINTING NODE / ARRAY INDEX POSITIONS

    From this project I've learned that in order to print the index of a nodelist or array on eventlistener
    you need to be sure that what is calling the function in which the loop resides, is an event listener.
    You CANNOT call the function directly and get it to work. It has to be called BY the event listener. It 
    seems to me that, the event listener gives the loop the information needed to be able to effectively
    identify the proper index when requested. Whereas when you just call the function, there is a disconnect, and
    the information needed isn't conveyed properly.
    
    You CANNOT use an event listener to call a function that will then call your looping function. You have to call
    the looping function directly with an event listener
    
*/

let gameBoard = [];

// separates the NodeList of 'spaces' into 9 individual array places in the 'gameBoard' array

function singleSpace() {
    let spaces = document.querySelectorAll('td');
    
    for (i=0;i<spaces.length;i++) {
        gameBoard.push(spaces[i]);
    }
}
singleSpace();



// takes the clicked table data element and assigns it the proper index, which can then be used later
function scoring() {
    
    let spaces = document.querySelectorAll('td');
    
    for (var i=0; i<spaces.length; i++) {
        (function(i) {
            spaces[i].index = i;
            spaces[i].addEventListener('click', function() {
            });
        })(i);
    }
    
    scoreTrack(this.index);

}      

// logic behind wins and lose and draw

function scoreTrack(index) {
    spaces = document.querySelectorAll('td');
    console.log(index);
    let trackWin = true;

    if (trackWin === true) {

    switch(true) {
        // middle row
        case gameBoard[3].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[5].textContent === 'X':
            console.log("X's Won!");
            firstPlayer.testSwitch();
        break;
        case gameBoard[3].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[5].textContent == 'O':
            console.log("O's Won!");
            computer.testSwitch();
        break;
        // top row
        case gameBoard[0].textContent === 'X' && gameBoard[1].textContent === 'X' && gameBoard[2].textContent == 'X':
            console.log("X's Won!");
                firstPlayer.testSwitch();

            trackWin = false;
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[1].textContent === 'O' && gameBoard[2].textContent == 'O':
            console.log("O's Won!");
            computer.testSwitch();
            trackWin = false;
        break;
        // bottom row
        case gameBoard[6].textContent === 'X' && gameBoard[7].textContent === 'X' && gameBoard[8].textContent == 'X':
            console.log("X's Won!");
            firstPlayer.testSwitch();
            trackWin = false;
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[7].textContent === 'O' && gameBoard[8].textContent == 'O':
            console.log("O's Won!");
            computer.testSwitch();
            trackWin = false;
        break;
        // left column
        case gameBoard[0].textContent === 'X' && gameBoard[3].textContent === 'X' && gameBoard[6].textContent == 'X':
            console.log("X's Won!");
            firstPlayer.testSwitch();
            trackWin = false;
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[3].textContent === 'O' && gameBoard[6].textContent == 'O':
            console.log("O's Won!");
            computer.testSwitch();
            trackWin = false;
        break;
        // middle column
        case gameBoard[1].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[7].textContent == 'X':
            console.log("X's Won!");
            firstPlayer.testSwitch();
            trackWin = false;
        break;
        case gameBoard[1].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[7].textContent == 'O':
            console.log("O's Won!");
            computer.testSwitch();
            trackWin = false;
        break;
        // right column
        case gameBoard[2].textContent === 'X' && gameBoard[5].textContent === 'X' && gameBoard[8].textContent == 'X':
            console.log("X's Won!");
            firstPlayer.testSwitch();
            trackWin = false;
        break;
        
        case gameBoard[2].textContent === 'O' && gameBoard[5].textContent === 'O' && gameBoard[8].textContent == 'O':
            console.log("O's Won!");
            computer.testSwitch();
            trackWin = false;
        break;
        // top left to bottom right diagonal
        case gameBoard[0].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[8].textContent == 'X':
            console.log("X's Won!");
            firstPlayer.testSwitch();
            trackWin = false;
        break;
        case gameBoard[0].textContent == 'O' && gameBoard[4].textContent == 'O' && gameBoard[8].textContent == 'O':
            console.log("O's Won!");
            computer.testSwitch();
            trackWin = false;
        break;
        // top right to bottom left diagonal
        case gameBoard[6].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[2].textContent === 'X':
            console.log("X's Won!");
            firstPlayer.testSwitch();
            trackWin = false;
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[2].textContent === 'O':
            console.log("O's Won!");
            computer.testSwitch();
            trackWin = false;
        break;      
    }

} else if (trackWin === false) {
    console.log("game over");
}
    
}     



// Module for tracking wins and ties
var Scoring = (function(e) {
    let gameBoard = [];
    let gameModule = {};
    
    return gameModule;
})();





// Module for TTT board rules
var GBModule = (function() {
// private variables   
let gameBoard = [];
let gameModule = {};
let turn = true;

// collection of board spaces 
let space = document.querySelectorAll('td');
const boardSpaces = Array.from(space);
gameBoard.push(boardSpaces);

// player markers
gameModule.spaceSelectionX = function (e) {
    e.target.textContent = 'X';
    e.target.style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 100px;';
    gameBoard.push(e);
    
    
}

gameModule.spaceSelectionO = function (e) {
    e.target.style.cssText = 'color: rgb(255, 255, 255); margin: 0px; padding: 0px; font-size: 100px;';
    e.target.textContent = 'O';
    gameBoard.push(e)
    
}


    
// function for forcing turn order

gameModule.turn = function (e) {
    let space = document.querySelectorAll('td');
    let boardSpaces = Array.from(space);
    
    switch (true) {
        case turn == true:
            GBModule.spaceSelectionX(e);
            turn = false;
            break;
            
            case turn == false:
                GBModule.spaceSelectionO(e);
                turn = true;
                break;
            }
        }
        
        return gameModule;
        
    })();
    
    
    
    
    
        

// Function Factories for 'X' + 'O' Player Markers

// Marker for 'X'
const PlayerX = () => {
    let space = document.querySelectorAll('td');
    let markerLimit = true;
    space.forEach(space => space.addEventListener('click', turnOrder));

    function testSwitch() {
        space.forEach(space => space.removeEventListener('click', turnOrder));
        
        markerLimit = false;
        console.log(markerLimit);
    }
      
    
    
    function turnOrder(e) { 
        GBModule.turn(e);
        space.forEach(space => space.addEventListener('click', scoring));

}   
return {turnOrder, testSwitch}
}
    
    
// Marker for 'O'!
const PlayerO = () => {
    let space = document.querySelectorAll('td');
    let markerLimit = true;
    space.forEach(space => space.addEventListener('click', turnOrder));

    function testSwitch() {
        space.forEach(space => space.removeEventListener('click', turnOrder));
        markerLimit = false;
    }        
    
    function turnOrder(e) {   
        GBModule.turn(e);
        space.forEach(space => space.addEventListener('click', scoring));
        
    }   
    return {testSwitch, turnOrder}
}
    
// ---- Marker Selection ------

// FIRST PLAYER 
const firstPlayer = PlayerX();
firstPlayer.turnOrder();
firstPlayer.testSwitch();
// COMPUTER

const computer = PlayerO();
computer.turnOrder();
computer.testSwitch();
// LOGIC FOR TURN ORDER
        
    

        
function test() {
    console.log("git test");
}
        
        
        
        
        
        
        
        
        
   