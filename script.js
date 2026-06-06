function saveFamilyName(){

const familyName =
document.getElementById("familyNameInput").value;

localStorage.setItem(
"familyName",
familyName
);

alert("Family profile saved!");

const tips = [

"Secure heavy furniture to prevent earthquake injuries.",

"Store important documents in waterproof containers.",

"Maintain at least 72 hours of emergency supplies.",

"Practice disaster drills with your family regularly.",

"Save emergency contact numbers on all family phones.",

"Know your nearest evacuation route before emergencies occur.",

"Keep a flashlight and power bank ready at all times.",

"Monitor weather warnings during monsoon season."

];

const randomTip =
tips[
Math.floor(
Math.random() * tips.length
)
];

document.getElementById("tip").innerText =
randomTip;
}

const earthquake =
Number(
localStorage.getItem(
"earthquakeScore"
)) || 0;

const flood =
Number(
localStorage.getItem(
"floodScore"
)) || 0;

const landslide =
Number(
localStorage.getItem(
"landslideScore"
)) || 0;

const fdri =
Math.round(
(earthquake + flood + landslide)/3
);

document.getElementById(
"homeFdriScore"
).innerText =
fdri;

let category = "";

if(fdri <= 30){

category =
"🔴 High Risk";

}
else if(fdri <= 50){

category =
"🟠 Needs Improvement";

}
else if(fdri <= 70){

category =
"🟡 Moderate";

}
else if(fdri <= 95){

category =
"🟢 Well Prepared";

}
else{

category =
"🏆 Exceptional";

}

document.getElementById(
"homeFdriCategory"
).innerText =
category;

let badge = "";

if(fdri <= 30){

badge =
"⚠️ Vulnerable Family";

}
else if(fdri <= 50){

badge =
"🛠️ Improving Family";

}
else if(fdri <= 70){

badge =
"🛡️ Disaster Aware";

}
else if(fdri <= 95){

badge =
"🏅 Prepared Family";

}
else{

badge =
"🏆 Resilience Champion";

}

document.getElementById(
"familyBadge"
).innerText =
badge;

const familyName =
localStorage.getItem(
"familyName"
);

if(familyName){

document.getElementById(
"welcomeMessage"
).innerText =

`Welcome back, ${familyName} 👋`;

}

document
.getElementById("themeToggle")
.addEventListener("click",()=>{

document.body.classList.toggle(
"dark-mode"
);

});