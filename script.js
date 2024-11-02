// choices available for the game
const choices  = ["rock", "paper", "scissors"];

// Elements from the DOM for displaying game results
const showPlayer = document.getElementById("showPlayer"); // Shows player choice
const showComp = document.getElementById("showComp"); // Show computer choice
const showResult = document.getElementById("showResult"); // shows the game result
const formId = document.getElementById("formId"); // form element for input
const text = document.getElementById("text") // element to display error messages
const showPlayerScore = document.getElementById("showPlayerScore") // shows player score
const showPlayerLoserScore = document.getElementById("showPlayerLoserScore") // show loss score
const showPlayerTieScore = document.getElementById("showPlayerTieScore") // shows tie score
const resetGame = document.getElementById("resetGame") // button for resetting score

//initialize variables
let playerScore = 0
let loseScore = 0
let tieScore = 0


//prevents page from reloading and deletes content in input box
formId.addEventListener('submit', function(e){
    e.preventDefault(); //prevents page from reloading
})

//resets all to elements to default when the reset button is clicked
resetGame.addEventListener('click', () => {
    const confirmReset = confirm("Are you sure you want to reset the game?");
    if(confirmReset){
        playerScore = 0;
        loseScore = 0;
        tieScore = 0;
        showPlayerScore.textContent = playerScore;
        showPlayerLoserScore.textContent = loseScore;
        showPlayerTieScore.textContent = tieScore;
        showResult.textContent = '';
        showPlayer.textContent = 'Player:';
        showComp.textContent = 'Computer:';
        document.getElementById("inputPlayer").value = ""
        resetNormal()

    }
})


//main function that executes game logic
function playGame() {
    let result = ''
    
    // Get and cleans user input
    const inputPlayer = document.getElementById("inputPlayer").value.trim().toLowerCase();
    
    // Generates computer random choice
    const compChoice = choices[Math.floor(Math.random() *  3)];

    // Checks if user input is valid; if not, show error
    if (!choices.includes(inputPlayer)) {
        showError("Input invalid! Please enter one of the options above");
        return;
    } 
    else{
        resetNormal();
    }
    
    // If player choice matches computer choice, it's a tie
    if (inputPlayer === compChoice) {
        result = "TIE";
    }
    else {
        //switch can select any of the case block to be executed depending on the parameter
        //in this case playerChoice parameter will select 1 
        //of the 3 option, once it matches it will execute the
        //ternary operator 
        switch(inputPlayer) {
            case "rock":
                result = (compChoice === 'scissors') ? "You Win!" : "You Lose!";
                break;

            case "paper":
                result = (compChoice === 'rock') ? "You Win!" : "You Lose!";
                break;

            case "scissors":
                result = (compChoice === 'paper') ? "You Win!" : "You Lose!";
                break;

        }
    }
    
    //calls function
    updateDisplay(inputPlayer, compChoice, result);

    // Update scores based on the game result
    // Increment the respective score based on the result
    switch(result) {
        case "You Win!":
            playerScore++
            showPlayerScore.textContent = playerScore;
            break;

        case "You Lose!":
            loseScore++;
            showPlayerLoserScore.textContent = loseScore;
            break;

        case "TIE":
            tieScore++;
            showPlayerTieScore.textContent = tieScore;
            break;
    }



}

// Displays an error message when user input is invalid
function showError(message) {
    text.textContent = message
    text.style.color = "red";
    document.getElementById("inputPlayer").style.borderColor = "red";
    document.getElementById("inputPlayer").value = ""
}

// Resets error display to normal when the user corrects their input
function resetNormal() {
    text.textContent = ""
    document.getElementById("inputPlayer").style.borderColor = "";
}

// Updates the displayed choices and results after each game round
function updateDisplay(inputPlayer, compChoice, result) {
    // defines emoji each case
    const emoji = {
        rock: '🪨',
        paper: '📄',
        scissors: '✂️'

    };

    showPlayer.textContent = `Player: ${inputPlayer} ${emoji[inputPlayer]}`;
    showComp.textContent = `Computer: ${compChoice} ${emoji[compChoice]}`;
    showResult.textContent = result;
    showResult.classList.remove("greenText", "redText");

    //Highlights the result in green for wins and red for losses
    if(result === "You Win!") {
        showResult.classList.add("greenText");
    } else if (result === "You Lose!") {
        showResult.classList.add("redText")
    }

}