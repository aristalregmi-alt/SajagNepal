const questions = [

{
    id:"houseLocation",
icon:"🌊",
question:"Do you live in a river-bank settlement or within easy reach of a river?",
options:[
{ text:"No", score:15 },
{ text:"Somewhere nearby", score:7.5 },
{ text:"Yes", score:0 }
]
},

{
    id:"response",
icon:"🚨",
question:"Are you well informed about immediate evacuation plans during a flood?",
options:[
{ text:"Fully Informed", score:15 },
{ text:"Partially Informed", score:7.5 },
{ text:"Not Informed", score:0 }
]
},

{
    id:"documentSafety",
icon:"📄",
question:"Are important family documents stored safely?",
options:[
{ text:"Fully Secured", score:10 },
{ text:"Partially Secured", score:5 },
{ text:"Not Secured", score:0 }
]
},

{
    id:"alertSystem",
icon:"📢",
question:"Do you have access to early warning and alert systems?",
options:[
{ text:"Yes", score:20 },
{ text:"Partially", score:10 },
{ text:"No", score:0 }
]
},

{
    id:"safetyShelters",
icon:"🏠",
question:"Do you have access to a safe shelter nearby?",
options:[
{ text:"Yes", score:15 },
{ text:"Partial Access", score:7.5},
{ text:"No", score:0 }
]
},

{
    id:"Supplies",
icon:"🍞",
question:"Do you have emergency food and medicine supplies??",
options:[
{ text:"Fully Stocked", score:15 },
{ text:"Partially Stocked", score:7.5 },
{ text:"Not Stocked", score:0 }
]
},

{
    id:"emergencySupport",
icon:"🤝",
question:"Can you quickly access rescue and emergency support??",
options:[
{ text:"Yes", score:10 },
{ text:"Partially", score:5 },
{ text:"No", score:0 }
]
},

{
    id:"swimmingSkills",
icon:"🏊",
question:"Do you know how to swim?",
options:[
{ text:"Yes", score:5 },
{ text:"Basic Skills", score:2.5 },
{ text:"No", score:0 }
]
}

];

let currentQuestion = 0;
let answers = [];
let recommendations = [];

const questionText = document.getElementById("questionText");
const questionIcon = document.getElementById("questionIcon");
const optionsDiv = document.getElementById("options");
const progressBar = document.getElementById("progressBar");
const percentageDisplay = document.getElementById("percentageDisplay");
const questionCounter = document.getElementById("questionCounter");

function loadQuestion(){

let q = questions[currentQuestion];

questionText.innerText = q.question;
questionIcon.innerText = q.icon;

questionCounter.innerText =
`Question ${currentQuestion+1} of ${questions.length}`;

progressBar.style.width =
`${((currentQuestion+1)/questions.length)*100}%`;

percentageDisplay.innerText =
`${Math.round(((currentQuestion+1)/questions.length)*100)}%`;

optionsDiv.innerHTML = "";

q.options.forEach((option,index)=>{
    let checked = "";

    if(answers[currentQuestion] === option.score){
        checked = "checked";
    }

let label = document.createElement("label");

label.classList.add("option");

label.innerHTML =
`
<input type="radio"
name="answer"
value="${option.score}"
 ${checked}
 >
${option.text}
`;

optionsDiv.appendChild(label);

});

}

loadQuestion();

document.getElementById("nextBtn").addEventListener("click", () => {

let selected =
document.querySelector('input[name="answer"]:checked');

if(!selected){
alert("Please select an option.");
return;
}

answers[currentQuestion] =
Number(selected.value);

if(currentQuestion < questions.length-1){

currentQuestion++;
loadQuestion();

}
else{

recommendations = [];
let category="";
let message="";


if(answers[0] < 15){
recommendations.push(
"Consider developing a flood evacuation strategy if living near rivers."
);
}

if(answers[1] < 15){
recommendations.push(
"Learn evacuation routes and emergency procedures."
);
}

if(answers[2] < 10){
recommendations.push(
"Store important documents in waterproof containers."
);
}

if(answers[3] < 15){
recommendations.push(
"Subscribe to flood alerts and warning systems."
);
}

if(answers[4] < 15){
recommendations.push(
"Identify nearby shelters and safe evacuation points."
);
}

if(answers[5] < 15){
recommendations.push(
"Maintain emergency food and medicine supplies."
);
}

if(answers[6] < 10){
recommendations.push(
"Keep emergency contact information easily accessible."
);
}

if(answers[7] < 5){
recommendations.push(
"Learning basic swimming skills can improve flood safety.");
}

if(recommendations.length === 0){
recommendations.push("Excellent preparedness! Continue regular drills and maintain emergency supplies.");
}

showResult();

const recommendationsList = document.getElementById("recommendationsList");

recommendationsList.innerHTML = "";

recommendations.forEach(item=>{
let li = document.createElement("li");
li.innerText = item;
recommendationsList.appendChild(li);
});
};

document.getElementById("prevBtn").addEventListener("click",()=>{

if(currentQuestion > 0){

currentQuestion--;
loadQuestion();

}

});

function showResult(){

document.querySelector(".card").style.display="none";

let total =
answers.reduce((a,b)=>a+b,0);

localStorage.setItem(
"floodScore",
Math.round(total)
);

let category="";
let message="";

if(total<=30){

category="High Risk";
message="Immediate preparedness measures are strongly recommended.";

}
else if(total<=50){

category="Needs Significant Improvement";
message="Several important preparedness measures are missing.";

}
else if(total<=70){

category="Moderately Prepared";
message="Basic preparedness exists, but improvements are needed.";

}
else if(total<=95){

category="Well Prepared";
message="Strong disaster preparedness practices are in place.";

}
else{

category="Exceptionally Well Prepared";
message="Outstanding preparedness and readiness capability.";

}

document.getElementById("scoreDisplay").innerText =
`${Math.round(total)}/100`;

const categoryDisplay =document.getElementById("categoryDisplay");

categoryDisplay.innerText = category;

if(total <= 30){

categoryDisplay.style.color = "red";

}
else if(total <= 50){

categoryDisplay.style.color = "orange";

}
else if(total <= 70){

categoryDisplay.style.color = "#EAB308";

}
else if(total <= 95){

categoryDisplay.style.color = "green";

}
else{

categoryDisplay.style.color = "darkgreen";

}

document.getElementById("messageDisplay").innerText =
message;

document.getElementById("resultCard")
.classList.remove("hidden");

const recommendationsList =
document.getElementById("recommendationsList");

recommendationsList.innerHTML = "";

recommendations.forEach(item => {

let li = document.createElement("li");

li.innerText = item;

recommendationsList.appendChild(li);

});



document.addEventListener("click",(event)=>{

    if(event.target.id === "homeBtn"){

        window.location.href = "index.html";

    }

    if(event.target.id === "nextAssessmentBtn"){

        window.location.href = "landslide.html";

    }

});

}});
