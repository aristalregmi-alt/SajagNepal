const items =
document.querySelectorAll(".item");

items.forEach(item=>{

item.addEventListener("change",
updateProgress);

});

function updateProgress(){

let checked = 0;

items.forEach(item=>{

if(item.checked){

checked++;

}

});

let percent =
Math.round(
(checked/items.length)*100
);

document.getElementById(
"progressFill"
).style.width =
percent+"%";

document.getElementById(
"progressText"
).innerText =
percent+"% Complete";

localStorage.setItem(
"preparednessPercent",
percent
);

}