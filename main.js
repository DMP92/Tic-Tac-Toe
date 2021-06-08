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
let aiMode;
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
        gameContainer.style.cssText = 'display: none; transition: all 0.01ms ease; -webkit-transform: scale(.5); -webkit-filter: blur(5px) grayscale(100%);'
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

        gameContainer.style.cssText = 'transition: all 0.4s ease; -webkit-transform: scale(1); -webkit-filter: blur(0px) grayscale(0px); background-color: transparent;'
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
        winnerDeclared = document.querySelector('.declaredWinner');
        pvpModal.style.cssText = "display: none;";
        let numOne = first.value;
        let numTwo = second.value;
        firstPlayer.winner(numOne);
        computer.winner(numTwo);
        
        // determines which parts of code run
        GBModule.power('on');
        firstPlayer.power('on');
        computer.power('on');
        AIGame.switch('off');
        winnerDeclared.style.cssText = "display: none;";

    }   

    // opens modal for pve difficulty
    function pveModuleOpen() {
        let selection = document.querySelector('.pveSelect');
        let pve = document.querySelector('.pveModal');
        let pvePlay = document.querySelector('.pvePlay');
        
        // styles for different elements
        playStyleModal.style.cssText = 'display: none; ';
        pvpModal.style.cssText = 'display: none;';
        pve.style.cssText = 'display: grid;';
        gameContainer.style.cssText = 'transition: all 0.4s ease; -webkit-transform: scale(1); -webkit-filter: blur(0px) grayscale(0px); background-color: transparent;'
        body.style.cssText = 'background-color: white;'
        first.value = null;
        second.value = null;
        // event listener to start game vs computer
        pvePlay.addEventListener('click', selectOption);

       

    }
        // closes modal && also determines player's choice of computer difficulty
    function selectOption() {
        let selection = document.querySelector('.pveSelect');
        let pveModal = document.querySelector('.pveModal');
        pveModal.style.cssText = 'display: none'; 
        first.value = 'X';
        second.value = 'O';
        // determines which parts of code run
        if (selection.value == '2') {
             bestMove();
             GBModule.power('off');
             firstPlayer.winner('X');
             computer.power('off');
            AIGame.switch('on 2');
            playAgainPrompt.playAgain('on');
        } else if (selection.value == '1') {
            GBModule.power('off');
            firstPlayer.winner('X');
            computer.power('off');
            AIGame.switch('on 1');
            AIGame.random();
            playAgainPrompt.playAgain('on');

        }
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
        let power;


        function noPlay() {
            
            let playStyleModal = document.querySelector('.playStyle');
            let gameContainer = document.querySelector('.gameContainer');
            let body = document.querySelector('body');
            let declaredWinner = document.querySelector('.declaredWinner');
            let pve = document.querySelector('.pveModal');
            let pvpModal = document.querySelector('.pvpModal');
            
            
            for (var i = 0; i < gameBoard.length; i++) {
                if(gameBoard[i].textContent != '') {
                    gameBoard[i].textContent = '';
                    gameBoard[i].style.cssText = '';
                    GBModule.end(false);  

                }
                
                if (board[i] != '') {
                    board[i] = '';
                    GBModule.end(false);  

                }
                
                if (gameBoard.length > 9) {
                    gameBoard.length = 9;
                }
            }
            
            gameText.length = 0;
            
            body.style.cssText = 'background-color: black;';
            gameContainer.style.cssText = 'display: none; transition: all 0.01ms ease; -webkit-transform: scale(.5); -webkit-filter: blur(5px) grayscale(100%);';
            playStyleModal.style.cssText = 'border-radius: 2px';
            pvpModal.style.cssText ="transition: all 0.4s ease; -webkit-transform: scale(.5); -webkit-filter: blur(5px) grayscale(100%);";
            pve.style.cssText = 'display: none;';
            declaredWinner.style.cssText = 'display: none;';
        }

    function playAgain(status) {
      
        if (status == 'on') {
            aiMode = 'on';
        }

        for (var i = 0; i < gameBoard.length; i++) {
            if(gameBoard[i].textContent != '') {
                gameBoard[i].textContent = '';
                gameBoard[i].style.cssText = '';
                GBModule.end(false);  
            }
           
            if (board[i] != '') {
                board[i] = '';
                GBModule.end(false);  

            }

            if (gameBoard.length > 9) {
                gameBoard.length = 9;
            }
        }

        gameText.length = 0;
        declaredWinner.style.cssText = 'display: none;';
       
        if (aiMode === 'on') {
            AIGame.gameStatus('playing');
            AIGame.turns('human');
            AIGame.random();
            bestMove();
        }
    }

    return {
        playAgain: playAgain,
        noPlay: noPlay
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
    board.splice(index, 1, e.target.textContent)
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
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
            

        break;
        case gameBoard[3].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[5].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            

        break;
        // top row
        case gameBoard[0].textContent === 'X' && gameBoard[1].textContent === 'X' && gameBoard[2].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[1].textContent === 'O' && gameBoard[2].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        // bottom row
        case gameBoard[6].textContent === 'X' && gameBoard[7].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[7].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        // left column
        case gameBoard[0].textContent === 'X' && gameBoard[3].textContent === 'X' && gameBoard[6].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[3].textContent === 'O' && gameBoard[6].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        // middle column
        case gameBoard[1].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[7].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        case gameBoard[1].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[7].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        // right column
        case gameBoard[2].textContent === 'X' && gameBoard[5].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        
        case gameBoard[2].textContent === 'O' && gameBoard[5].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        // top left to bottom right diagonal
        case gameBoard[0].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        case gameBoard[0].textContent == 'O' && gameBoard[4].textContent == 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        // top right to bottom left diagonal
        case gameBoard[6].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[2].textContent === 'X':
            GBModule.winner('X');
            firstPlayer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[2].textContent === 'O':
            GBModule.winner('O');
            computer.declareWinner();
            GBModule.end(true);
            AIGame.random('game over');
            winner = true;
            AIGame.gameStatus('game over');
            

        break;  
        default:
            if (gameText.length === 9 && winner === false) {
                GBModule.cat();
                GBModule.end(true);
                GBModule.winner();
                AIGame.random('game over');
                winner = true;
                AIGame.gameStatus('game over');
                
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
                firstPlayer.declareWinner();
                turn = true;
            } else if (a === 'O') {
                computer.declareWinner();
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
        let power = status;
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
            } else if (name != '' && gameStatus == true && name != undefined) {
                winnerDeclared.textContent = `${name} has won!`
                winnerDeclaredModal.style.cssText = 'display: grid;'
            } else if (name === undefined) {
                winnerDeclared.textContent = "X's win!";
                winnerDeclaredModal.style.cssText = 'display: grid;'

            }
        

    }
    
    return {winner, declareWinner, power}
}
    

