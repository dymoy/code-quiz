// Query Selector Variables 
var startButton = document.getElementById("start-btn");
var timerEl = document.getElementById("timer-left");
var timeEl = document.getElementById("time");

function startQuiz() {
    startTimer();
}


function startTimer() { 
    var timeLeft = 90;

    var timeInterval = setInterval(function () {
        if (timeLeft > 30) {
            timeEl.setAttribute("style", "color: blue;");
        } else {
            timeEl.setAttribute("style", "color: red;");
        }

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