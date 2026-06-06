const earthquake =
Number(localStorage.getItem("earthquakeScore")) || 0;

const flood =
Number(localStorage.getItem("floodScore")) || 0;

const landslide =
Number(localStorage.getItem("landslideScore")) || 0;

document.getElementById("earthquakeScore").innerText =
earthquake;

document.getElementById("floodScore").innerText =
flood;

document.getElementById("landslideScore").innerText =
landslide;

const fdri =
Math.round(
(earthquake + flood + landslide) / 3
);

let count = 0;

const counter =
setInterval(()=>{

count++;

document.getElementById(
"fdriValue"
).innerText = count;

if(count >= fdri){

clearInterval(counter);

}

},20);


const categoryDisplay =
document.getElementById("fdriCategory");

let category = "";

if(fdri <= 30){

category = "🔴 High Risk";
categoryDisplay.style.color = "red";

}
else if(fdri <= 50){

category = "🟠 Needs More Improvement";
categoryDisplay.style.color = "orange";

}
else if(fdri <= 70){

category = "🟡 Moderately Prepared";
categoryDisplay.style.color = "#EAB308";

}
else if(fdri <= 95){

category = "🟢 Well Prepared";
categoryDisplay.style.color = "green";

}
else{

category = "🟢 Exceptionally Well Prepared";
categoryDisplay.style.color = "darkgreen";

}

categoryDisplay.innerText = category;

let scores = [
{
name:"Earthquake",
score:earthquake
},
{
name:"Flood",
score:flood
},
{
name:"Landslide",
score:landslide
}
];

scores.sort((a,b)=>a.score-b.score);

const weakest =
scores[0];

document.getElementById("priorityArea").innerText =
`${weakest.name} Preparedness (${weakest.score}/100)`;

const strongest =
scores[scores.length-1];

document.getElementById("strongestArea").innerText =
`${strongest.name} Preparedness (${strongest.score}/100)`;

let summary = "";

if(fdri <= 30){

summary =
"Your family is currently at high disaster risk. Immediate preparedness actions are strongly recommended.";

}
else if(fdri <= 50){

summary =
"Some preparedness measures exist, but several critical gaps remain.";

}
else if(fdri <= 70){

summary =
"Your family demonstrates moderate preparedness. Further improvements will strengthen resilience.";

}
else if(fdri <= 95){

summary =
"Your family shows strong preparedness and good disaster awareness.";

}
else{

summary =
"Outstanding readiness. Your family demonstrates exceptional preparedness across disaster categories.";

}

document.getElementById("summaryText").innerText =
summary;

const recommendationList =
document.getElementById("priorityRecommendations");

let recommendations = [];

if(weakest.name === "Earthquake"){

recommendations = [
"Practice Drop-Cover-Hold drills regularly.",
"Prepare an emergency go-bag.",
"Secure heavy furniture and appliances.",
"Save emergency contact numbers."
];

}

if(weakest.name === "Flood"){

recommendations = [
"Identify evacuation routes.",
"Prepare food and medicine supplies.",
"Subscribe to flood warning alerts.",
"Protect important documents."
];

}

if(weakest.name === "Landslide"){

recommendations = [
"Monitor slope conditions during monsoon.",
"Identify safe evacuation locations.",
"Stay informed through warning systems.",
"Participate in community preparedness programs."
];

}

recommendations.forEach(item => {

let li =
document.createElement("li");

li.innerText = item;

recommendationList.appendChild(li);


});

document
.getElementById("downloadPdfBtn")
.addEventListener("click", generatePDF);

