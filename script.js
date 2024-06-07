//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const submit = document.getElementById("submit");
let userAnswers = JSON.parse(sessionStorage.getItem("ans"))||[];

submit.addEventListener("click",addScore);

// Display the quiz questions and choices
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}

function addAnswer() {
	const inputs = document.querySelectorAll("input");
	//console.log(inputs);
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].addEventListener("change",(event)=>{
			let ans = event.target.value;
			// console.log(ans);
			userAnswers[parseInt(event.target.name.split('-')[1])]=ans;
			sessionStorage.setItem("ans",JSON.stringify(userAnswers));
		})
	}
}
function addScore() {
	let score = 0;
	for (let i = 0; i < questions.length; i++) {
		let question = questions[i];
		let ans = userAnswers[i];
		if (question.answer === ans) {
			score++;
		}
	}
	localStorage.setItem("score",score);
	const scoreCon = document.getElementById("score");
	scoreCon.innerText = `Your Score is ${score} out of 5.`;
}

renderQuestions();
addAnswer();
