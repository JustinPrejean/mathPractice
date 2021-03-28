const min = document.querySelector("#min");
const max = document.querySelector("#max");
const generateButton = document.querySelector("#generate");
const submitButton = document.querySelector("#submitButton");
const quitButton = document.querySelector("#quitButton");
const userResponse = document.querySelector("#response");

generateButton.addEventListener("click", (e) => {
  // make buttons active and clear answers/responses
  submitButton.disabled = false;
  quitButton.disabled = false;
  document.querySelector("#correctAnswer").innerHTML = "?";
  document.querySelector("#statement").innerHTML = "";
  userResponse.value = "";

  // get values from range inputs
  // if no numbers entered: 0-100 default range
  min.value ? (num1 = parseInt(min.value)) : (num1 = 0);
  max.value ? (num2 = parseInt(max.value)) : (num2 = 10);

  generateQuestion(num1, num2);
});

function generateQuestion(num1, num2) {
  // creates random numbers within range to use for equation
  // generates question in HTML
  let part1 = Math.round(Math.random() * (num2 - num1) + num1);
  let part2 = Math.round(Math.random() * (num2 - num1) + num1);
  let answer = part1 + part2;
  let operator = document.querySelector("#operator").value;
  const question = document.querySelector("#question");

  question.innerText = `${part1} ${operator} ${part2}`;
}

submitButton.addEventListener("click", (e) => {
  // submits answer and gives feedback based on how close answer is
  // disable buttons if correct
  e.preventDefault();
  let correctAnswer = eval(document.querySelector("#question").innerText);
  // if (correctAnswer.toString().indexOf(".") != -1) console.log("hello");
  if (userResponse.value == correctAnswer) {
    statement.innerHTML = "Great Job!";
    document.querySelector("#correctAnswer").innerHTML = "";

    disableButtons();
  } else {
    document.querySelector("#correctAnswer").innerHTML = "";
    let percentage = 0;
    let correct = correctAnswer;
    let user = parseInt(userResponse.value);

    correct > user
      ? (percentage = (user / correct) * 100)
      : (percentage = (correct / user) * 100);
    if (percentage > 90) {
      statement.innerHTML = "You're close!";
    } else if (percentage > 70) {
      statement.innerHTML = "You're getting there!";
    } else if (percentage > 50) {
      statement.innerHTML = "I still believe in you.";
    } else if (percentage > 0) {
      statement.innerHTML = "Maybe math isn't your thing";
    } else {
      statement.innerHTML = "You can do this";
    }
    if (correct != 0 && correct < 0 && correctAnswer * -1 == user) {
      statement.innerHTML = "I think you forgot something";
    }
  }
});

quitButton.addEventListener("click", (e) => {
  // gives answer and encouragment when clicked
  e.preventDefault();
  let correctAnswer = eval(document.querySelector("#question").innerText);
  // if (correctAnswer.toString().indexOf(".") != -1) console.log("hello");

  document.querySelector(
    "#correctAnswer"
  ).innerHTML = correctAnswer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.querySelector("#statement").innerHTML = "You'll get em next time!";
  disableButtons();
});

function disableButtons() {
  submitButton.disabled = true;
  quitButton.disabled = true;
}
