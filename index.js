'use strict';

const QUIZ = [{
        question: 'What golf course is considered the Home of Golf?',
        answer: 'Saint Andrew\'s',
        choices: [
            'Augusta National',
            'Muirfield',
            'Pebble Beach',
            'Saint Andrew\'s'
        ],
        fact: 'The Old Course at St Andrew\'s is considered the oldest golf course in the world',
        icon: 'images/hole.png',
        alt: 'golf hole icon'
    },
    {
        question: 'Which four golf tournaments make up the majors?',
        answer: 'Masters | British Open | US Open | PGA Championship',
        choices: [
            'Masters | British Open | US Open | Players Championship',
            'British Open | US Open | Ryder Cup | PGA Championship',
            'Masters | British Open | US Open | PGA Championship',
            'Masters | Scottish Open | US Open | PGA Championship'
        ],
        fact: 'When a golfer wins all four majors at any time during their career, it\'s referred to as a Career Grand Slam',
        icon: 'images/trophy.png',
        alt: 'trophy icon'
    },
    {
        question: 'What is Tiger Woods\' real first name?',
        answer: 'Eldrick',
        choices: [
            'Charles',
            'Eldrick',
            'Earl',
            'Michael'
        ],
        fact: 'Eldrick was coined by Tiger\'s mother because it began with "E" (for Earl) and ended with "K" (for Kultida).',
        icon: 'images/player.png',
        alt: 'golfer icon'
    },
    {
        question: 'What does it mean to get a birdie on a hole?',
        answer: '1 less than par',
        choices: [
            '1 penalty stroke',
            '1 less than par',
            '1 more than par',
            'Lose your turn'
        ],
        fact: 'Birdie comes from the early 20th century American slang term "bird", meaning anything excellent.',
        icon: 'images/flag.png',
        alt: 'golf flag icon'
    },
    {
        question: 'What is the maximum amount of clubs that a golfer can carry in their bag?',
        answer: '14',
        choices: [
            '13',
            '14',
            '15',
            '16'
        ],
        fact: 'Professional golfer Johnny Miller was once penalized 4 strokes after finding one of his son\'s plastic clubs stuffed in the bottom of his bag',
        icon: 'images/bag.png',
        alt: 'golf bag icon'
    },
    {
        question: 'What does it mean when a golfer has honors?',
        answer: 'They scored the best on the last hole and can tee off first',
        choices: [
            'They have the most playing experience',
            'They scored the best on the last hole and can tee off first',
            'They are the most senior in the foursome  and can tee off first',
            'They showed the most respect during the round'
        ],
        fact: 'Contrary to honoring the lowest score, playing "ready golf" means that each golfer within a group hits when ready',
        icon: 'images/cart.png',
        alt: 'golf cart icon'
    },
    {
        question: 'What is the area called that you start each hole on?',
        answer: 'The tee box',
        choices: [
            'The tee box',
            'The fairway',
            'The rough',
            'The green'
        ],
        fact: 'Golfers have the option to tee up anywhere in-between two tee markers and two-club-lengths back from them',
        icon: 'images/iron.png',
        alt: 'golf iron and golf ball icon'
    },
    {
        question: 'Which one of the following would not result in a penalty stroke?',
        answer: 'Hitting onto a different hole',
        choices: [
            'Hitting onto a different hole',
            'Hitting into a water hazard',
            'Making a putt with the flagstick in the hole',
            'Grounding club in a sand trap'
        ],
        fact: 'A golfer can actually be penalized for playing too slowly',
        icon: 'images/glove.png',
        alt: 'golf glove icon'
    },
    {
        question: 'What was the first golf ball made out of?',
        answer: 'Feather stuffed leather pouch',
        choices: [
            'Rubber bands',
            'Chiseled rock',
            'Feather stuffed leather pouch',
            'Dried tree sap'
        ],
        fact: 'The feathery or featherie is the most famous of all golf balls, though it is not definitively known when or where it was developed',
        icon: 'images/ball.png',
        alt: 'golf ball icon'
    },
    {
        question: 'What golfer holds the record for most major victories?',
        answer: 'Jack Nicklaus',
        choices: [
            'Tiger woods',
            'Arnold Palmer',
            'Jack Nicklaus',
            'Ben Hogan'
        ],
        fact: 'Nicknamed "The Golden Bear", Jack Nicklaus is widely regarded as the greatest golfer of all time, winning a record 18 career major championships',
        icon: 'images/player.png',
        alt: 'golfer icon'
    }
];

let questionNumber = 1;
let currentQuestion = 0;
let score = 0;

// this function is responsible for starting the quiz
function handleQuizStart() {
    $(".js-quiz-start").on("click", ".js-start-button", function(event) {
        $(".js-quiz-start").remove();
        $(".js-question-form").css('display', 'block');
        $(".js-question-number").html(questionNumber);
    })
}

