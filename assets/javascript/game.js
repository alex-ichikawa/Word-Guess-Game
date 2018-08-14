// Game variables
const words = ['ayrton senna', 'ferrari', 'sebastian vettel', 'mclaren', 'williams', 'honda', 'monaco', 'red bull', 'adrian newey', 'fernando alonso', 'kamui kobayashi', 'jenson button', 'kimi raikkonen', 'eau rouge'];
let wins = 0;
let losses = 0;
let wrong = [];
let tries = 6;
let underScore = [];
let userGuesses = [];
let chosenWord;
let winCounter = 0;
let usedLetters = [];
let spaceCounter = 0;
let winSound = document.getElementById('worldChamp');
let loseSound = document.getElementById('pingPong');

function startGame () {

    // picks random wors
    chosenWord = words[Math.floor(Math.random() * words.length)];
    console.log(chosenWord);
    // sets amount of underscores
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === ' ')  {
            underScore.push('&nbsp');
            spaceCounter++;
        }
        else {
            underScore.push('_');
        }
    }

    // print underscore to screen
    document.getElementById('under').innerHTML = underScore.join(' ');
    document.getElementById("guessCounter").innerHTML = tries;
    document.getElementById('guessedLetter').innerHTML = usedLetters;
    document.getElementById('wins').innerHTML = wins;
    document.getElementById('losses').innerHTML = losses;

}

function reset () {
    wrong = [];
    tries = 6;
    underScore = [];
    winCounter = 0;
    usedLetters = [];
    spaceCounter = 0;
    userGuesses = [];
    startGame();
}

// checks win/lose
function winLose() {
    if (winCounter === chosenWord.length - spaceCounter) {
        document.getElementById('under').innerHTML = chosenWord;
        wins++;
        winSound.play();
        alert(`You won! The word was ${chosenWord}`);
        reset();
    }
    else if (tries === 0) {
        loseSound.play();
        alert('Loser');
        losses++;
        reset();
    }
}

// game code
// only allow alphanumeric
document.onkeyup = function(event) {
    if (event.which <= 90 && event.which >= 48) {
        userGuesses = event.key;
    }
   

    if (chosenWord.indexOf(userGuesses) > -1 && usedLetters.indexOf(userGuesses) === -1) {
        for (let i = 0; i < chosenWord.length; i++) {
            if (chosenWord[i] === userGuesses)  {
                if (usedLetters.indexOf(userGuesses) === -1) {
                    usedLetters.push(userGuesses);
                    underScore[i] = userGuesses;
                    winCounter++;
                    document.getElementById('under').innerHTML = underScore.join(' ');
                    document.getElementById('guessedLetter').innerHTML = usedLetters;
                    winLose();

                }else {
                underScore[i] = userGuesses;
                winCounter++;
                document.getElementById('under').innerHTML = underScore.join(' ');
                document.getElementById('guessedLetter').innerHTML = usedLetters;
                winLose();
                }
            }
            
        }
        
    }
    else if (chosenWord.indexOf(userGuesses) === -1 && usedLetters.indexOf(userGuesses) === -1) {
        wrong.push(userGuesses);
        tries--;
        usedLetters.push(userGuesses);
        winLose();
        document.getElementById("guessCounter").innerHTML = tries;
        document.getElementById('guessedLetter').innerHTML = usedLetters;
    }
}



startGame();