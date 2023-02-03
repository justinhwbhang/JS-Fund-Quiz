var timer = document.querySelector("#timer");
var startScreen = document.querySelector("#startScreen");
var startButton = document.querySelector("#startBtn");
var questionTitle = document.querySelector("#question");
var quizScreen = document.querySelector("#quiz-screen");
var result = document.querySelector(".feedback");
var finalScore = document.querySelector("#currentScore");
var gameOverScreen = document.querySelector("#gamerOver");
var userInitials = document.querySelector("#initials").value;
var submitInitials = document.querySelector("#submitBtn");
var highScoreScreen = document.querySelector("#highscores");
var viewHighScores = document.querySelector(".view-highscores");
var highScoreDisplay = document.querySelector("#highScoreDisplay");
var clearHighScores = document.querySelector("#clearBtn");
var goBack = document.querySelector("#goBackBtn");

var btn1 = document.querySelector("#btn1");
var btn2 = document.querySelector("#btn2");
var btn3 = document.querySelector("#btn3");
var btn4 = document.querySelector("#btn4");

var currentTime = timer.textContent;
var currentQuestion = 0;

//This will initialize the high score to 0 if there isn't one in local storage. 
var highScore = localStorage.getItem("highscore");
if (highScore === null) {
    localStorage.setItem("highScore", 0);
    highScore = 0;
}

var questions = [
    {
        ask: "What is the correct way to write a JavaScript array?",
        answers: [
            "var colors = (1:'red', 2:'green', 3:'blue')",
            "var colors = 1 = ('red'), 2 = ('green')",
            "var colors = ['red', 'green', 'blue']",
            "var colors = 'red', 'green', 'blue'"
        ],
        correctAnswer: "var colors = ['red', 'green', 'blue']"
    },
    {
        ask: "What is the correct way to write a JavaScript object?",
        answers: [
            "var person = ('John', 'Doe', '25')",
            "var person = {'firstName':'John', 'lastName':'Doe', 'age':25}",
            "var person = 'firstName':'John', 'lastName':'Doe', 'age':25",
            "var person = 1 = ('John'), 2 = ('Doe'), 3 = ('25')"
        ],
        correctAnswer: "var person = {'firstName':'John', 'lastName':'Doe', 'age':25}"
    },
    {
        ask: "What is the correct way to write a JavaScript function?",
        answers: [
            "function myFunction()",
            "function:myFunction()",
            "myFunction()",
            "var myFunction = function()"
        ],
        correctAnswer: "function myFunction()"
    },
    {
        ask: "What is the correct way to write a JavaScript loop?",
        answers: [
            "for i = 0 to 10",
            "for (i <= 10; i++)",
            "for (var i = 0; i < 10; i++)",
            "for (i = 0; i < 10; i++)"
        ],
        correctAnswer: "for (var i = 0; i < 10; i++)"
    },
    {
        ask: "What is the correct way to write a JavaScript conditional statement?",
        answers: [
            "if i = 0",
            "if (i == 0)",
            "if i == 0 then",
            "if i = 0 then"
        ],
        correctAnswer: "if (i == 0)"
    },
    {
        ask: "What is the correct way to write a JavaScript variable?",
        answers: [
            "var x",
            "x",
            "v x",
            "variable x"
        ],
        correctAnswer: "var x"
    },
    {
        ask: "What is the correct way to write a JavaScript string?",
        answers: [
            "var name = John Doe",
            "var name = 'John Doe'",
            "var name = John + ' ' + Doe",
            "name John Doe"
        ],
        correctAnswer: "var name = 'John Doe'"
    },
    {
        ask: "What is the correct way to write a JavaScript function call?",
        answers: [
            "myFunction()",
            "call myFunction",
            "myFunction.call()",
            "function myFunction()"
        ],
        correctAnswer: "myFunction()"
    }
]

function quizQuestion(timerInterval) {
    checkTime(timerInterval);

    // This checks to make sure the questions have not all been answered before displaying on the page.
    if (currentQuestion < questions.length) {
        questionTitle.textContent = questions[currentQuestion].ask;

        btn1.textContent = questions[currentQuestion].answers[0];
        btn2.textContent = questions[currentQuestion].answers[1];
        btn3.textContent = questions[currentQuestion].answers[2];
        btn4.textContent = questions[currentQuestion].answers[3];
    } else {
        gameOver();
    }
}

function checkAnswer() {
    this.style.outline = "none";

    if ((this.textContent) == (questions[currentQuestion].correctAnswer)) {
        result.textContent = "Correct!";
    } else {
        currentTime -= 10;
        result.textContent = "Wrong!";
        if (currentTime < 1) {
            gameOver();
        }
    }

    currentQuestion++;

    quizQuestion();
}

function checkTime(timerInterval) {
    if (currentQuestion == questions.length) {
        clearInterval(timerInterval);
        gameOver();
    } else if (currentTime <= 0) {
        timer.textContent = 0;
        currentTime = 0;
        clearInterval(timerInterval);
        gameOver();
    }
}

function gameOver() {
    quizScreen.style.display = "none";
    result.style.display = "none";
    gameOverScreen.classList.remove("d-none");

    if (currentTime > parseInt(localStorage.getItem("highScore"))) {
        finalScore.textContent = ("Your final score is " + currentTime + ".");
    } else {
        finalScore.textContent = ("Your final score is " + currentTime + ".");
    }
}

function resetGame() {

    localStorage.setItem("highScore", currentTime);
    localStorage.setItem(userInitials, currentTime);

    // viewHighScores trigger click 
    viewHighScores.click();
}

startButton.addEventListener("click", function () {
    var timerStart = setInterval(function () {
        currentTime--;
        timer.textContent = currentTime;
        checkTime(timerStart);
    }, 1000)

    startScreen.style.display = "none";
    // remove class d-none from quizScreen
    quizScreen.classList.remove("d-none");

    quizQuestion(timerStart);
})

var buttons = document.querySelectorAll(".answerOption").forEach(function (item) {
    item.addEventListener("click", checkAnswer);
})

submitInitials.addEventListener("click", function (event) {
    event.preventDefault();

    userInitials = initials.value.trim();
    resetGame();
})

viewHighScores.addEventListener("click", function () {
    startScreen.style.display = "none";
    quizScreen.style.display = "none";
    gameOverScreen.style.display = "none";
    highScoreScreen.classList.remove("d-none");

    var highScore = localStorage.getItem("highScore");
    highScoreDisplay.textContent = highScore;
})

goBack.addEventListener("click", function () {
    startScreen.classList.remove("d-none");
    startScreen.style.display = "block";
    highScoreScreen.style.display = "none";
    highScoreScreen.classList.add("d-none");
})

clearHighScores.addEventListener("click", function () {
    localStorage.clear();
    highScoreDisplay.textContent = "";
})