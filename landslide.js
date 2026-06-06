const questions = [

{
    id:"houseLocation",
icon:"🏠",
question:"What best describes your house location?",
options:[
{ text:"Flat terrain with low landslide risks", score:15 },
{ text:"Near hills or slopes", score:10 },
{ text:"On a steep hillside or landslide prone area", score:0 }
]
},

{
    id:"slopeCondition",
icon:"🏕️",
question:"What is the condition of slopes and land around your settlement?",
options:[
{ text:"Stable with no signs of instability", score:15 },
{ text:"Minor erosion or instability", score:10 },
{ text:"Frequent cracks,erosion or unstable slopes", score:0 }
]
},

{
    id:"drainageMaintainenance",
icon:"🛶",
question:"How well are drainage systems maintained around your home and community?",
options:[
{ text:"Well Maintained", score:15 },
{ text:"Poorly Maintained", score:10 },
{ text:"Not Maintained", score:0 }
]
},

{
    id:"awarenessTraining",
icon:"🎓",
question:"Have you or your family participated in any kind of landslide-awareness training?",
options:[
{ text:"Recently Participated", score:10 },
{ text:"Previously Participated", score:5 },
{ text:"Not Participated", score:0 }
]
},

{
    id:"evacuationPlan",
icon:"🦺",
question:"Is there any clear evacuation plan for your community?",
options:[
{ text:"Yes", score:15 },
{ text:"Partial Plan", score:10},
{ text:"No", score:0 }
]
},

{
    id:"alertSystem",
icon:"🚨",
question:"Does your community have an effective landslide alert system?",
options:[
{ text:"Yes, Fully Functional", score:10},
{ text:"Yes,Partially Functional", score:5 },
{ text:"Not Functional", score:0 }
]
},

{
    id:"emergencySupplies",
icon:"🍞",
question:"Does your household maintain emergency supplies?",
options:[
{ text:"Fully Maintained", score:10 },
{ text:"Partially Maintained", score:5 },
{ text:"Not Maintained", score:0 }
]
},

{
    id:"safeLocation",
icon:"📍",
question:"Can your family quickly reach a safe location and emergency communication if a landslide occurs?",
options:[
{ text:"Yes", score:10 },
{ text:"Partially", score:5 },
{ text:"No", score:0 }
]
}

];

let currentQuestion = 0;
let answers = [];
let recommendations =[];

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
"Consider relocating to a safer area away from riverbanks."
);
}

if(answers[1] < 15){
recommendations.push(
"Familiarize yourself with local evacuation routes and plans."
);
}

if(answers[2] < 15){
recommendations.push(
"Reach out to local authorities for construction of secure drainage systems."
);
}

if(answers[3] < 10){
recommendations.push(
"Don't miss the next informative and alertness training sessions in your community."
);
}

if(answers[4] < 15){
recommendations.push(
"Identify and establish a safe shelter location for your family."
);
}

if(answers[5] < 10){
recommendations.push(
"Install a warning system or subscribe to local landslide alert services."
);
}

if(answers[6] < 10){
recommendations.push(
"Maintain a well-stock of emergency supplies like food, water, and first-aid supplies."
);
}

if(answers[7] < 10){
recommendations.push(
"Consider developing a landslide evacuation strategy and ensure quick access to emergency support.");
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
"landslideScore",
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

        window.location.href = "fdri.html";

    }

});

}});
