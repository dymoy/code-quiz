// Query Selector Variables 
var startButton = document.getElementById("start-btn");
var timerEl = document.getElementById("timer-left");
var timeEl = document.getElementById("time");
var landingDiv = document.getElementById("landing-div");

var quizDiv = document.getElementById("quiz-div");
var questionEl = document.getElementById("question");
var choiceA = document.getElementById("choice-a");
var choiceB = document.getElementById("choice-b");
var choiceC = document.getElementById("choice-c");
var choiceD = document.getElementById("choice-d");
var isCorrectEl = document.getElementById("is-correct-text");

// TODO: Add functionality to "View highscores" buttons

var currentQuestionIndex = 0;
// Create an array and store questions in index 0, answer choices in index 1, and the expected answer in index 2 
const questionsArray = [
    ["Inside which HTML element do we put JavaScript?", ["<javascript>", "<scripting>", "<js>", "<script>"], 3],
    ["Which of the following options is NOT a primitive data type of JavaScript?", ["String", "Boolean", "Alert", "Number"], 2],
    ["What is the correct syntax to define a function in JavaScript?", ["function myFunction() {...}", "function = myFunction() {...}", "function:myFunction() {...}", "new function = myFunction() {...}"], 0],
    ["How can you add a single-ling comment in a JavaScript file?", ["<!-- This is a comment -->", "\"This is a comment\"", "// This is a comment", "/* This is a comment */"], 2],
    ["Which even occurs when the user clicks on an HTML element?", ["onmouseclick", "onclick", "onchange", "onmouseover"], 1]
];

// This function will be called once the "Start" button is clicked 
function startQuiz() {
    currentQuestionIndex = 0;
    landingDiv.setAttribute("style", "display: none;");
    startTimer();
    showNextQuestion();
    quizDiv.setAttribute("style", "display: block;");
}

// This function will present the next question to the user.
function showNextQuestion() {
    // TODO: if (all questions were answered), allow user to save initials and score 
    questionEl.textContent = questionsArray[currentQuestionIndex][0];

    var thisChoiceList = questionsArray[currentQuestionIndex][1];
    choiceA.textContent = "A. " + thisChoiceList[0];
    choiceB.textContent = "B. " + thisChoiceList[1];
    choiceC.textContent = "C. " + thisChoiceList[2];
    choiceD.textContent = "D. " + thisChoiceList[3];
}

// This function evaluates whether the user's chosen answer is correct 
function evaluateAnswer(actualAnswer) {
    // Retrieve the correct answer from the answerKey array 
    var expectedAnswer = questionsArray[currentQuestionIndex][2];

    if (actualAnswer.value == expectedAnswer) {
        isCorrectEl.textContent = "Correct!";
    } else { 
        isCorrectEl.textContent = "Incorrect.";
         // TODO: deduct time if answer is incorrect 
    }
    
    // Resets the isCorrect element after 3 seconds 
    setTimeout(() => {
        isCorrectEl.textContent = '';
    }, 3000);

    // Show the next question 
    currentQuestionIndex++; 
    showNextQuestion();
}

// This function will create a time interval that will trigger every second 
function startTimer() { 
    var timeLeft = 90;

    var timeInterval = setInterval(function () {
        // Change the time color to red once it decrements to 30 seconds and lower. 
        if (timeLeft > 30) {
            timeEl.setAttribute("style", "color: blue;");
        } else {
            timeEl.setAttribute("style", "color: red;");
        }

        // Update the text within HTML to reflect the time remaining
        if (timeLeft > 1) {
            timeEl.textContent = `${timeLeft} seconds`;
            timeLeft--;
        } else if (timeLeft === 1) {
            timeEl.textContent = `${timeLeft} second`;
            timeLeft--;
        } else {
            timeEl.textContent = `${timeLeft} seconds`;
            clearInterval(timeInterval);
        }
    }, 1000);
    
    // TODO: once timer reaches 0 seconds, allow user to save initials and score
}

// Event Listeners 
startButton.addEventListener("click", startQuiz);