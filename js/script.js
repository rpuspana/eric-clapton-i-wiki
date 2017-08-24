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

    // Question constructor
    var Question;

    // number to use in loops
    var i;

    // variable that indicates the user's score
    // each correct answer accounts for 1 point
    // no input or wrong answer accounts for 0 points
    var keepUsrScore;

    // score of the user
    var userScore;


    // hide the custom popup when it's X button is clicked
    //document.getElementById("alertBox_close").addEventListener("click", function () {
    //    document.getElementById("alertBox_container").style.visibility = "hidden";
    //});

    //for(var i = 0; i < questionObjectArray[randomNumber].answers.length; i++) {
    //    document.getElementById("promptAnswerOption" + (i + 1)).textContent =
    //        "" + (i + 1) + ". " + questionObjectArray[randomNumber].answers[i];
        //    console.log("  %d. %s", i, questionObjectArray[randomNumber].answers[i]);
    //}

    document.getElementById("start-game-button").addEventListener("click", function(){

        // string entered by the user in custom popup
        var userAnswerPrompt;

        // free the memoty allocated in the last played game
        freeMemoryFromLastGame();

        // start a new game and initialise game variables
        initializeGame();

        // create an array of Question objects
        generateQuestions();
        console.info(questionObjectArray);

        // loop through the questions, display their text and evaluate user answer
        for(i = 0; i < questionObjectArray.length; i++) {

            // extract the question at id=randomNumner from the array and log it the console
            questionObjectArray[i].logQuestionToConsole();

            userAnswerPrompt = prompt("Enter the number next to the answer for each question in the browser's console." +
                                      "\nType \"q\" and press OK to quit the game at any moment.");

            // if the user entered something in the popup, check if the answer is correct
            // and display and appropiate message
            if (userAnswerPrompt !== "q") {
                questionObjectArray[i].checkAnswer(userAnswerPrompt);
                console.log("============================================");
            }
            else {
                console.info("User entered \"q\".");
                break;
            }
        }

        console.info("Your scored %d points from a maximum of %d points.", userScore, questionObjectArray.length);
        console.info("*** GAME OVER ***");
    });

    // set objects to null to free memory allocated in the last game
    function freeMemoryFromLastGame() {
        questionObjectArray = null;
        questions = null;
        answers = null;
        correctAnswers = null;
        keepUsrScore = null;
    }

    // initialize game variables
    function initializeGame() {

        console.info("*** START NEW GAME ***");

        // Question constructor method
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

        // Question method to see if the user answered correctly to a question by comparing his answer to
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

        // Question method check if the user answer to the question the script freezes is the correct one
        // usrInputPrompt  String  the input entered by the user in the prompt
        Question.prototype.checkAnswer = function(usrInputPrompt) {

            // userAnswer will be the number entered by the user or NaN if a string was
            // entered in the prompt or the Cancel button of the prompt was pressed or
            // if the prompt was closed.
            var userAnswer = parsePopupInput(usrInputPrompt);

            if ((isNaN(userAnswer) === false) && ((userAnswer - 1) === this.correctAnswer)) {
                console.info("The answer %O is correct !", usrInputPrompt);
                userScore = keepUsrScore(true);
            }
            else {
                console.info("The answer %O is wrong !", usrInputPrompt);
                userScore = keepUsrScore(false);
            }
            this.logUserScoreToConsole(userScore);
        }

        // Question method to print to the console the user score
        Question.prototype.logUserScoreToConsole = function(score) {
            console.info("Your total score is %d", score);
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

        // variable holding the function that increases the user's score if the answer was correct
        // aka. the closure of keepUserScore()
        keepUsrScore = keepUserScore();

        // reset questionObjectArray to an empty array so that the new Question instances can be inside
        questionObjectArray = [];
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

    // parse user input passed to the popup window
    // value  String  the value entered by the user in the prompt
    function parsePopupInput(value) {
        if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
          return parseInt(value, 10);
        }
        return NaN;
    }

    // keep and update user score
    function keepUserScore() {
        var userScore = 0;

        // this function increases the score if the user gave a correct answer and then return it
        // this function returns the score the user has if the answer to a question was wrong
        // each correct answer is worth 1 point
        return function(correctAnswer) {
            if (correctAnswer) {
                userScore++;
            }
            return userScore;
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



})();
