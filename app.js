'use strict';

//In-memory database of questions
const questionList = [

];

//Initial store
const store = {
  view: 'start',
  score: 0,
};


//Template generators


//Rendering Functions
function render(){
  if (store.view === 'start'){
    $('.start').show();
    $('.quiz').hide();
    $('.results').hide();
  }
  else if (store.view === 'quiz') {
    $('.quiz').show();
    $('.start').hide();
    $('.results').hide();
  }
  else if (store.view === 'results') {
    $('.results').show();
    $('.start').hide();
    $('.quiz').hide();
  }
}



//Event handlers
function nextScene () {

}

function handleStartButton() {

  $(".start").on("click",".js-start-btn", function () {
    console.log("js-start-btn was clicked.");

    store.view = "quiz";

    render();

  });


}

function handleSubmitButton () {
  $("#quiz-form").submit(function (event) {
    event.preventDefault();
    console.log("js-submit-btn was clicked.");

    render();

  });
}

function handleNextQuestionButton () {
  $(".quiz").on("click",".js-next-question-btn", function () {
    console.log("js-next-question-btn was clicked.");

    store.view = "results";
    render();

  });
}

function handleStartOverButton () {
  $(".results").on("click",".js-startover-btn", function () {
    console.log("js-startover-btn was clicked.");

    store.view = "start";

    render();

  });
}
//Function that initializes all event listeners when DOM is ready
function handleQuizEventListeners() {
  nextScene();
  handleStartButton();
  handleNextQuestionButton();
  handleSubmitButton();
  handleStartOverButton();
  render();
}

$(handleQuizEventListeners);
