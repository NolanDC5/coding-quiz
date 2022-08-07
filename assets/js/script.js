var questionsEl = document.querySelector("#questions");
var paragraph1 = document.querySelector("#paragraph-pg1");
var optionsEl = document.querySelector("#options");
var highScoreBoxEl = document.querySelector('#high-score-box');
var submitButtonEl = document.querySelector('#submit-btn');


// var correctPopup = document.querySelector('#correct')
// var wrongPopup = document.querySelector('#wrong')
let countdown;

//sound fx
var soundFxCorrect = new Audio("audio/correct.mp3");
var soundFxWrong = new Audio("audio/wrong.mp3");

// set variable for the start button
var startButton = document.querySelector("#start-btn");
var timeSecond = questions.length *15;
// use new variable for button to create event listener for the click - everytime hit clicks it starts timer
startButton.addEventListener("click", function() {
    
    //timer within the function - https://www.youtube.com/watch?v=_a4XCarxwr8
    var countdownEl = document.querySelector("#time-sec");
    countdownEl.innerHTML =`00:${timeSecond}`;

    countdown = setInterval (()=>{
        timeSecond--;
        countdownEl.innerHTML =`00:${timeSecond}`;
        if(timeSecond <= 0 || timeSecond < 1){
            clearInterval(countdown);
            endQuiz();
        }
    },1000)
  });


  //START GAME BUTTON PRESS
  let currentQuestionIndex = 0;

  function startGame() {
    
    var currentQuestion = questions[currentQuestionIndex];

    startButton.className = "hide";
    optionsEl.classList.remove('hide');
    questionsEl.className = "hide";
    optionsEl.textContent = "";      // makes H1 go away

 
      // question
      var h1 = document.createElement("H1");
      h1.style.textAlign = "center";
      h1.textContent = questions[currentQuestionIndex].question;
      optionsEl.appendChild(h1);
 
     //answer    
    currentQuestion.options.forEach((answer, index) => {
      var buttonOption = document.createElement("button");
      buttonOption.setAttribute("class", "option-buttons")
      buttonOption.textContent  = `${index + 1}. ${answer}`;
      buttonOption.addEventListener('click', function () {
        answerClick(answer);
      });
    
      optionsEl.append(buttonOption)
    });
    
}
    function answerClick(answer) {
      console.log('answer function')
      if (answer === questions[currentQuestionIndex].answer) {
        //console.log("right answer")
        soundFxCorrect.play();
       // correctPopup.classList.remove('hide');
        //wrongPopup.className = "hide";
      } else {
        timeSecond = timeSecond-10;  // minus 10 if wrong
        //console.log("wrong answer")
        soundFxWrong.play()
       // wrongPopup.classList.remove('hide');
        //correctPopup.className = "hide";
      }
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length){
          endQuiz();
      } else {
        startGame();
      }


      }
  
// End the quiz, stop the clock and present final score
function endQuiz() {
  clearInterval(countdown);
  questionsEl.classList.remove('hide');
    questionsEl.textContent = "All done!";
    optionsEl.textContent = "Your final score is " + [timeSecond] + ".";
    optionsEl.setAttribute("class", "final-score-text")
    highScoreBoxEl.classList.remove('hide');
    highScoreBoxEl.setAttribute("class", "high-score-div")
}

    
function saveHighScores() {

  if (document.getElementById('input').value != "") {
    var highScores =
      JSON.parse(window.localStorage.getItem("highScores")) || [];

    // format new score object for current user
    var newScore = {
      initials: document.getElementById('input').value,
      score: timeSecond,
    };

    highScores.push(newScore);

    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    // redirect to next page
    window.location.href = "highscores.html";
  }

}



startButton.addEventListener("click", startGame);
    
submitButtonEl.addEventListener("click", saveHighScores);
    








        










   