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
var gameOverDiv = document.getElementById("game-over-div");
var gameOverMsg = document.getElementById("game-over-msg");
var scoreEl = document.getElementById("score");
var submitInitialsButton = document.getElementById("submit-initials-btn");
var highscoresDiv = document.getElementById("highscores-div");
var highscoresListEl = document.getElementById("highscores-list");
var initials = document.getElementById("initials-box");

var timeLeft;
var timeInterval; 
var currentQuestionIndex;
var scoreIndex = 1;

// Create an array and store questions in index 0, answer choices in index 1, and the expected answer in index 2 
const questionsArray = [
    ["Inside which HTML element do we put JavaScript?", ["<javascript>", "<scripting>", "<js>", "<script>"], 3],
    ["Which of the following options is NOT a primitive data type of JavaScript?", ["String", "Boolean", "Alert", "Number"], 2],
    ["What is the correct syntax to define a function in JavaScript?", ["function myFunction() {...}", "function = myFunction() {...}", "function:myFunction() {...}", "new function = myFunction() {...}"], 0],
    ["How can you add a single-line comment in a JavaScript file?", ["<!-- This is a comment -->", "\"This is a comment\"", "// This is a comment", "/* This is a comment */"], 2],
    ["Which even occurs when the user clicks on an HTML element?", ["onmouseclick", "onclick", "onchange", "onmouseover"], 1]
];

// Shows highscore list after submitting initials 
function showHighscores(event) {
    // If the 'View Highscores' button is clicked, show current highscores 
    if (event.id === 'view-scores-btn') {
        landingDiv.setAttribute('style', 'display: none;');
        quizDiv.setAttribute('style', 'display: none;');
        gameOverDiv.setAttribute('style', 'display: none;');
        highscoresDiv.setAttribute('style', 'display: block;');
    } else {
        // If the text box is empty or only contains whitespace, alert the user to enter input
        if (initials.value === '') {
            alert("Please enter your initials to save your score.");
            return;
        }
    
        gameOverDiv.setAttribute("style", "display: none;");
        highscoresDiv.setAttribute("style", "display: block;");
    
        // Create a <li> element in the document 
        var newScore = document.createElement("li");
        newScore.className = 'highscore';
        newScore.textContent = `${scoreIndex}. ${initials.value.trim()} - ${scoreEl.textContent}`;

        // Append newly created list item into the unordered list 
        highscoresListEl.appendChild(newScore);
        scoreIndex++;
    }
}

// This function will remove all highscores from the list 
function clearHighscores() { 
    scoreIndex = 1;
    while (highscoresListEl.hasChildNodes) {
        highscoresListEl.removeChild(highscoresListEl.firstChild);
    }
}

function resetToLanding() {
    highscoresDiv.setAttribute("style", "display: none;");
    landingDiv.setAttribute("style", "display: block;");
}

// This function will be called once the "Start" button is clicked
function startQuiz() {
    // Reset timer 
    timeLeft = 60;
    timeInterval = setInterval(startTimer, 1000);
    initials.value = '';

    // Reset question
    currentQuestionIndex = 0;
    showNextQuestion();

    // Show quiz 
    landingDiv.setAttribute("style", "display: none;");
    gameOverDiv.setAttribute("style", "display: none;");
    quizDiv.setAttribute("style", "display: block;");
}

// This function will present the next question to the user
function showNextQuestion() {
    if (currentQuestionIndex >= questionsArray.length) {
        // If all questions of the quiz have been answered, it is game over
        gameOver();
    } else {
        // If there are still quiz questions remaining, show the next question
        questionEl.textContent = questionsArray[currentQuestionIndex][0];

        var thisChoiceList = questionsArray[currentQuestionIndex][1];
        choiceA.textContent = "A. " + thisChoiceList[0];
        choiceB.textContent = "B. " + thisChoiceList[1];
        choiceC.textContent = "C. " + thisChoiceList[2];
        choiceD.textContent = "D. " + thisChoiceList[3];
    }
}

// This function will end the quiz
function gameOver() {
    // Hide quiz-div selement and show game-over-div 
    quizDiv.setAttribute("style", "display: none;");
    gameOverDiv.setAttribute("style", "display: block");

    // Stop the timer from decrementing
    stopTimer();
    
    // If the score goes below 0 on the last question, default the final score to 0 
    if (timeLeft <= 0) { 
        timeLeft = 0;
        timeEl.textContent = `${timeLeft} seconds`;
        gameOverMsg.textContent = "You ran out of time!"

    } else {
        gameOverMsg.textContent = "All done!";
    }

    scoreEl.textContent = timeLeft;
}

// This function evaluates whether the user's chosen answer is correct 
function evaluateAnswer(actualAnswer) {
    // Retrieve the correct answer from the answerKey array 
    var expectedAnswer = questionsArray[currentQuestionIndex][2];

    if (actualAnswer.value == expectedAnswer) {
        isCorrectEl.textContent = "Correct!";
    } else { 
        isCorrectEl.textContent = "Incorrect. Time was deducted.";
        // Deduct time if the chosen answer is incorrect 
        timeLeft -= 10;
    }
    
    // Resets the isCorrect element to an empty string after 3 seconds 
    setTimeout(() => {
        isCorrectEl.textContent = '';
    }, 3000);

    // Show the next question 
    currentQuestionIndex++; 
    showNextQuestion();
}

// This function will create a time interval that will trigger every second 
function startTimer() { 
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
        // Once timer reaches 0 seconds, it's game over. 
        gameOver();
    }
}

// This function updates the time in HTML and stops the timer. 
function stopTimer () {
    timeEl.textContent = `${timeLeft} seconds`;
    clearInterval(timeInterval);
}