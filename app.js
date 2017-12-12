'use strict';

//In-memory database of questions
let questionList = defaultQuestionList();

//Initial store
let store = defaultStore();

function defaultStore() {
  return {
    view: 'start',
    score: 0,
    currentQuestionCount: 1,
    submitBtnClicked: false,
    // quizCompleted: false,
    randomQuestion: null,
    answerSubmitted: false,
  };
}

function defaultQuestionList() {
  return [ //First question
    {
      question: 'Inside which HTML element do we put the JavaScript?',
      answerOptions: [
        'scripting',
        ' js',
        'javascript',
        'script'
      ],
      correctAnswer: 'script',
      questionAsked: false,
    },
    //Second question
    {
      question: 'What is an argument?',
      answerOptions: [
        'The function’s parameters upon declaration',
        'A variable that gets passed to the function when its called.',
        'A function that has no parameters',
        'A variable assigned to a function'
      ],
      correctAnswer: 'A variable that gets passed to the function when its called.',
      questionAsked: false,
    },
    //Third question
    {
      question: 'Which value is ‘falsy’?',
      answerOptions: [
        '2',
        '“False”',
        '“”',
        '‘Truthy’'
      ],
      correctAnswer: '""',
      questionAsked: false,
    },
    //Fourth Question
    {
      question: 'what is typeof x for: var y = 1, x = y = typeof x;',
      answerOptions: [
        '"number"',
        'undefined',
        '"undefined"',
        'x'
      ],
      correctAnswer: '"undefined"',
      questionAsked: false,
    },
    //Fifth Question
    {
      question: 'Which will correctly comment out the text?',
      answerOptions: [
        '// “Test Text” //',
        '/“Test Text”/',
        '*/ “Test Text” /*',
        '\\ “Test Text \\'
      ],
      correctAnswer: '// “Test Text” //',
      questionAsked: false,
    },
    //Sixth Question
    {
      question: 'For ECMAscript, what does ECMA stand for?',
      answerOptions: [
        'European Association for Standardizing Information and Communication Systems',
        'European Council for Making and Arranging JavaScript Principles',
        'European Association for Strategizing Implementation of Communication Systems',
        'European Antarctican Massachusetts Alliance for JavaScript'
      ],
      correctAnswer: 'European Association for Standardizing Information and Communication Systems',
      questionAsked: false,
    },
    //Seventh Question
    {
      question: 'What does the following run in the console: "The morning is upon us.".slice(-3)',
      answerOptions: [
        '"us."',
        'undefined',
        '"the morning is upon us"',
        'us'
      ],
      correctAnswer: '"us."',
      questionAsked: false,
    },
  ];
}

//Template generators
function generateRandomQuestion() {
  let availableQs = questionList.filter(function (n){
    return n.questionAsked === false;
  });
  if (availableQs.length === 0) {
    // store.quizCompleted = true;
    return null;
  }
  let max = availableQs.length - 1;
  let min = 0;
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  store.randomQuestion = availableQs[random];
  console.log(random);
  console.log(availableQs);
  store.randomQuestion.questionAsked = true;
  return store.randomQuestion;
}

/////Rendering Functions//////
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
    checkSubmitBtnClicked();
    updateCounter();
    checkQuizCompleted();
    (generateAnswerList(generateRandomQuestion));
    resetCorrectUpdaterHtml();
  }
  else if (store.view === 'results') {
    $('.results').show();
    $('.start').hide();
    $('.quiz').hide();
    changeCounter();
  }
}

function generateAnswerList(generateRandomQuestion) {
  generateRandomQuestion();
  console.log(store.randomQuestion);
  $('.question-title-container').html(
    `<div class='question-counter'>
    Question # ${store.currentQuestionCount}
    <span class="separator">: </span>
    <span class="question">${store.randomQuestion.question}</span> </div>`);

  $('.question-list').html(`
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${store.randomQuestion.answerOptions[0]}' required>
  <label for="form-option-1">${store.randomQuestion.answerOptions[0]}</label>
  </div>
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${store.randomQuestion.answerOptions[1]}' required>
  <label for="form-option-2">${store.randomQuestion.answerOptions[1]}</label>
  </div>
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${store.randomQuestion.answerOptions[2]}' required>
  <label for="form-option-3">${store.randomQuestion.answerOptions[2]}</label>
  </div>
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${store.randomQuestion.answerOptions[3]}' required>
  <label for="form-option-4">${store.randomQuestion.answerOptions[3]}</label></div>`)
  ;
}

function updateCounter() {
    $('.correct-counter').html(`Progress: ${store.score} / ${questionList.length}`);

}

function changeCounter() {
  $('.correct-counter').html(`Quiz Results: ${store.score} / ${questionList.length}`);
}

function checkCorrectAnswer() {
  let submittedAnswer = $('input[name=\'clicked-question\']:checked').val();
  console.log(store.submitBtnClicked);
  if (submittedAnswer === store.randomQuestion.correctAnswer) {
    console.log('You got it right!');
    userCorrectAnswerSubmitted(submittedAnswer);
  }
  else {
    userInCorrectAnswerSubmitted(submittedAnswer);
  }
}

function checkSubmitBtnClicked () {
  if (store.submitBtnClicked === true) {
    store.currentQuestionCount++;
    store.submitBtnClicked = false;
    console.log(store.submitBtnClicked);
  }
}

function checkQuizCompleted () {
  console.log(store.currentQuestionCount);
  console.log(questionList.length);
  if (store.currentQuestionCount === questionList.length) {
    store.view = 'results';
  }
}

function resetCorrectUpdaterHtml() {
  if (store.answerSubmitted === false) {
    $('.correct-updater').html('');
  }
}

//Function that handles if the user was incorrect
function userInCorrectAnswerSubmitted(answer) {
  $('.correct-updater').html(`Incorrect! The correct answer is: ${store.randomQuestion.correctAnswer}`);
}

//Function that handles if the user was correct
function userCorrectAnswerSubmitted(answer) {
  store.score++;
  $('.correct-updater').html('Correct!');
}

//////Event handlers//////


//Button that handles when the start button is clicked.
function handleStartButton() {
  $('.start').on('click','.js-start-btn', function () {
    store.view = 'quiz';
    render();
  });
}

//Button that handles when the submit button is clicked.
function handleSubmitButton () {
  $('#quiz-form').submit(function (event) {
    event.preventDefault();
    console.log('js-submit-btn was clicked.');
    if (store.submitBtnClicked === false) {
      store.submitBtnClicked = true;
      console.log(store.submitBtnClicked);
      checkCorrectAnswer();
      updateCounter();
    }
  });
}

//Handles when the user clicks next question
function handleNextQuestionButton () {
  $('.quiz').on('click','.js-next-question-btn', function () {
    console.log('js-next-question-btn was clicked.');
    event.preventDefault();
    // checkSubmitBtnClicked();
    render();
  });
}

//Restarts the game, sets store to defult, and renders current
//state.
function handleStartOverButton () {
  $('.results').on('click','.js-startover-btn', function () {
    console.log('js-startover-btn was clicked.');
    store.view = 'start';
    store = defaultStore();
    questionList = defaultQuestionList();
    console.log(store.currentQuestionCount);
    render();
    console.log(store.currentQuestionCount);
  });
}

//Function that initializes all event listeners when DOM is ready
function handleQuizEventListeners() {
  handleStartButton();
  handleNextQuestionButton();
  handleSubmitButton();
  handleStartOverButton();
}

$(handleQuizEventListeners);
