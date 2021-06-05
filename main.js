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

var myMove = false;
// global copies of both needed arrays
let gameBoard = [];
let gameText = [];

let board = [
    '', '', '',
    '', '', '',
    '', '', ''   
    ];


let ai = 'X';
let human = 'O';
let currentPlayer = human;


// module for game style choice (two players vs each other, or one player vs the computer)
var gameStyle = (function() {

    // variables for PvP and PvE buttons
    let playStyleModal = document.querySelector('.playStyle');
    let gameContainer = document.querySelector('.gameContainer');
    let body = document.querySelector('body');
    let pvp = document.querySelector('.PvP');
    let pve = document.querySelector('.PvE');
    let w = window.innerWidth;


        // event listeners for playStyle modal
        window.addEventListener('load', playStyleOpen);
        pvp.addEventListener('click', playStyleClose);
        pve.addEventListener('click', pveModuleOpen);
        

    

        // modal for playstyle choice (pvp or pve)
    function playStyleOpen() {
        let playStyleModal = document.querySelector('.playStyle');
        let gameContainer = document.querySelector('.gameContainer');
        let body = document.querySelector('body');
        let winnerDeclared = document.querySelector('.declaredWinner');
        let pve = document.querySelector('.pveModal');
        
        body.style.cssText = 'background-color: black;'
        gameContainer.style.cssText = 'transition: all 0.01ms ease; -webkit-transform: scale(.5); -webkit-filter: blur(5px) grayscale(100%);'
        playStyleModal.style.cssText = 'border-radius: 2px'
        pvpModal.style.cssText ="transition: all 0.4s ease; -webkit-transform: scale(.5); -webkit-filter: blur(5px) grayscale(100%);"
        winnerDeclared.style.cssText = 'display: none; transition: all 0.4s ease; -webkit-transform: scale(.5);';    
        pve.style.cssText = 'display: none;'
    
    }
    
    function playStyleClose() {
        let playStyleModal = document.querySelector('.playStyle');
        let gameContainer = document.querySelector('.gameContainer');
        let body = document.querySelector('body');
        let first = document.querySelector('.first');
        let second = document.querySelector('.second');
        first.value = '';
        second.value = '';

        gameContainer.style.cssText = 'transition: all 0.4s ease; -webkit-transform: scale(1); -webkit-filter: blur(0px) grayscale(0px); background-color: white;'
        body.style.cssText = 'background-color: white;'
        playStyleModal.style.cssText = 'display: none; '

        nameModuleOpen();

    }
        


        // event listeners for PvP modal
        let pvpModal = document.querySelector('.pvpModal');
        let first = document.querySelector('.first');
        let second = document.querySelector('.second');


    // opens modal for name input
    function nameModuleOpen(condition) {
        let pvpModal = document.querySelector('.pvpModal');
        let playButt = document.querySelector('.playButt');
        pvpModal.style.cssText ="transition: all 0.4s ease; -webkit-transform: scale(1); -webkit-filter: blur(0px) grayscale(0%);"
      
        playButt.addEventListener('click', nameModuleClose);
        playButt.addEventListener('click', PlayerX);
         // stopped in process of figuring best way to
        // send names to each factory - one for x and one for o
    }   
                
        // closes modal for name input
    function nameModuleClose() {
        pvpModal.style.cssText ="display: none;";
        let numOne = first.value;
        let numTwo = second.value;
        firstPlayer.winner(numOne);
        computer.winner(numTwo);
        
        // determines which parts of code run
        GBModule.power('on');
        firstPlayer.power('on');
        computer.power('on');
        AIGame.switch('off');


    }   

    // opens modal for pve difficulty
    function pveModuleOpen() {
        let pve = document.querySelector('.pveModal');
        let pvePlay = document.querySelector('.pvePlay');

        // styles for different elements
        playStyleModal.style.cssText = 'display: none; ';
        pvpModal.style.cssText = 'display: none;';
        pve.style.cssText = 'display: grid;';
        gameContainer.style.cssText = 'transition: all 0.4s ease; -webkit-transform: scale(1); -webkit-filter: blur(0px) grayscale(0px); background-color: white;'
        body.style.cssText = 'background-color: white;'

        // event listener to start game vs computer
        pvePlay.addEventListener('click', selectOption);

        // determines which parts of code run
        GBModule.power('off');
        firstPlayer.power('off');
        computer.power('off');
        AIGame.switch('on');

    }
        // closes modal && also determines player's choice of computer difficulty
    function selectOption() {
        let selection = document.querySelector('.pveSelect');
        let pveModal = document.querySelector('.pveModal');
        pveModal.style.cssText = 'display: none'; 
        bestMove();
    }


                

    return {
        closePS: playStyleClose
    }
})();

