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

const data = [

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

const container =
document.getElementById(
"riskCards"
);

data.forEach(d=>{

let risk = "";

if(d.score <= 30){

risk = "🔴 High Risk";

}
else if(d.score <= 50){

risk = "🟠 Moderate Risk";

}
else{

risk = "🟢 Low Risk";

}

container.innerHTML +=

`
<div class="risk-card">

<h2>${d.name}</h2>

<h3>${risk}</h3>

<p>
Score: ${d.score}/100
</p>

</div>
`;

});