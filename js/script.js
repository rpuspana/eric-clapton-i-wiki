/*
 * Game developer Radu Puspana
 * Developed in August 2017
 * Game version 1.0
 */


(function() {

// arary of Strings, the questions
var questions;

// the answers for each question that will be displayed on the page. The link between this structure and the questions array is the index. From these questions a user must select the correct answer
// E.g. answers[0] holds the answers to question[0]
var answers;

// array of correct answers to a specific question. The link between this structure and the questions array is the index
// E.g. correctAnswers[0] holds the correct answer for question[0]
var correctAnswers;

// array of Question objects
var questionObjectArray = [];

// the first index of the questions array
var firstIdxQuestionsArray;

// last index of the questions array
var lastIdxQuestionsArray;

// string entered by the user in custom popup
var userAnswer;

// Question constructor
var Question;


// hide the custom popup when it's X button is clicked
document.getElementById("alertBox_close").addEventListener("click", function () {
    document.getElementById("alertBox_container").style.visibility = "hidden";
});

//for(var i = 0; i < questionObjectArray[randomNumber].answers.length; i++) {
//    document.getElementById("promptAnswerOption" + (i + 1)).textContent =
//        "" + (i + 1) + ". " + questionObjectArray[randomNumber].answers[i];
    //    console.log("  %d. %s", i, questionObjectArray[randomNumber].answers[i]);
//}


// set game variable
initializeGame();

// create an array of Question objects
generateQuestions();
console.info(questionObjectArray);

//for(int i = 1)
displayQuestionAndScoreUserAnswer();











// initialize game variables
function initializeGame() {

    // user answer default value
    // from the value subtracted from the user 1 will be subtrarcted in order to match
    // a value from correctAnswers array.
    userAnswer = 4;

    // Question constructor
    Question = function(questionText, answers, correctAnswer) {
        this.questionText = questionText;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    };

    // Question method to log the question to the console
    Question.prototype.logQuestionToConsole = function() {
        console.log("%s\n1. %s\n2. %s\n3. %s",
                    this.questionText,
                    this.answers[0],
                    this.answers[1],
                    this.answers[2]);
    };

    // see if the user answered correctly to a question by comparing his answer to
    // the object's correctAnswer property.
    // return true if this.correctAnswer and userAnswer string match
    Question.prototype.isUserAnswerValid = function(userAnswer) {
        if (this.correctAnswer === userAnswer) {
            return true;
        }
        else {
            return false;
        }
    };

    Question.prototype.checkAnswer = function(usrInput) {
        if ((usrInput - 1) === this.correctAnswer) {
            console.log("CORRECT!");
        }
        else {
            console.log("WRONG! Please try again.");
        }
    }

    questions = [
        "How did Eric Clapton learn to play the guitar ?",
        "What was the name of the first band Eric Clapton played in ?",
        "What band was Eric Clapton a member of along with Jack Bruce and Ginger Baker ?"
    ];

    answers = [
        ["By going to classes", "By meeting and playing with friends", "Self-studying"],
        ["Yardbirds", "Faces", "The who"],
        ["Traffic", "The Yardbirds", "Cream"]
    ];

// if i is the index of this array:
// questions[i]      =  question
// answers[i]        =  answers of question[i]
// correctAnswers[i] =  index of correct answer in answers[i]
//                   =  answers[i][correctAnswers[i]] =
//                   =  correct answer to questions[i]
    correctAnswers = [2, 0, 2];

    // based on the questions array length, establish the
    // first and last index of this array
    if (questions.length >= 1) {
        firstIdxQuestionsArray = 0;
        lastIdxQuestionsArray = questions.length - 1;
    }
}

// create an array of Question objects
function generateQuestions() {
    var i;
    for (i = 0; i < questions.length; i = i + 1) {
        questionObjectArray.push(
            new Question(questions[i], answers[i], correctAnswers[i])
        );
    }
}

function displayQuestionAndScoreUserAnswer(questionNumber) {

    console.log(questionNumber);

    // extract the question at id=randomNumner from the array and log it the console
    questionObjectArray[questionNumber].logQuestionToConsole();

    // display popup
    //displayPopup("<p>Enter the number next to the question in the console.<br>" +
    //             "Any other number or no input is a wrong answer.</p>",
    //             "prompt");
    userAnswer = parsePopupInput(prompt("Enter the number next to the question in the console." +
           "\nAny other number or no input is a wrong answer."));

    // add click event to the popup's OK
    //document.getElementById("alert_box_OK_button").addEventListener("click", function () {
    //    userAnswer = parsePopupInput(document.getElementById('ptext').value);
    //    console.log(promptUserAnswer);
    //    document.getElementById("ptext").value = "";
    //    document.getElementById("alertBox_container").style.visibility = "hidden";
    //});

    // if the user entered something in the popup, check if the answer is correct
    // and display and appropiate message
    if (isNaN(userAnswer) === false) {
        questionObjectArray[randomNumber].checkAnswer(userAnswer);
        console.log("============================================");
    }
}

// create and display a custom popup window
// text  String  body text to be displayed in the popup
// type  String  type of popup to be displayed
function displayPopup(text, type) {

    var field = '<div><input id="ptext" class="field" type="text"></div>';

    var button, popupColor;

    if (type === "err") {
        button = '<div id="alertBox_button_div"><input id="err_alert_box_button" class="button" type="button" value="OK" alt="OK"></div>';
        document.getElementById('alertBox_text').innerHTML = text + button;
        popupColor = "#D32C34";
    }
    else if (type === "ok") {
         button = '<div id="alertBox_button_div"><input id="ok_alert_box_button" class="button" type="button" value="OK" alt="OK"></div>';
        document.getElementById('alertBox_text').innerHTML = text + button;
        popupColor = "green";
    }
    else if (type === "prompt") {
        button = '<div id="alertBox_button_div"><input id="alert_box_OK_button" class="button" type="button" value="OK" alt="OK"></div>';
        document.getElementById('alertBox_text').innerHTML = text + field + button;
        popupColor = "green";
    }
    else {
        document.getElementById('alertBox_text').innerHTML = text;
        popupColor = "#D32C34";
    }

    document.getElementById('alertBox_text').style.top = "25%";
    document.getElementById('alertBox_container').style.backgroundColor = popupColor;
    document.getElementById('alertBox_container').style.visibility = "visible";
}

// parse user input passed to the popup window
// value  String  the value entered by the user in the popup
function parsePopupInput(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
      return parseInt(value, 10);
  }
  return NaN;
}

})();
