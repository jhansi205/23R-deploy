let guessedLetters = [];
let incorrectGuesses = 0;
const maxGuesses = 6;
const keyboard = document.getElementById("keyboard");
const wordsContainer = document.getElementById("words");
const hangmanImage = document.getElementById("hangman-img"); // Reference the hangman image
const wrongGuessesDisplay = document.getElementById("wrong-guesses");
let chosenWord = "";

// Fetch a random word from API
async function fetchWord() {
    try {
        let response = await fetch('https://random-words-api-plum.vercel.app/word/noun');
        let data = await response.json();
        let words = data.map((val) => val.word);
        chosenWord = words[0].toLowerCase();
        console.log("Word to Guess:", chosenWord);

        wordsContainer.innerHTML = "_ ".repeat(chosenWord.length);
        setupKeyboard();
    } catch (error) {
        console.error("Error fetching word:", error);
    }
}

// Set up the keyboard buttons
function setupKeyboard() {
    keyboard.innerHTML = ""; // Clear previous buttons
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet.split("").forEach((letter) => {
        const button = document.createElement("button");
        button.textContent = letter;
        button.addEventListener("click", () => handleGuess(letter));
        button.id = `btn-${letter}`;
        keyboard.appendChild(button);
    });
}

// Handle guessed letter
function handleGuess(letter) {
    if (guessedLetters.includes(letter) || incorrectGuesses >= maxGuesses) return;
    guessedLetters.push(letter);

    document.getElementById(`btn-${letter}`).disabled = true;

    if (chosenWord.includes(letter)) {
        updateWordDisplay();
    } else {
        incorrectGuesses++;
        updateHangmanDisplay();
    }

    updateWrongGuesses();
}


function updateWordDisplay() {
    let wordDisplay = chosenWord.split("")
        .map(letter => guessedLetters.includes(letter) ? letter : "_")
        .join(" ");
    wordsContainer.innerHTML = wordDisplay;

    if (!wordDisplay.includes("_")) {
        setTimeout(() => alert("🎉 You won! Congratulations!"), 500);
    }
}

// Update wrong guesses display
function updateWrongGuesses() {
    let wrongGuesses = guessedLetters.filter(letter => !chosenWord.includes(letter));
    wrongGuessesDisplay.innerHTML = "Wrong guesses: " + wrongGuesses.join(", ");
}


function updateHangmanDisplay() {
    if (incorrectGuesses <= maxGuesses) {
        hangmanImage.src = `Hangman-${incorrectGuesses}.png`; // Updates the image
    }

    if (incorrectGuesses >= maxGuesses) {
        setTimeout(() => alert(`💀 Game over! The word was: "${chosenWord}"`), 500);
    }
}


fetchWord();
