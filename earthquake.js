const questions = [

{
    id:"house",
icon:"🏠",
question:"What type of house do you live in?",
options:[
{ text:"RCC Building", score:10 },
{ text:"Reinforced Masonry", score:5 },
{ text:"Brick/Stone House", score:2.5 },
{ text:"Mud/Adobe House", score:0 }
]
},

{
    id:"response",
icon:"⚡",
question:"What is the first action you would take during an earthquake?",
options:[
{ text:"Drop, Cover, Hold On", score:15 },
{ text:"Move Away From Windows", score:7.5 },
{ text:"Run Outside Immediately", score:0 },
{ text:"Not Sure", score:0 }
]
},

{
    id:"training",
icon:"🎓",
question:"Have you participated in earthquake awareness training?",
options:[
{ text:"Recently", score:10 },
{ text:"Previously", score:5 },
{ text:"Never", score:0 }
]
},

{
    id:"goBag",
icon:"🎒",
question:"Have you prepared an emergency go-bag?",
options:[
{ text:"Yes,Fully Prepared", score:20 },
{ text:"Partially Prepared", score:10 },
{ text:"Not Prepared", score:0 }
]
},

{
    id:"meetingPoint",
icon:"📍",
question:"Does your family know an emergency meeting point?",
options:[
{ text:"Yes", score:10 },
{ text:"Partially", score:5 },
{ text:"No", score:0 }
]
},

{
    id:"contacts",
icon:"📞",
question:"Are emergency contacts readily available?",
options:[
{ text:"Yes", score:10 },
{ text:"Partially", score:5 },
{ text:"No", score:0 }
]
},

{
    id:"furniture",
icon:"🪑",
question:"Are heavy furniture and appliances secured?",
options:[
{ text:"Yes", score:15 },
{ text:"Partially", score:7.5 },
{ text:"No", score:0 }
]
},

{
    id:"familyDrills",
icon:"👨‍👩‍👧‍👦",
question:"Is your family familiar with safety drills?",
options:[
{ text:"All Members", score:10 },
{ text:"Some Members", score:5 },
{ text:"None", score:0 }
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


if (answers[0] < 10 ){
recommendations.push("Consider upgrading to a more earthquake-resistant housing structure.");
}

if(answers[1] < 15){
recommendations.push("Learn and practice the 'Drop, Cover, Hold On' technique.");
}

if(answers[2] < 10){
recommendations.push("Participate in local earthquake awareness training programs.");
}

if(answers[3] < 20){
recommendations.push("Prepare an emergency go-bag with water, flashlight, food and first-aid supplies.");
}

if(answers[4] < 10){
recommendations.push("Establish a clear family emergency meeting point.");    
}

if(answers[5] < 10){   
recommendations.push("Compile a list of emergency contacts and keep it accessible.");
}

if(answers[6] < 15){
recommendations.push("Secure heavy furniture and appliances to prevent tipping during an earthquake.");
}

if(answers[7] < 10){
recommendations.push("Conduct regular family safety drills to ensure everyone knows what to do during an earthquake.");
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
"earthquakeScore",
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

        window.location.href = "flood.html";

    }

});

}});