// module for the declaredWinner modal a.k.a - ('play again?' prompt)
var playAgainPrompt = (function() {
        let declaredWinner = document.querySelector('.declaredWinner');
        let play = document.querySelector('.winButtPlay');
        let decline = document.querySelector('.winButtDecline');

        play.addEventListener('click', playAgain);
        decline.addEventListener('click', noPlay);

    function playAgain() {
        for (var i = 0; i < gameBoard.length - 1; i++) {
            if(gameBoard[i].textContent != '') {
                gameBoard[i].textContent = '';
                GBModule.end(false);  
            }
           
            if (board[i] != '') {
                board[i] = '';
                GBModule.end(false);  

            }
        }
        gameText.length = 0;
        declaredWinner.style.cssText = 'display: none;';
        
    }

    function noPlay() {

    }
    return {
        playAgain: playAgain
    }
})();

// separates the NodeList of 'spaces' into 9 individual array places in the 'gameBoard' array
function singleSpace() {
    let spaces = document.querySelectorAll('td');
    
    for (i=0;i<spaces.length;i++) {
        gameBoard.push(spaces[i]);
    }
}
singleSpace();

// takes the clicked table data element and assigns it the proper index, which can then be used later
function scoring(e) {
    let spaces = document.querySelectorAll('td');
    let index = gameBoard.indexOf(e.target);
    console.log(board);
    scoreTrack(index);
}      



// logic behind wins and lose and draw
function scoreTrack(index) {
    spaces = document.querySelectorAll('td');

    let winner = false;
   

    switch(true) {
        // middle row
        case gameBoard[3].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[5].textContent === 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;

        break;
        case gameBoard[3].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[5].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;

        break;
        // top row
        case gameBoard[0].textContent === 'X' && gameBoard[1].textContent === 'X' && gameBoard[2].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[1].textContent === 'O' && gameBoard[2].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        // bottom row
        case gameBoard[6].textContent === 'X' && gameBoard[7].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[7].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        // left column
        case gameBoard[0].textContent === 'X' && gameBoard[3].textContent === 'X' && gameBoard[6].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[3].textContent === 'O' && gameBoard[6].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        // middle column
        case gameBoard[1].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[7].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        case gameBoard[1].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[7].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        // right column
        case gameBoard[2].textContent === 'X' && gameBoard[5].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        
        case gameBoard[2].textContent === 'O' && gameBoard[5].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        // top left to bottom right diagonal
        case gameBoard[0].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        case gameBoard[0].textContent == 'O' && gameBoard[4].textContent == 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        // top right to bottom left diagonal
        case gameBoard[6].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[2].textContent === 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            
            winner = true;
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[2].textContent === 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            
            winner = true;

        break;  
        default:
            if (gameText.length === 9 && win === false) {
                GBModule.cat();
                GBModule.end(true);
                GBModule.winner();
                
                winner = true;
            }    
    } 
}     




// Module for tracking wins and ties
var Scoring = (function(e) {
    
function gameCount(index) {
    let ex = 'X';
    for (var i = 0; i<gameBoard.length; i++) {
        if(gameBoard[i].textContent === ex) {
            console.log(gameBoard[i])
        }
    }
}

function gameCountO(index) {
    let oes = 'O';
    console.log(index);
    for (var i = 0; i<gameBoard.length; i++) {
        if(gameBoard[i].textContent === oes) {
            console.log(gameBoard[e])
        }
    }
}

function catGame(e) {
    // thought about ref this function up in the loop for nodelist iterations, causing the 'this.index' 
    // to push the number of the index to an array stored in here, and once all 8 array spots were filled, 
    // calling it a cat's game - situationally based on whether or not anyone won or not obviously
}

    return {
        gameX: gameCount,
        gameO: gameCountO
    }
})();





