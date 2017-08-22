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

    // Question constructor
    var Question;

    // number to use in loops
    var i;

    // variable that indicates if the game is on or over
    var gameOver;

    // string entered by the user in custom popup
    var userAnswerPrompt;


    // hide the custom popup when it's X button is clicked
    //document.getElementById("alertBox_close").addEventListener("click", function () {
    //    document.getElementById("alertBox_container").style.visibility = "hidden";
    //});

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

    // loop through the questions, display their text and evaluate user answer
    for(i = 0; i < questionObjectArray.length; i++) {

        // extract the question at id=randomNumner from the array and log it the console
        questionObjectArray[i].logQuestionToConsole();

        userAnswerPrompt = prompt("Enter the number next to the answer for each question in the browser's console." +
               "\nAny other input, absence of input and clicking OK or closing the window will count as a wrong answer." +
               "\nType \"quit\" and press OK to quit the game at any moment.");

        // if the user entered something in the popup, check if the answer is correct
        // and display and appropiate message
        if (userAnswerPrompt !== "quit") {
            questionObjectArray[i].checkAnswer(userAnswerPrompt);
            console.log("============================================");
        }
        else {
            console.info("User entered \"quit\". The game is over.");
            break;
        }
    }


    // initialize game variables
    function initializeGame() {

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

        // check if the user answer to the question the script freezes is the correct one
        // usrInputPrompt  String  the input entered by the user in the prompt
        Question.prototype.checkAnswer = function(usrInputPrompt) {

            // userAnswer will be the number entered by the user or NaN if a string was
            // entered in the prompt or the Cancel button of the prompt was pressed or
            // if the prompt was closed.
            var userAnswer = parsePopupInput(usrInputPrompt);

            if ((isNaN(userAnswer) === false) && ((userAnswer - 1) === this.correctAnswer)) {
                console.info("The answer %O is correct !", usrInputPrompt);
            }
            else {
                console.info("The answer %O is wrong !", usrInputPrompt);
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

        gameOver = false;
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
    // value  String  the value entered by the user in the prompt
    function parsePopupInput(value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
          return parseInt(value, 10);
        }
        return NaN;
    }

})();
