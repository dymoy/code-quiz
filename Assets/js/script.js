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

const currentQuestion = 0;
const questionsArray = [
    ["Inside which HTML element do we put JavaScript?", ["<javascript>", "<scripting>", "<js>", "<script>"]]
];
const answerKey = [3];

// This function will be called once the "Start" button is clicked 
function startQuiz() {
    landingDiv.setAttribute("style", "display: none;");
    startTimer();
    showNextQuestion();
    quizDiv.setAttribute("style", "display: block;");
}

// This function will present the next question to the user.
function showNextQuestion() {
    questionEl.textContent = questionsArray[currentQuestion][0];

    var thisChoiceList = questionsArray[currentQuestion][1];
    choiceA.textContent = "A. " + thisChoiceList[0];
    choiceB.textContent = "B. " + thisChoiceList[1];
    choiceC.textContent = "C. " + thisChoiceList[2];
    choiceD.textContent = "D. " + thisChoiceList[3];
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
    
    // TODO: once timer reaches 0 seconds, do something
}

startButton.addEventListener("click", startQuiz);