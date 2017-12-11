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
    answerSelect: 1,
    questionAsked: false,
  },
  //Second question
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answerOptions: [
      'Purple',
      'Blue',
      'Green',
      'Red'
    ],
    correctAnswer: 'Green',
    answerSelect: 2,
    questionAsked: false,
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
    answerSelect: 3,
    questionAsked: false,
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
    answerSelect: 4,
    questionAsked: false,
  },
];

//Initial store
const store = {
  view: 'start',
  score: 0,
  submitBtnClicked: false,
};


//Template generators

let randomQuestion;
let counter = 0;
const objs = [];
function generateRandomQuestion() {
  let availableQs = questionList.filter(function (n){
    return n.questionAsked === false;
  });
  let max = availableQs.length - 1;
  let min = 0;
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  randomQuestion = availableQs[random];

  console.log(random);
  console.log(availableQs);

  randomQuestion.questionAsked = true;

  // arr = list of objs that have questionAsked set as true
  // counter = arr.length

  //
//   questionList[random].questionAsked = true;
//   //
// // retrieve how many of ur obj have questionAsked set to true.
// //
//
//   let s = questionList.forEach(function (obj) {
//     console.log("nope?");
//     console.log(obj.questionAsked);
//      return obj.questionAsked === true;
//   });
//
//   console.log("!!!!");
//   console.log(s);
//
//   // if (counter !== questionList.length){
//   //   // return
//   // }
//   //
//   // if (randomQuestion.questionAsked === true) {
//   //   counter++;
//   //   generateRandomQuestion();
//   // }

  console.log(random);
  //Match randomQuestion's answerSelect value to the answerSelect
  //in original array of objects, (find) then change questionAsked
  //of original object.questionAsked if there's a match
  // console.log(questionList[random].questionAsked);
  return randomQuestion;
}



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

function generateAnswerList(QuestionGenerator) {
  QuestionGenerator();
  console.log(randomQuestion);
  $('.question-title-container').html(`${randomQuestion.question}`)
  $('.question-list').html(`<input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[0]}'>
  <label for="form-option-1">${randomQuestion.answerOptions[0]}</label>
  <input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[1]}'>
  <label for="form-option-2">${randomQuestion.answerOptions[1]}</label>
  <input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[2]}'>
  <label for="form-option-3">${randomQuestion.answerOptions[2]}</label>
  <input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[3]}'>
  <label for="form-option-4">${randomQuestion.answerOptions[3]}</label>`)
  ;
}




//Event handlers
// function nextQuestion () {
// }

function handleStartButton() {
  $('.start').on('click','.js-start-btn', function () {
    console.log('js-start-btn was clicked.');
    store.view = 'quiz';
    render();
  });
}

function handleSubmitButton () {
  $('#quiz-form').submit(function (event) {
    event.preventDefault();
    console.log('js-submit-btn was clicked.');
    store.submitBtnClicked = true;
    console.log(store.submitBtnClicked);
  });
}

function handleNextQuestionButton () {
  $('.quiz').on('click','.js-next-question-btn', function () {
    console.log('js-next-question-btn was clicked.');
    event.preventDefault();
    if (store.submitBtnClicked === true) {
      store.submitBtnClicked = false;
      console.log(store.submitBtnClicked);
      generateAnswerList(generateRandomQuestion);
    }
  });
}

function handleStartOverButton () {
  $('.results').on('click','.js-startover-btn', function () {
    console.log('js-startover-btn was clicked.');
    store.view = 'start';
    render();
  });
}
//Function that initializes all event listeners when DOM is ready
function handleQuizEventListeners() {
  render();
  handleStartButton();
  handleNextQuestionButton();
  handleSubmitButton();
  handleStartOverButton();
  generateAnswerList(generateRandomQuestion);
}

$(handleQuizEventListeners);
