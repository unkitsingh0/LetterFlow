// Function to generate a random letter, either uppercase or lowercase
function generateRandomLetter(uppercase = false) {
  const alphabet = uppercase
    ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    : "abcdefghijklmnopqrstuvwxyz";
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

// Get references to HTML elements
let rangeInput = document.getElementById("rangeInput");
let rangeValue = document.getElementById("rangeValue");
let letterContainer = document.querySelector(".two");

// Array to track generated letters
let letterSequence = [];

// Counter to keep track of the current position in the sequence
let counter = 0;

// Generate a grid of randomly generated letters in div elements
function generateRandomLetterGrid() {
  letterSequence = [];
  counter = 0;
  for (let i = 0; i < rangeInput.value; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("words");

    // Generate a random number of paragraphs (letters) within the div
    for (let j = 0; j < Math.floor(Math.random() * (6 - 3 + 1)) + 3; j++) {
      let newP = document.createElement("p");
      newP.classList.add(`p${letterSequence.length}`);
      let newLetter = generateRandomLetter();
      newP.textContent = newLetter;
      letterSequence.push(newLetter);
      newDiv.append(newP);
    }

    // Add a space to the letter sequence
    letterSequence.push(" ");
    letterContainer.append(newDiv);
  }
}

// Call the function for the first time when the page reloads
generateRandomLetterGrid();
rangeInput.addEventListener("input", (e) => {
  // Clear the existing content and regenerate the letter grid
  letterContainer.innerHTML = "";
  generateRandomLetterGrid();
  // Update the displayed range value
  rangeValue.textContent = rangeInput.value;
});

// Function to add blinking effect to the current letter
function addBlink(counter) {
  if (letterSequence[counter] == " ") return;
  let currentLetter = document.querySelector(`.p${counter}`);
  currentLetter.classList.add("active");
}

// Function to remove blinking effect from the current letter
function removeBlink(counter) {
  let currentLetter = document.querySelector(`.p${counter}`);
  currentLetter.classList.remove("active");
}

// Event listener for keyboard input
document.addEventListener("keydown", (e) => {
  // Check if the counter exceeds the letter sequence length
  if (counter >= letterSequence.length - 1) {
    // Reload the page when the sequence is completed
    location.reload();
  }

  // Check if the pressed key is a valid input (A-Z, a-z, or space)
  const isValidInput = /^[a-zA-Z\s]$/.test(e.key);

  if (!isValidInput) {
    // Ignore invalid inputs
    return;
  }

  let currentLetter = document.querySelector(`.p${counter}`);

  // Check if the pressed key matches the expected letter
  if (letterSequence[counter] !== e.key) {
    if (letterSequence[counter] == " ") {
      counter++;
      return;
    }

    // Handle incorrect input
    currentLetter.classList.add("wrongColor");
    removeBlink(counter);
    counter++;
    addBlink(counter);
    return;
  }

  // Handle correct input
  if (e.key == " ") {
    counter++;
    addBlink(counter);
    return;
  }

  currentLetter.classList.add("completeColor");
  removeBlink(counter);
  counter++;
  addBlink(counter);
});