// Module for TTT board & functionality
var GBModule = (function() {
    // switch that turns on / off depending on mode chosen
    
    function powerSwitch(status) {
        power = status;
        console.log(power);
        return power;
    }
    let power;
    // private variables   
        let turn = true;
        let spaces = document.querySelectorAll('td');

        // window width

        let w = window.innerWidth;
        
        // function for ensuring turn order
        function _turnOrder(e) { 
            if (power === 'on') {

                switch(true) {
                    case turn === true:
                        if (e.target.textContent === '') {
                            gameText.unshift('X');
                            spaceSelectX(e); 
                            turn = false;
                            spaces.forEach(space => space.addEventListener('click', scoring))
                            
                        } else {
                            spaces.forEach(space => space.removeEventListener('click', scoring))
                        };
                        break;
                        
                        case turn != true:
                            if (e.target.textContent === '') {
                                gameText.unshift('O');
                                spaceSelectO(e);
                                turn = true;
                            }
                            break;
                }
            }
         }

           
        // function that stops all event listeners after someone wins
        function gameEnd(a) {
            let game = a;

            switch(true) {
                case game === true:
                    spaces.forEach(space => space.removeEventListener('click', _turnOrder));    
                    spaces.forEach(space => space.removeEventListener('click', scoring));
                break;
                
                default:
                    spaces.forEach(space => space.addEventListener('click', _turnOrder));  
                    spaces.forEach(space => space.addEventListener('click', scoring));   
         
            }
        }
        
        function winner(a) {
            
            if (a === 'X') {
                firstPlayer.winner();
                turn = true;
            } else if (a === 'O') {
                computer.winner();
            } else {
                turn = true;
            }
        }
        

        // player marker for X
        function spaceSelectX(e) {

            if (power != undefined) {
                e.target.textContent = 'X';
                if (w >= 551){
                    e.target.style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 100px;';
                } else if (w <= 550) {
                    e.target.style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 75px;';
                }

                gameBoard.push('X');
            } else {

            }    
        }
        // player marker for O
        function spaceSelectO(e){

            if (w >= 551){

                e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 100px;';
            } else if (w <= 550) {
                e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 75px;';
            }            
            e.target.textContent = 'O';
            gameBoard.push('O')
          
        }

        function catGame() {
            let winnerDeclaredModal = document.querySelector('.declaredWinner');
            let winnerDeclared = document.querySelector('.winh1');

            winnerDeclared.textContent = "It's a draw!";
            winnerDeclaredModal.style.cssText = 'display: grid;'
        }

        return {
            end: gameEnd,
            winner: winner,
            X: spaceSelectX,
            O: spaceSelectO,
            cat: catGame,
            power: powerSwitch
        };      

    })();

GBModule.end();
    
 
 
// Function Factories for 'X' + 'O' Player Markers

// Marker for 'X'

const PlayerX = (playername) => {
    // switch that enables factory depending on mode chosen
    const power = (status) => {
        let power = 'off';
        console.log(power);
        return power;
    }

    let first = document.querySelector('.first');
    let name = undefined;
    let gameStatus = false;
    let playButt = document.querySelector('.playButt');
    let winnerDeclaredModal = document.querySelector('.declaredWinner');
    let winnerDeclared = document.querySelector('.winh1');
    
    
    
    // updates name when button 'Play' is clicked
    const _getname = () => {
        name = first.value;
    }
    playButt.addEventListener('click', _getname);
    
    
    
    // gets the name and gamestatus to the winner function
    const declareWinner = () => {
        gameStatus = true;
        winner(name)
    }
    
    // declares the winner
    const winner = (name) => {
        if (name == '' && gameStatus == true) {
            winnerDeclared.textContent = "X's win!";
            winnerDeclaredModal.style.cssText = 'display: grid;'
        } else if (name != '' && gameStatus == true) {
            winnerDeclared.textContent = `${name} has won!`
            winnerDeclaredModal.style.cssText = 'display: grid;'
        } else if (name === undefined) {
            winnerDeclared.textContent = "X's win!";
        }

    }
    
    return {winner, declareWinner, power}
}
    

// Marker for 'O'!
const PlayerO = (playername) => {
// switch that shuts on and off depending on game mode chosen
    const power = (status) => {
        let power = 'off';
        console.log(power);
        return power;
    }

    let second = document.querySelector('.second');
    let name = second.value;
    let gameStatus = false;
    let playButt = document.querySelector('.playButt');
    let winnerDeclaredModal = document.querySelector('.declaredWinner');
    let winnerDeclared = document.querySelector('.winh1');
    
    // updates name when button 'Play' is clicked
    const _getname = () => {
        name = second.value;
    }
    playButt.addEventListener('click', _getname);
    
    // gets the name and gamestatus to the winner function
    const declareWinner = () => {
        gameStatus = true;
        winner(name)
    }

    // declares the winner
    const winner = (name) => {
        if (name == '' && gameStatus == true) {
            winnerDeclared.textContent = "O's win!";
            winnerDeclaredModal.style.cssText = 'display: grid;'
        } else if (name != '' && gameStatus == true) {
            winnerDeclared.textContent = `${name} has won!`
            winnerDeclaredModal.style.cssText = 'display: grid; transition: all 0.4s ease; -webkit-transform: scale(1)'
        } else if (name === undefined) {
            winnerDeclared.textContent = "O's win!";
        }
    }
    
    return {winner, declareWinner, power}
}
    
// playerX and playerO calls
const firstPlayer = PlayerX();
const computer = PlayerO();     
    

