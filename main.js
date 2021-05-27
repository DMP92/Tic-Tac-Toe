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
    

    switch(true) {
        // middle row
        case gameBoard[3].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[5].textContent === 'X':
            GBModule.winner('X');
            Scoring.gameX(index);
            GBModule.end(true);
        break;
        case gameBoard[3].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[5].textContent == 'O':
            GBModule.winner('O');
            Scoring.gameO(index);
            GBModule.end(true);

        break;
        // top row
        case gameBoard[0].textContent === 'X' && gameBoard[1].textContent === 'X' && gameBoard[2].textContent == 'X':
            GBModule.winner('X');
            GBModule.end(true);
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[1].textContent === 'O' && gameBoard[2].textContent == 'O':
            GBModule.winner('O');
            GBModule.end(true);
        break;
        // bottom row
        case gameBoard[6].textContent === 'X' && gameBoard[7].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            GBModule.end(true);
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[7].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            GBModule.end(true);
        break;
        // left column
        case gameBoard[0].textContent === 'X' && gameBoard[3].textContent === 'X' && gameBoard[6].textContent == 'X':
            GBModule.winner('X');
            GBModule.end(true);
        break;
        case gameBoard[0].textContent === 'O' && gameBoard[3].textContent === 'O' && gameBoard[6].textContent == 'O':
            GBModule.winner('O');
            GBModule.end(true);
        break;
        // middle column
        case gameBoard[1].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[7].textContent == 'X':
            GBModule.winner('X');
            GBModule.end(true);
        break;
        case gameBoard[1].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[7].textContent == 'O':
            GBModule.winner('O');
            GBModule.end(true);
        break;
        // right column
        case gameBoard[2].textContent === 'X' && gameBoard[5].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            GBModule.end(true);
        break;
        
        case gameBoard[2].textContent === 'O' && gameBoard[5].textContent === 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            GBModule.end(true);
        break;
        // top left to bottom right diagonal
        case gameBoard[0].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[8].textContent == 'X':
            GBModule.winner('X');
            GBModule.end(true);
        break;
        case gameBoard[0].textContent == 'O' && gameBoard[4].textContent == 'O' && gameBoard[8].textContent == 'O':
            GBModule.winner('O');
            GBModule.end(true);
        break;
        // top right to bottom left diagonal
        case gameBoard[6].textContent === 'X' && gameBoard[4].textContent === 'X' && gameBoard[2].textContent === 'X':
            GBModule.winner('X');
            GBModule.end(true);
        break;
        case gameBoard[6].textContent === 'O' && gameBoard[4].textContent === 'O' && gameBoard[2].textContent === 'O':
            GBModule.winner('O');
            GBModule.end(true);
        break;      
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
        
        // function for forcing turn order
        function turnOrder(e) {     
            switch (true) {
                case turn == true:
                    gameText.push('X');
                    spaceSelectX(e); 
                    spaces.forEach(space => space.addEventListener('click', scoring));           
                    turn = false;
                break;
                
                case turn == false:
                    gameText.push('O');
                    spaceSelectO(e);
                    spaces.forEach(space => space.addEventListener('click', scoring));           
                    turn = true;
                break;
                }
        }
        
        // function that stops all event listeners after someone wins
        function gameEnd(a) {
            let game = a;

            switch(true) {
                case game === true:
                    spaces.forEach(space => space.removeEventListener('click', turnOrder));    
                    spaces.forEach(space => space.removeEventListener('click', scoring));    
                break;
                
                default:
                    spaces.forEach(space => space.addEventListener('click', turnOrder));           
            }
        }
        
        function winner(a) {
            
            if (a === 'X') {
                firstPlayer.winner();
            } else if (a === 'O') {
                computer.winner();
            }
        }
        

        // player marker for X
        function spaceSelectX(e) {
            e.target.textContent = 'X';
            e.target.style.cssText = 'color: rgb(51, 172, 202); margin: 0px; padding: 0px; font-size: 100px;';
            gameBoard.push(e);
            gameText.push('X');
        }
        // player marker for O
        function spaceSelectO(e){
            e.target.style.cssText = 'color: rgb(255, 255, 255); margin: 0px; padding: 0px; font-size: 100px;';
            e.target.textContent = 'O';
            gameBoard.push(e)
            gameText.push('O');
        }

        return {
            end: gameEnd,
            winner: winner,
            X: spaceSelectX,
            O: spaceSelectO

        };      

    })();

GBModule.end();
    
 
 
// Function Factories for 'X' + 'O' Player Markers

// Marker for 'X'

const PlayerX = (name) => {
    
    
    const winner = () => {
        if (name == undefined) {
            console.log('X has won!');
        } else if (name != undefined) {
            console.log(`${name} has won!`);
        }

    }
    
    return {winner}
}
    

// Marker for 'O'!
const PlayerO = (name) => {
    const winner = () => {
        if (name == undefined) {
            console.log('X has won!');
        } else if (name != undefined) {
            console.log(`${name} has won!`);
        }
    }
    
    return {winner}
}
    
// playerX and playerO calls
const firstPlayer = PlayerX();
const computer = PlayerO();     
    

        
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
        
        
        
        
        
        



  

