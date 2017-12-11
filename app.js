'use strict';

//In-memory database of questions
const questionList = [

  //First question
  {
    question: 'What planet is Rey from?',
    answerOptions: [
      'Jakku',
      'Tatooine',
      'Endor',
      'Taris'
    ],
    correctAnswer: 'Jakku',
    answerSelect: 1
  },
  //Second question
  {
    question: 'What color is Lukes lightsaber in Return of the jedi?',
    answerOptions: [
      'Purple',
      'Blue',
      'Green',
      'Red'
    ],
    correctAnswer: 'Green',
    answerSelect: 2
  },
  //Third question
  {
    question: 'What is the group of dark side users that Kylo Ren leads?',
    answerOptions: [
      'Knights of Ren',
      'The First Order',
      'The Sith Order',
      'Acolytes of Snoke'
    ],
    correctAnswer: 'Knights of Ren',
    answerSelect: 3
  },
  //Fourth Question
  {
    question: 'What movie does Emperor Palpatine first appear in?',
    answerOptions: [
      'Episode 6',
      'Episode 5',
      'Episode 1',
      'Episode 4'
    ],
    correctAnswer: 'Episode 5',
    answerSelect: 4
  },
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
function nextQuestion () {

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
