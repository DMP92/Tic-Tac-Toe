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


// global copies of both needed arrays
let gameBoard = [];
let gameText = [];


// module for game style choice (two players vs each other, or one player vs the computer)

var gameStyle = (function() {
    // variables for PvP and PvE buttons
    let pvp = document.querySelector('.PvP');
    let pve = document.querySelector('.PvE');
    let playStyleModal = document.querySelector('.playStyle');
    let gameContainer = document.querySelector('.gameContainer');
    let body = document.querySelector('body');


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

        pvp.addEventListener('click', nameModuleOpen);

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

    }
        // closes modal && also determines player's choice of computer difficulty
        function selectOption() {
            let selection = document.querySelector('.pveSelect');
            let pveModal = document.querySelector('.pveModal');
            pveModal.style.cssText = 'display: none'; 

            computerDifficulty(selection.value);
        }

        function computerDifficulty(value) {
            
            
        }
                

    return {
        closePS: playStyleClose()
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
        for (var i = 0; i < gameBoard.length; i++) {
            if(gameBoard[i].textContent != '') {
                gameBoard[i].textContent = '';
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
    let win = false;
    console.log(typeof gameBoard[2].textContent);

    switch(true) {
        // middle row
        case gameBoard[3].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[5].textContent === 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        case gameBoard[3].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[5].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);


        break;
        // top row
        case gameBoard[0].textContent === 'X' && gameBoard[1].textContent === 'X' && gameBoard[2].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[1].textContent === 'O' && gameBoard[2].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
        break;
        // bottom row
        case gameBoard[6].textContent === 'X' && gameBoard[7].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[7].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
        break;
        // left column
        case gameBoard[0].textContent === 'X' && gameBoard[3].textContent === 'X' && gameBoard[6].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[3].textContent === 'O' && gameBoard[6].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
        break;
        // middle column
        case gameBoard[1].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[7].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        case gameBoard[1].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[7].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
        break;
        // right column
        case gameBoard[2].textContent === 'X' && gameBoard[5].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        
        case gameBoard[2].textContent === 'O' && gameBoard[5].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
        break;
        // top left to bottom right diagonal
        case gameBoard[0].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        case gameBoard[0].textContent == 'O' && gameBoard[4].textContent == 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
        break;
        // top right to bottom left diagonal
        case gameBoard[6].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[2].textContent === 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[2].textContent === 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
        break;  
        default:
            if (gameText.length === 9 && win === false) {
                GBModule.cat();
                GBModule.end(true);
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
            console.log(gameBoard[index])
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
        // private variables   
        let gameBoard = [];
        let turn = true;
        let spaces = document.querySelectorAll('td');

        // window width

        let w = window.innerWidth;
        
        // function for ensuring turn order
        function _turnOrder(e) {     
            switch (true) {
                case turn == true:
                if (e.target.textContent === '') {
                    gameText.push('X');
                    spaceSelectX(e); 
                    spaces.forEach(space => space.addEventListener('click', scoring));           
                    turn = false;
                } else {

                }
                break;
                case turn == false:
                   if (e.target.textContent === '') {
                       gameText.push('O');
                       spaceSelectO(e);
                       spaces.forEach(space => space.addEventListener('click', scoring));           
                       turn = true;
                    }
                 break;
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
            }
        }
        
        function winner(a) {
            
            if (a === 'X') {
                firstPlayer.winner();
                turn = true;
            } else if (a === 'O') {
                computer.winner();
            }
        }
        

        // player marker for X
        function spaceSelectX(e) {
            e.target.textContent = 'X';
            if (w >= 551){
                e.target.style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 100px;';
            } else if (w <= 550) {
                e.target.style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 75px;';
            }

            gameBoard.push(e);
           
        }
        // player marker for O
        function spaceSelectO(e){
            if (w >= 551){

                e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 100px;';
            } else if (w <= 550) {
                e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 75px;';
            }            
            e.target.textContent = 'O';
            gameBoard.push(e)
          
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
            cat: catGame
        };      

    })();

GBModule.end();
    
 
 
// Function Factories for 'X' + 'O' Player Markers

// Marker for 'X'

const PlayerX = (playername) => {
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
        }

    }
    
    return {winner, declareWinner}
}
    

// Marker for 'O'!
const PlayerO = (playername) => {
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
        }
    }
    
    return {winner, declareWinner}
}
    
// playerX and playerO calls
const firstPlayer = PlayerX();
const computer = PlayerO();     
    


/* *********************** ended on friday the 28th of may 

I will need to make two separate functions. One inside playerx the other in playerO
they will have to get data from the PvE play button saying to clear the name input text field
there will need to be two conditionals
one that says you won / lost 
the other saying the computer won

Also I need to refactor and use _privateFunctionName on all of the private functions

I need to create a module for the AI 

also I could probably get more separation out of some 
of the revealing module patterns I've created


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
        
        
        
        
        
        



  

