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



//Function that initializes all event listeners when DOM is ready
function handleQuizEventListeners() {
  render();  
}

$(handleQuizEventListeners);