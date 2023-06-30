const questions = [
    {
        question: "Which is largest animal in the world?",
        answers:[
        {text:"Shark", correct: false},
        {text:"Blue Whale", correct: true},
        {text:"Elephant", correct: false},
        {text:"Giraffe", correct: false}

        ]
    
        
    },
    {
        question: "Which is the smallest continent in the world?",
        answers:[
        {text:"Asia", correct: false},
        {text:"Austtralia", correct: true},
        {text:"Arctic", correct: false},
        {text:"Africa ", correct: false}

        ]
      
    },
    {
        question: "Which is the largest desert in the world?",
        answers:[
        {text:"Kalahari", correct: false},
        {text:"Gobi", correct: false},
        {text:"Sahara", correct: false},
        {text:"Antarctica ", correct: true}

        ]
      
    },
    {
        question: "which part of your body would you find the cruciate ligament?",
        answers:[
        {text:"Thigh", correct: false},
        {text:"Leg", correct: true},
        {text:"Hand", correct: false},
        {text:"Head ", correct: false}

        ]
      
    },
    {
        question: "What is the name of the main antagonist in the Shakespeare play Othello?",
        answers:[
        {text:"Soyinka", correct: false},
        {text:"Achebe", correct: false},
        {text:"Lago", correct: true},
        {text:"Brandon ", correct: false}

        ]
      
    },

    {
        question: "What was the Turkish city of Istanbul called before 1930?",
        answers:[
        {text:"Constantinople", correct: true},
        {text:"Queen's Park Rangers", correct: false},
        {text:"Las Vegas", correct: false},
        {text:"Central park ", correct: false}

        ]
      
    },

    {
        question: "From what grain is the Japanese spirit Sake made?",
        answers:[
        {text:"Millet", correct: false},
        {text:"Rice", correct: true},
        {text:"Oats", correct: false},
        {text:" Barley", correct: false}

        ]
      
    },
    {
        question: "What is the capital of New Zealand?",
        answers:[
        {text:"Las vegas", correct: false},
        {text:"Zealand", correct: false},
        {text:"Wellington", correct: true},
        {text:" Central perk", correct: false}

        ]
      
    },
   
    {
        question: " Which football club plays its home games at Loftus Road?",
        answers:[
        {text:"Queen's Park Rangers", correct: true},
        {text:"Newcastle", correct: false},
        {text:"Birmingham", correct: false},
        {text:"Atletico Madrid", correct: false}

        ]
      
    },
    {
        question: "Who wrote the novels Gone Girl and Sharp Objects? ",
        answers:[
        {text:"John Oshe", correct: false},
        {text:"Brian Smith", correct: false},
        {text:"Gillian Flynn", correct: true},
        {text:"Alan Gorge", correct: false}

        ]
      
    },
    
]


let questionElement = document.getElementById('question')
const answerButton  = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
let currentQuestionIndex = 0;
let score = 0;

const saveData = ()=>{
    localStorage.setItem("data", questionElement.innerHTML)
}
const getData =()=>{
    questionElement.innerHTML = localStorage.getItem("data")
}

getData()
const startQuiz =()=>{
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
    saveData()
  
} 

const showQuestion =()=>{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +  ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer=>{
    const button = document.createElement("button") 
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button)
    if(answer.correct){
    button.dataset.correct = answer.correct
          
          }
          button.addEventListener('click', selectAnswer)
    })
    saveData()
   
}
// Reset Logic

const resetState =()=>{
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
       
    }
    saveData()
}

const selectAnswer = (e)=>{
  const selectedBtn = e.target ; 
      const isCorrect = selectedBtn.dataset.correct === "true";
      if(isCorrect){
        selectedBtn.classList.add('correct')
        score ++
        
      } else{
        selectedBtn.classList.add("incorrect")
  
      }
// convert object to array and disable the clicked button
// checking selection of multiple answers
Array.from(answerButton.children).forEach(button=>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct")
       
    }
    button.disabled = true;
});
nextButton.style.display = "block"

}

// Score Logic
const showScore = ()=>{
    resetState();      
   
        questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
   
        nextButton.innerHTML = "Play Again";
        nextButton.style.display = "block";  
}

// Logic for Next Button
const handleNextButton = ()=>{
currentQuestionIndex++
if(currentQuestionIndex < questions.length){
    showQuestion(); 
    saveData()  
} else{
    showScore();
    saveData()   
}


}
nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton()
      
    }else{
        startQuiz()
       
    }
    
})
startQuiz()