// Marker for 'O' ------------------------
const PlayerO = (playername) => {
    let powerSwitch = 'on'
// switch that shuts on and off depending on game mode chosen
    const power = (status) => {
        powerSwitch = status;
        
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
        if (powerSwitch === 'off') {
            winnerDeclared.textContent = "O's win!";
            winnerDeclaredModal.style.cssText = 'display: grid;'
        } else if (powerSwitch === 'on') {

            if (name == '' && gameStatus == true) {
                winnerDeclared.textContent = "O's win!";
                winnerDeclaredModal.style.cssText = 'display: grid;'
            } else if (name != '' && gameStatus == true && name != undefined) {
                winnerDeclared.textContent = `${name} has won!`;
                winnerDeclaredModal.style.cssText = 'display: grid;'
            } else if (name === undefined) {
                winnerDeclared.textContent = "O's win!";
                winnerDeclaredModal.style.cssText = 'display: grid;'
                
            }
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


        let power = 'off';
        let gameStatus = 'playing';
        
        function currentGameStatus(status) {
            gameStatus = status;

        }
        function powerSwitch(status) {
            power = status;
        }
        
        spaces.forEach(space => space.addEventListener('click', playerSelect));
        
        function turnOrder(index) {
            if (index === 'human') {
                turn = 'AI';
                index = 0;
            }
            
            if (power === 'on 2') {
                if (turn === 'AI'){
                    // changes size of 'X' based on screen size
                    if (w >= 551){
                        gameBoard[index].textContent = 'X';
                        gameBoard[index].style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 100px;';
                        
                        // players turn
                        
                        turn = 'human';
                        board.splice(index, 1, 'X');  
                        gameText.push('X');
                        scoreTrack(index);
                    } else if (w <= 550) {
                        gameBoard[index].textContent = 'X';
                        gameBoard[index].style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 75px;';
                        // players turn
                        
                        turn = 'human';
                        board.splice(index, 1, 'X');  
                        gameText.push('X');
                        scoreTrack(index);
                    }
                    
                } else if (turn == 'human') {
                    
                }
            }
        }
        
        function aiRandom() {
            
            if(power === 'on 1' && gameStatus != 'game over') {
                let randomMove = Math.floor(Math.random() * gameBoard.length);
                aiRandomize(randomMove);
            }
        }
        
        
        
        function aiRandomize(index) {
            if (turn === 'AI') {
                if (gameBoard[index].textContent === '') {
                    
                    if (w >= 551){
                        
                        gameBoard[index].textContent = 'X';
                        gameBoard[index].style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 100px;';
                        
                        // players turn
                        
                        turn = 'human';
                        board.splice(index, 1, 'X');  
                        gameText.push('X');
                        scoreTrack(index);
                    } else if (w <= 550) {
                        gameBoard[index].textContent = 'X';
                        gameBoard[index].style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 75px;';
                        // players turn
                        
                        turn = 'human';
                        board.splice(index, 1, 'X');  
                        gameText.push('X');
                        scoreTrack(index);
                    }
                } else if (gameBoard[index].textContent != '') {
                    aiRandom();
                }
            } else if (turn === 'human') {

            }
        }

        function aiSelect(e) {
               
            }


        function playerSelect(e) {
            
                if (turn === 'human' && e.target.textContent === '') {
                    let index = gameBoard.indexOf(e.target);
                    board.splice(index, 1, 'O');
                   
                    
                    if (w >= 551){
                        // changes size of 'O' based on screen size
                        e.target.textContent = 'O';
                        e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 100px;';
                        gameText.push('O');
                        
                    } else if (w <= 550) {
                        e.target.textContent = 'O';
                        e.target.style.cssText = 'color: white; margin: 0px; padding: 0px; font-size: 75px;';
                        gameText.push('O');
                        
                    }
                    scoring(e);
                    turn = 'AI'
                    scoreTrack(e);
                    
                    switch(true) {
                        case power === 'on 1':
                            aiRandom();
                        break;
                        case power === 'on 2':
                            bestMove();
                        break;
                    }
                } else {
                    
                }
                
        }

        return {
            switch: powerSwitch,
            AI: aiSelect,
            Player: playerSelect,
            turns: turnOrder,
            random: aiRandom,
            gameStatus: currentGameStatus
        }
})();

// equals3 simplifies winning conditions for checkWinner
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
      scoreTrack();
    } else {
      return winner;
    }
  }
} }


        
        
        
        
        



  

