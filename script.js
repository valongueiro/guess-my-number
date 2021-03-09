"use strict";

const buttonAgain = document.querySelector(".again");
const buttonCheck = document.querySelector(".check");
const inputGuess = document.querySelector(".guess");
const labelSecretNumber = document.querySelector(".number");
const labelMessage = document.querySelector(".message");
const labelScore = document.querySelector(".score");
const labelHighScore = document.querySelector(".highscore");

let score = 20;
let highScore = 0;

// Generating a random number between 1 and 20
let secretNumber = Math.trunc(Math.random() * 20) + 1;

const checkGuess = function () {
  const guessNumber = Number(inputGuess.value);

  if (isGameFinished()) return;

  if (guessNumber) {
    if (guessNumber === secretNumber) playerWins();
    else {
      const hint = guessNumber > secretNumber ? "📈 Too High!" : "📉 Too Low!";
      labelMessage.textContent = hint;
      decreaseScore();
    }
  } else labelMessage.textContent = "No Number ⛔️";
};

const isGameFinished = () => (!score ? true : false);

const playerWins = function () {
  document.body.style.backgroundColor = "#60B347";
  labelMessage.textContent = "🎉 Correct Number!";
  labelSecretNumber.textContent = secretNumber;
  labelSecretNumber.style.width = "30rem";
  inputGuess.disabled = true;
  checkHighScore();
};

const checkHighScore = function () {
  if (score > highScore) {
    highScore = score;
    labelHighScore.textContent = highScore;
  }
};

const decreaseScore = function () {
  score--;
  if (score > 0) labelScore.textContent = score;
  else playerLose();
};

const playerLose = function () {
  labelMessage.textContent = "💥 You lost the game!";
  labelScore.textContent = 0;
  inputGuess.disabled = true;
};

const resetGame = function () {
  document.body.style.removeProperty("background-color");
  labelMessage.textContent = "Start guessing...";
  labelSecretNumber.textContent = "?";
  labelSecretNumber.style.width = "15rem";
  score = 20;
  labelScore.textContent = score;
  inputGuess.disabled = false;
  inputGuess.value = "";
  inputGuess.focus();

  secretNumber = Math.trunc(Math.random() * 20) + 1;
};

// Attaching event handlers to UI
document.addEventListener("DOMContentLoaded", inputGuess.focus());

buttonCheck.addEventListener("click", checkGuess);
inputGuess.addEventListener("keydown", function (event) {
  if (event.key === "Enter") checkGuess();
});

buttonAgain.addEventListener("click", resetGame);
