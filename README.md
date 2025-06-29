# Quizgame
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quiz Game</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="quiz-container">
    <h1>Quiz Game</h1>
    
    <div id="start-screen">
      <select id="category-select">
        <option value="general">General Knowledge</option>
        <option value="science">Science</option>
      </select>
      <button onclick="startQuiz()">Start Quiz</button>
    </div>

    <div id="quiz-screen" class="hidden">
      <div id="timer">Time Left: <span id="time">30</span>s</div>
      <div id="question">Question text</div>
      <div id="options"></div>
      <button onclick="nextQuestion()">Next</button>
    </div>

    <div id="result-screen" class="hidden">
      <h2>Quiz Completed!</h2>
      <p>Your score: <span id="score"></span></p>
      <ul id="review"></ul>
      <button onclick="location.reload()">Restart</button>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>


body {
  font-family: Arial, sans-serif;
  background: #f0f0f0;
  text-align: center;
  padding: 30px;
}

.quiz-container {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  margin: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.hidden {
  display: none;
}

button {
  padding: 10px 20px;
  margin-top: 15px;
  cursor: pointer;
}

#options button {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
}


const questions = {
  general: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "London", "Madrid"],
      answer: "Paris",
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars",
    },
  ],
  science: [
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      answer: "H2O",
    },
    {
      question: "What gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"],
      answer: "Carbon Dioxide",
    },
  ],
};

let currentCategory = 'general';
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let selectedQuestions = [];
let userAnswers = [];

function startQuiz() {
  currentCategory = document.getElementById('category-select').value;
  selectedQuestions = questions[currentCategory];
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  showQuestion();
  startTimer();
}

function startTimer() {
  timeLeft = 30;
  document.getElementById('time').textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function showQuestion() {
  const q = selectedQuestions[currentQuestionIndex];
  document.getElementById('question').textContent = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsDiv.appendChild(btn);
  });
}

function selectAnswer(answer) {
  const correct = selectedQuestions[currentQuestionIndex].answer;
  userAnswers.push({ question: selectedQuestions[currentQuestionIndex].question, answer, correct });
  if (answer === correct) score++;
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestionIndex++;
  if (currentQuestionIndex < selectedQuestions.length) {
    showQuestion();
    startTimer();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('result-screen').classList.remove('hidden');
  document.getElementById('score').textContent = `${score}/${selectedQuestions.length}`;

  const review = document.getElementById('review');
  review.innerHTML = '';
  userAnswers.forEach((entry, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Q${i + 1}:</strong> ${entry.question} <br>
                    Your Answer: ${entry.answer} <br>
                    Correct Answer: ${entry.correct}`;
    review.appendChild(li);
  });
}