function generatePDF(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF();

const familyName =
localStorage.getItem("familyName") ||
"Unnamed Family";

const reportId =
"FDRI-" +
Date.now().toString().slice(-6);

let cleanCategory = "";

if(fdri <= 30){
cleanCategory = "HIGH RISK";
}
else if(fdri <= 50){
cleanCategory = "NEEDS IMPROVEMENT";
}
else if(fdri <= 70){
cleanCategory = "MODERATELY PREPARED";
}
else if(fdri <= 95){
cleanCategory = "WELL PREPARED";
}
else{
cleanCategory = "EXCEPTIONALLY PREPARED";
}

/* =====================================
PAGE 1
COVER PAGE
===================================== */

doc.setFillColor(20,184,166);

doc.rect(
0,
0,
210,
40,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.setFontSize(28);

doc.text(
"SafeNepal",
20,
22
);

doc.setFontSize(14);

doc.text(
"Family Disaster Readiness Report",
20,
33
);

doc.setTextColor(
0,
0,
0
);

doc.setFontSize(12);

doc.text(
`Report ID: ${reportId}`,
20,
55
);

doc.text(
`Family Name: ${familyName}`,
20,
65
);

doc.text(
`Date: ${new Date().toLocaleDateString()}`,
20,
75
);

/* SCORE BOX */

doc.setFillColor(
14,
165,
233
);

doc.roundedRect(
35,
90,
140,
50,
8,
8,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.setFontSize(16);

doc.text(
"OVERALL FDRI SCORE",
58,
108
);

doc.setFontSize(34);

doc.text(
`${fdri}/100`,
82,
128
);

doc.setTextColor(
0,
0,
0
);

/* CATEGORY BADGE */

let badgeColor = [34,197,94];

if(fdri <= 30){
badgeColor = [239,68,68];
}
else if(fdri <= 50){
badgeColor = [249,115,22];
}
else if(fdri <= 70){
badgeColor = [234,179,8];
}

doc.setFillColor(
badgeColor[0],
badgeColor[1],
badgeColor[2]
);

doc.roundedRect(
45,
150,
120,
16,
4,
4,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.setFontSize(13);

doc.text(
cleanCategory,
58,
161
);

doc.setTextColor(
0,
0,
0
);

/* READINESS BAR */

doc.setFontSize(14);

doc.text(
"Readiness Meter",
20,
185
);

doc.setFillColor(
220,
220,
220
);

doc.rect(
20,
192,
170,
8,
"F"
);

doc.setFillColor(
20,
184,
166
);

doc.rect(
20,
192,
170*(fdri/100),
8,
"F"
);

doc.text(
`${fdri}%`,
90,
212
);

/* =====================================
PAGE 2
ASSESSMENT ANALYSIS
===================================== */

doc.addPage();

doc.setFillColor(
20,
184,
166
);

doc.rect(
0,
0,
210,
25,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.setFontSize(18);

doc.text(
"Assessment Breakdown",
20,
17
);

doc.setTextColor(
0,
0,
0
);

/* EARTHQUAKE CARD */

doc.setFillColor(
254,
242,
242
);

doc.roundedRect(
15,
40,
55,
45,
5,
5,
"F"
);

doc.setFontSize(13);

doc.text(
"Earthquake",
24,
55
);

doc.setFontSize(22);

doc.text(
`${earthquake}`,
32,
75
);

/* FLOOD CARD */

doc.setFillColor(
239,
246,
255
);

doc.roundedRect(
78,
40,
55,
45,
5,
5,
"F"
);

doc.setFontSize(13);

doc.text(
"Flood",
95,
55
);

doc.setFontSize(22);

doc.text(
`${flood}`,
98,
75
);

/* LANDSLIDE CARD */

doc.setFillColor(
240,
253,
244
);

doc.roundedRect(
141,
40,
55,
45,
5,
5,
"F"
);

doc.setFontSize(13);

doc.text(
"Landslide",
150,
55
);

doc.setFontSize(22);

doc.text(
`${landslide}`,
160,
75
);

/* STRONGEST */

doc.setFillColor(
220,
252,
231
);

doc.roundedRect(
15,
105,
180,
22,
5,
5,
"F"
);

doc.setFontSize(12);

doc.text(
`Strongest Area: ${strongest.name} (${strongest.score}/100)`,
25,
119
);

/* PRIORITY */

doc.setFillColor(
255,
237,
213
);

doc.roundedRect(
15,
140,
180,
22,
5,
5,
"F"
);

doc.text(
`Priority Area: ${weakest.name} (${weakest.score}/100)`,
25,
154
);

/* SUMMARY */

doc.setFillColor(
241,
245,
249
);

doc.roundedRect(
15,
180,
180,
60,
5,
5,
"F"
);

doc.setFontSize(14);

doc.text(
"Preparedness Summary",
25,
195
);

doc.setFontSize(11);

doc.text(
summary,
25,
210,
{
maxWidth:160
}
);

/* =====================================
PAGE 3
RECOMMENDATIONS
===================================== */

doc.addPage();

doc.setFillColor(
14,
165,
233
);

doc.rect(
0,
0,
210,
25,
"F"
);

doc.setTextColor(
255,
255,
255
);

doc.setFontSize(18);

doc.text(
"Recommended Actions",
20,
17
);

doc.setTextColor(
0,
0,
0
);

let y = 40;

recommendations.forEach(item => {

doc.setFillColor(
240,
253,
250
);

doc.roundedRect(
15,
y-8,
180,
16,
4,
4,
"F"
);

doc.setFontSize(11);

doc.text(
item,
25,
y+2
);

y += 25;

});

/* CERTIFICATE */

y += 15;

doc.setDrawColor(
20,
184,
166
);

doc.roundedRect(
15,
y,
180,
70,
5,
5
);

doc.setFontSize(18);

doc.text(
"CERTIFICATE OF ASSESSMENT",
35,
y+18
);

doc.setFontSize(12);

doc.text(
"This certifies that",
75,
y+35
);

doc.setFontSize(16);

doc.text(
familyName,
80,
y+50
);

doc.setFontSize(12);

doc.text(
`has achieved an FDRI Score of ${fdri}/100`,
50,
y+65
);

/* FOOTER */

doc.setFontSize(9);

doc.setTextColor(
120,
120,
120
);

doc.text(
"Generated by SafeNepal | Family Disaster Readiness Index Platform",
20,
285
);

doc.save(
`${familyName}_FDRI_Report.pdf`
);

}