const earthquake =
Number(localStorage.getItem("earthquakeScore")) || 0;

const flood =
Number(localStorage.getItem("floodScore")) || 0;

const landslide =
Number(localStorage.getItem("landslideScore")) || 0;

const familyName =
localStorage.getItem("familyName") || "SafeNepal User";

document.getElementById("familyName").innerText =
familyName;

document.getElementById("reportDate").innerText =
new Date().toLocaleDateString();

document.getElementById("earthquakeScore").innerText =
earthquake;

document.getElementById("floodScore").innerText =
flood;

document.getElementById("landslideScore").innerText =
landslide;

const fdri =
Math.round(
(earthquake + flood + landslide)/3
);

document.getElementById("fdriScore").innerText =
fdri;

let category = "";

if(fdri <= 30){
category = "🔴 High Risk";
}
else if(fdri <= 50){
category = "🟠 Needs More Improvement";
}
else if(fdri <= 70){
category = "🟡 Moderately Prepared";
}
else if(fdri <= 95){
category = "🟢 Well Prepared";
}
else{
category = "🟢 Exceptionally Well Prepared";
}

document.getElementById("fdriCategory").innerText =
category;

const scores = [
{name:"Earthquake",score:earthquake},
{name:"Flood",score:flood},
{name:"Landslide",score:landslide}
];

scores.sort((a,b)=>a.score-b.score);

const weakest = scores[0];

document.getElementById("priorityArea").innerText =
`${weakest.name} Preparedness`;

const recommendations =
document.getElementById("recommendations");

let advice = [];

if(weakest.name === "Earthquake"){
advice = [
"Practice Drop-Cover-Hold drills monthly.",
"Prepare a complete emergency go-bag.",
"Secure heavy furniture and shelves."
];
}

if(weakest.name === "Flood"){
advice = [
"Learn evacuation routes.",
"Prepare emergency food supplies.",
"Protect important documents."
];
}

if(weakest.name === "Landslide"){
advice = [
"Monitor slopes during monsoon.",
"Identify safe evacuation areas.",
"Follow local warning systems."
];
}

advice.forEach(item=>{

let li = document.createElement("li");

li.innerText = item;

recommendations.appendChild(li);

});