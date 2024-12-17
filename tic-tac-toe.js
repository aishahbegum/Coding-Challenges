let boxes = document.querySelectorAll(".box"); // this selects all the elements with the class called 'box'. it also represents the game grid squares.

// this is supposed to initialise the variables to track the current player's turn
let turn = "X"; // player x's turn goes first
let isGameOver = false; // this will let the players know that the game is over

boxes.forEach(e =>{
    e.innerHTML = "" // this clears the content in the boxes
    e.addEventListener("click", ()=>{ // i have put in a click event listener and assigned it to each box
        if(!isGameOver && e.innerHTML === ""){
            e.innerHTML = turn; // this allows the players to mark the box with the current player's turn
            cheakWin(); // checks if the current player has won the game
            cheakDraw(); // this checks if the game is a draw
            changeTurn(); // this switches the player's turn
        }
    });
});

function changeTurn(){
    if(turn === "X"){ // if its x's turn, switch over to o's turn
        turn = "O";
        document.querySelector(".bg").style.left = "85px"; // this moves the x indicator over to o's position
    }
    else{ // if its o's turn, switch over to x's turn
        turn = "X";
        document.querySelector(".bg").style.left = "0"; // this moves the o indicator over to x's position
    }
}

// this sets the scores at 0 at the beginning of the game
let scoreX = 0;
let scoreO = 0;

function cheakWin(){ // this function checks if there is a winner
    let winConditions = [ // this checks all the possible combinations for a win
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ]

    for(let i = 0; i<winConditions.length; i++){ // this is a loop to check all the winning conditions and find a winner
        let v0 = boxes[winConditions[i][0]].innerHTML; // the value in the first box
        let v1 = boxes[winConditions[i][1]].innerHTML; // the value in the second box
        let v2 = boxes[winConditions[i][2]].innerHTML; // the value in the third box

        // this checks if all the three boxes match and are not empty. if so, a player has won
        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true; // the game over flag is shown
            document.querySelector("#results").innerHTML = turn + " Wins"; // this shows the winner message
            document.querySelector("#play-again").style.display = "inline"; // this shows the "play again" button below the grid

                if (turn === "X") {
                        scoreX++;
                        document.querySelector("#score-x").innerText = scoreX; // this updates player x's score display
                    } else {
                        scoreO++;
                        document.querySelector("#score-o").innerText = scoreO; // this updates player o's score display
                    }

            for(j = 0; j<3; j++){ // this highlights the winners boxes and puts a blue background colour with a change of text colour
                boxes[winConditions[i][j]].style.backgroundColor = "#1a1aff"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

function cheakDraw(){ // this function checks if game is a draw
    if(!isGameOver){ // this checks if the game is a draw if the game is not already over
        let isDraw = true; // this assumes the game is a draw until it's proven that a player has won
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false; // but if any box is left empty, it's not a draw
        })

        if(isDraw){ // if the boxes are all filled up and no winner has been declared, it's a draw
            isGameOver = true; // the game over flag is shown
            document.querySelector("#results").innerHTML = "It's a Draw!"; // this shows that the game is a draw
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}

document.querySelector("#play-again").addEventListener("click", ()=>{ // this is an event listener for the 'play again' button
    isGameOver = false; // this resets the game over flag
    turn = "X"; // this resets the turn back to 'x'
    document.querySelector(".bg").style.left = "0"; // this resets the turn indicator back to 'x'
    document.querySelector("#results").innerHTML = ""; // this clears the display message
    document.querySelector("#play-again").style.display = "none"; // this hides the 'play again' button

    boxes.forEach(e =>{ // this clears all the boxes and resets their style
        e.innerHTML = ""; // clears the content in the boxes
        e.style.removeProperty("background-color"); // removes the background colour
        e.style.color = "#000" // resets the text colour to black
    })
})
