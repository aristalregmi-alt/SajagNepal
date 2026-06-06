const earthquake =
Number(localStorage.getItem("earthquakeScore")) || 0;

const flood =
Number(localStorage.getItem("floodScore")) || 0;

const landslide =
Number(localStorage.getItem("landslideScore")) || 0;

let advice = "";

if(earthquake <= 70){

advice += `

🏠 EARTHQUAKE PREPAREDNESS

• Practice Drop-Cover-Hold

• Secure furniture

• Prepare go-bag

• Save emergency contacts

`;
}

if(flood <= 70){

advice += `

🌊 FLOOD PREPAREDNESS

• Protect important documents

• Learn evacuation routes

• Maintain food supplies

• Monitor flood warnings

`;
}

if(landslide <= 70){

advice += `

⛰️ LANDSLIDE PREPAREDNESS

• Monitor slope conditions

• Learn safe evacuation routes

• Stay updated through alerts

• Participate in awareness programs

`;
}

if(
earthquake > 70 &&
flood > 70 &&
landslide > 70
){

advice =

`
🎉 Excellent Preparedness!

Your family demonstrates strong readiness across all assessed disaster categories.

Continue maintaining emergency supplies and conducting periodic drills.
`;

}

document.getElementById("advice").innerText =
advice;