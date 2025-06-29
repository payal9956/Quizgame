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
