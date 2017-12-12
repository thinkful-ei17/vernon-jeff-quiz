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
    quizCompleted: false,
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
      answerSelect: 1,
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
      answerSelect: 2,
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
      answerSelect: 3,
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
      answerSelect: 4,
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
      answerSelect: 5,
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
      answerSelect: 6,
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
      answerSelect: 7,
      questionAsked: false,
    },
  ];
}



//Template generators
let randomQuestion;
let counter = 0;
const objs = [];
function generateRandomQuestion() {
  let availableQs = questionList.filter(function (n){
    return n.questionAsked === false;
  });
  if (availableQs.length === 0) {
    store.quizCompleted = true;
    return null;
  }
  let max = availableQs.length - 1;
  let min = 0;
  let random = Math.floor(Math.random() * (max - min + 1) + min);
  randomQuestion = availableQs[random];

  console.log(random);
  console.log(availableQs);

  randomQuestion.questionAsked = true;



  console.log(random);
  //Match randomQuestion's answerSelect value to the answerSelect
  //in original array of objects, (find) then change questionAsked
  //of original object.questionAsked if there's a match
  // console.log(questionList[random].questionAsked);
  return randomQuestion;
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
  $('.question-title-container').html(
    `<div class='question-counter'>
    Question # ${store.currentQuestionCount}
    </div>
    ${randomQuestion.question}`);

  $('.question-list').html(`
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[0]}' required>
  <label for="form-option-1">${randomQuestion.answerOptions[0]}</label>
  </div>
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[1]}' required>
  <label for="form-option-2">${randomQuestion.answerOptions[1]}</label>
  </div>
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[2]}' required>
  <label for="form-option-3">${randomQuestion.answerOptions[2]}</label>
  </div>
  <div class='input-section'>
  <input type="radio" name="clicked-question" class='radio-btn' value='${randomQuestion.answerOptions[3]}' required>
  <label for="form-option-4">${randomQuestion.answerOptions[3]}</label></div>`)
  ;
}


//////Event handlers//////


//Button that handles when the start button is clicked.
function handleStartButton() {
  $('.start').on('click','.js-start-btn', function () {
    console.log('js-start-btn was clicked.');
    store.view = 'quiz';
    updateCounter();
    generateAnswerList(generateRandomQuestion);
    render();
  });
}

//Button that handles when the submit button is clicked.
function handleSubmitButton () {
  $('#quiz-form').submit(function (event) {
    event.preventDefault();
    let submittedAnswer = $('input[name=\'clicked-question\']:checked').val();
    console.log(submittedAnswer);
    console.log('js-submit-btn was clicked.');
    store.submitBtnClicked = true;
    console.log(store.submitBtnClicked);
    if (submittedAnswer === randomQuestion.correctAnswer) {
      console.log('You got it right!');
      userCorrectAnswerSubmitted(submittedAnswer);
    }
    else {
      userInCorrectAnswerSubmitted(submittedAnswer);
    }
    updateCounter();
  });
}

//Create a function that handles if the user was incorrect

function userInCorrectAnswerSubmitted(answer) {
  $('.correct-updater').html(`Incorrect! The correct answer is: ${randomQuestion.correctAnswer}`);
}

//Create a function that handles if the user was correct
function userCorrectAnswerSubmitted(answer) {
  store.score++;
  $('.correct-updater').html(`Correct!`);
}

//Function that updates counter after each question
function updateCounter() {
  if (store.view === 'results') {
    $('.correct-counter').html(`Quiz Results: ${store.score} / ${questionList.length}`);
  }
  else {
    $('.correct-counter').html(`Progress: ${store.score} / ${questionList.length}`);
  }
}

//Handles when the user clicks next question
function handleNextQuestionButton () {
  $('.quiz').on('click','.js-next-question-btn', function () {
    console.log('js-next-question-btn was clicked.');
    event.preventDefault();
    $('.correct-updater').html('');
    if (store.submitBtnClicked === true) {
      ++store.currentQuestionCount;
      store.submitBtnClicked = false;
      console.log(store.submitBtnClicked);
      generateAnswerList(generateRandomQuestion);
    }
    if (store.quizCompleted === true) {
      store.view = 'results';
      store.currentQuestionCount = 1;
      // generateAnswerList(QuestionGenerator);
      updateCounter();
      render();
    }
  });
}

//Restarts the game, sets store to defult, and renders current
//state.
function handleStartOverButton () {
  $('.results').on('click','.js-startover-btn', function () {
    console.log('js-startover-btn was clicked.');
    store.view = 'start';
    // store.score = 0;
    // store.currentQuestionCount = 1;
    store = defaultStore();
    questionList = defaultQuestionList();
    // updateCounter();
    console.log(store.currentQuestionCount);
    // $('.question-title-container').html(
    //   `<div class='question-counter'>
    //   Question # ${store.currentQuestionCount}
    //   </div>
    //   ${randomQuestion.question}`);
    render();
    console.log(store.currentQuestionCount);
  });
}

//Function that initializes all event listeners when DOM is ready
function handleQuizEventListeners() {
  render();//Necessary?
  handleStartButton();
  handleNextQuestionButton();
  handleSubmitButton();
  handleStartOverButton();
  generateAnswerList(generateRandomQuestion);//Necessary?
}

$(handleQuizEventListeners);