// this function is repsonsible for generating a question template
function generateForm() {
    if (currentQuestion < QUIZ.length) {
        return `<section class="question-block" role="region">
        <h2>${QUIZ[currentQuestion].question}</h2>
      <form action="/some-server-endpoint" method="post">
        <fieldset>
          <div class="answer-box">
            <input id="first-choice" type="radio" value="${QUIZ[currentQuestion].choices[0]}" name="choice" required>
            <label for="first-choice">${QUIZ[currentQuestion].choices[0]}</label>
          </div>
          <div class="answer-box">
            <input id="second-choice" type="radio" value="${QUIZ[currentQuestion].choices[1]}" name="choice" required>
            <label for="second-choice">${QUIZ[currentQuestion].choices[1]}</label>
          </div>
          <div class="answer-box">
            <input id="third-choice" type="radio" value="${QUIZ[currentQuestion].choices[2]}" name="choice" required>
            <label for="third-choice">${QUIZ[currentQuestion].choices[2]}</label>
          </div>
          <div class="answer-box">
            <input id="fourth-choice" type="radio" value="${QUIZ[currentQuestion].choices[3]}" name="choice" required>
            <label for="fourth-choice">${QUIZ[currentQuestion].choices[3]}</label>
          </div>
          <button type="submit" class="submit-button">Submit</button>
        </fieldset>
      </form>
      </section>`;
    } else {
        showResults();
        restartQuiz();
    }
}

// this funtion is responsible for rendering a question to the DOM
function renderQuestion() {
    $(".js-question-form").html(generateForm());
}

// this function is responsible for when users submit an answer
function handleAnswerSubmit() {
    $("form").on("submit", function(event) {

        let selection = $("input:checked");
        let selectionValue = selection.val();
        let answer = `${QUIZ[currentQuestion].answer}`;

        if (selectionValue === answer) {
            score++;
            $('.js-score').text(score);
            correctAnswerMessage();
        } else {
            incorrectAnswerMessage();
        }
        event.preventDefault();
    });
}

function correctAnswerMessage() {
    $(".js-question-form").html(`<section class="right-feedback" role="region">
    <img class="feedback-img" src="${QUIZ[currentQuestion].icon}" alt="${QUIZ[currentQuestion].alt}">
    <h2>Fist Pump!<br>That's Correct!</h2>
    <p>${QUIZ[currentQuestion].fact}</p>
    <button type="button" class="next-button">Next</button>
  </section>`);
}

function incorrectAnswerMessage() {
    $(".js-question-form").html(`<section class="wrong-feedback" role="region">
    <img class="feedback-img" src="${QUIZ[currentQuestion].icon}" alt="${QUIZ[currentQuestion].alt}">
    <h2>Four!<br>Wrong Answer!</h2>
    <p>The correct answer is<br><strong>${QUIZ[currentQuestion].answer}</strong></p>
    <button type="button" class="next-button">Next</button>
  </section>`);
}

// this function is responsible for when users advance to next question
function handleNextQuestion() {
    $("main").on("click", ".next-button", function(event) {

        if (questionNumber < 10) {
            currentQuestion++;
            questionNumber++;
            $(".js-question-number").html(questionNumber);
            renderQuestion();
            handleAnswerSubmit();
        } else {
            currentQuestion++;
            handleAnswerSubmit();
            renderQuestion();
        }
    });
}

function topResult() {
    return `<section class="final-results" role="region">
    <h2 class="results-heading">Hats off to you!</h2>
    <p class="results-content">You correctly answered ${score} out of 10 questions</p>
    <p class="results-content">Your golf IQ is over 150!</p>
    <button type="button" class="restart-button">Try Again</button>
  </section>`;
}

function midResult() {
    return `<section class="final-results" role="region">
     <h2 class="results-heading">Nice try lad!</h2>
     <p class="results-content">You correctly answered ${score} out of 10 questions</p>
     <p class="results-content">Your golf IQ is over 100</p>
     <button type="button" class="restart-button">Try Again</button>
   </section>`;
}

function lowResult() {
    return `<section class="final-results" role="region">
     <h2 class="results-heading">Ouch! Better hit the practice range to improve your score</h2>
     <p class="results-content">You only answered ${score} out of the 10 questions correctly</p>
     <p class="results-content">Your golf IQ is less than 100</p>
     <button type="button" class="restart-button">Try Again</button>
   </section>`;
}

function showResults() {
    if (score >= 8) {
        $(".js-question-form").html(topResult());
    } else if (score < 8 && score >= 5) {
        $(".js-question-form").html(midResult());
    } else {
        $(".js-question-form").html(lowResult());
    }
}

// this function is responsible for restarting the quiz
function restartQuiz() {
    $('main').on('click', '.restart-button', function(event) {
        location.reload();
    });
}

// this will be our callback function when the page loads. it's responsible for
// starting the quiz, renduring questions, and activating the functions
// that handle answer submission and user clicks on the "next" button 
// to advance to next question.
function initiateQuiz() {
    handleQuizStart();
    renderQuestion();
    handleAnswerSubmit();
    handleNextQuestion();
}

// when the page loads, call `initiateQuiz`
$(initiateQuiz);