// module that contains all AI interactivity
var AIGame = (function() {
    let spaces = document.querySelectorAll('td');
    let w = window.innerWidth;
    let turn = 'AI';
// player marker for X
        let power = 'off';

        function powerSwitch(status) {
            power = status;
            console.log(power);
            return power;
        }
        
        spaces.forEach(space => space.addEventListener('click', playerSelect));
    
        function turnOrder(index) {
            
            if (power === 'on') {
                if (turn === 'AI'){
                    console.log(index);
                    // changes size of 'X' based on screen size
                    if (w >= 551){
                        gameBoard[index].textContent = 'X';
                        gameBoard[index].style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 100px;';
                        
                        // players turn

                        turn = 'human';
                        console.log(turn + ', AI has gone. It is your turn');
                        board.splice(index, 1, 'X');  
                        console.log(board);
                        scoreTrack(index);
                    } else if (w <= 550) {
                        gameBoard[index].textContent = 'X';
                        gameBoard[index].style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 75px;';
                        // players turn

                        turn = 'human';
                        console.log(turn + ', AI has gone. It is your turn');
                        board.splice(index, 1, 'X');  
                        console.log(board);
                        scoreTrack(index);
                    }
                    
                } else if (turn == 'human') {
                   
                }
            }
        }
           

        function aiSelect(e) {
               
            }


        function playerSelect(e) {
            if (power === 'on') {
                if (turn === 'human') {
                    let index = gameBoard.indexOf(e.target);
                    board.splice(index, 1, 'O');
                   
                    
                    if (w >= 551){
                        // changes size of 'O' based on screen size
                        e.target.textContent = 'O';
                        e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 100px;';
                        
                    } else if (w <= 550) {
                        e.target.textContent = 'O';
                        e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 75px;';
                    }
                    scoring(e);
                    turn = 'AI'
                    console.log(turn + ' is up');
                    console.log(board);
                    scoreTrack(e);
                    bestMove();
                } else {
                    
                }
                }
        }

        return {
            switch: powerSwitch,
            AI: aiSelect,
            Player: playerSelect,
            turns: turnOrder
        }
})();
console.log(board);


function equals3(a, b, c) {
    return a == b && b == c && a != '';
  }

function checkWinner() {
    let winner = undefined;
  
    // horizontal
    for (let i = 0; i < board.length; i++) {
      if (equals3(board[0], board[1], board[2])) {
        winner = board[0];
      } else if (equals3(board[3], board[4], board[5])) {
          winner = board[3];
      } else if (equals3(board[6], board[7], board[8])) {
        winner = board[6];
    }
  
    // Vertical
    for (let i = 0; i < board.length; i++) {
        if (equals3(board[0], board[3], board[6])) {
            winner = board[0];
          } else if (equals3(board[1], board[4], board[7])) {
              winner = board[1];
            } else if (equals3(board[2], board[5], board[8])) {
              winner = board[2];
        }
    }
  
    // Diagonal
    if (equals3(board[0], board[4], board[8])) {
      winner = board[0];
    }
    if (equals3(board[2], board[4], board[6])) {
      winner = board[2];
    }
  
    let openSpots = 0;
    for (let i = 0; i < board.length; i++) {
     
          openSpots++;
     
  
    if (winner == undefined && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
} }
/* *********************** ended on friday the 28th of may 

I will need to make two separate functions. One inside playerx the other in playerO
they will have to get data from the PvE play button saying to clear the name input text field
there will need to be two conditionals
one that says you won / lost 
the other saying the computer won

Also I need to refactor and use '_'privateFunctionName on all of the private functions

I need to create a module for the AI 

also I could probably get more separation out of some 
of the revealing module patterns I've created

*****************
also I have an idea for the algorithm

hard
just like the etch a sketch project, with the minmax algo
all I need to do, is gather the winning conditions, and get the computer
to randomly select one of the winning conditions (if it's possible). Once it becomes 
impossible, it should switch to another one that's possible. It'll just keep switching until
it wins

medium
same thing as above, but I should mix in some level of randomness. 
throw out a certain percentage of winning and random conditions '
so sometimes it picks a winning condition and other times it picks randomness that makes
no sense

easy 
basically I'll sprinkle in some winning conditions, but it'll pretty 
much just randomly throw out peices without much rhyme or reason.

I will give it a handful of winning conditions, BUT mainly it'll truly be easy mode



*/


        
// // So basically - when pushing changes to repo through terminal
// // the order is: 
// // 1.   'git status'
// // to check to see that they're there with

// // 2.   'git add .'
// // to add the changes 

// // 3.   'git commit -m "comment here"'
// // to label your changes for organization

// // 4.   'git push'
// // to push the changes to your repo
        
        
        
        
        
        



  

