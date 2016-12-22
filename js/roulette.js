function clearAll() {
	document.getElementById("mainresult").innerHTML = ("");
	document.getElementById("extra1").innerHTML = ("");
	document.getElementById("extra2").innerHTML = ("");
	document.getElementById("extra3").innerHTML = ("");	
	document.getElementById("extra4").innerHTML = ("");	
	document.getElementById("extra5").innerHTML = ("");	
	document.getElementById("getshotextra").innerHTML = ("");	
	document.getElementById("distractionsextra").innerHTML = ("");	
	document.getElementById("knockoutsextra").innerHTML = ("");	
	document.getElementById("suitonlyextra").innerHTML = ("");	
	document.getElementById("chosenmission").innerHTML = ("");	
	extraNumber = 0;
};

var extraNumber = 0;

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

//For popout
document.getElementById("themeswitch").onclick = function(){
	var theme = document.getElementById("theme_css");
	if (theme.href.match("BMmini.css")) {
		theme.href = "css/minidark.css";
	} else if (theme.href.match = "BMminidark.css") {
		theme.href = "css/mini.css";
	}
}

function extraVariables() {


if (Math.random() <= 0.15) {
    document.getElementById("getshotextra").innerHTML=("Do not get shot at by the guards.");
	extraNumber += 1;
};

if (Math.random() <= 0.15) {
    document.getElementById("distractionsextra").innerHTML=("Do not use gunshots or explosives as distractions.");
	extraNumber += 1;
};

if (Math.random() <= 0.15) {
	document.getElementById("knockoutsextra").innerHTML=("Do not use any unnecessary knockouts or accidents.");
	extraNumber += 1;
};

if (Math.random() <= 0.15) {
	document.getElementById("suitonlyextra").innerHTML=("Do not use any disguises.");
	extraNumber += 1;
};

};

function chooseMission() {

var mission = document.getElementById("missionselect").selectedIndex;
var missionList = [fullAVY,fullCD,fullFL,fullANL,fullTMOC,fullYBWO,fullDOTM,fullTDDUP,fullAHOC,fullADWTD,fullAXXV];

	if ((document.getElementsByTagName("option")[mission].value) === "AVY") {
		fullAVY();
	} else if ((document.getElementsByTagName("option")[mission].value) === "CD"){
		fullCD();
	} else if ((document.getElementsByTagName("option")[mission].value) === "FL") {
		fullFL();
	} else if ((document.getElementsByTagName("option")[mission].value) === "ANL") {
		fullANL();
	} else if ((document.getElementsByTagName("option")[mission].value) === "TMOC") {
		fullTMOC();
	} else if ((document.getElementsByTagName("option")[mission].value) === "YBWO") {
		fullYBWO();
	} else if ((document.getElementsByTagName("option")[mission].value) === "DOTM") {
		fullDOTM();
	} else if ((document.getElementsByTagName("option")[mission].value) === "TDDUP") {
		fullTDDUP();
	} else if ((document.getElementsByTagName("option")[mission].value) === "AHOC") {
		fullAHOC();
	} else if ((document.getElementsByTagName("option")[mission].value) === "ADWTD") {
		fullADWTD();
	} else if ((document.getElementsByTagName("option")[mission].value) === "AXXV") {
		fullAXXV();
	} else if ((document.getElementsByTagName("option")[mission].value) === "RANDOM") {
		missionList[Math.floor(Math.random()*missionList.length)]();
	} else {
		document.getElementById("mainresult").innerHTML = ("Something seems to have gone wrong. Choose another mission and hope something goes right.");
	};

};


function extraAmount() {

	if ((document.getElementById("extraselect").value) === "RANDOM") {
		//do nothing
	} else if ((document.getElementById("extraselect").value) === "0"){
		if (extraNumber !== 0) {
			clearAll(),extraVariables(),chooseMission(),extraAmount();
		}
	} else if ((document.getElementById("extraselect").value) === "1"){
		if (extraNumber !== 1) {
			clearAll(),extraVariables(),chooseMission(),extraAmount();
		}
	} else if ((document.getElementById("extraselect").value) === "2"){
		if (extraNumber !== 2) {
			clearAll(),extraVariables(),chooseMission(),extraAmount();
		}
	} else if ((document.getElementById("extraselect").value) === "3"){
		if (extraNumber !== 3) {
			clearAll(),extraVariables(),chooseMission(),extraAmount();
		}
	} else if ((document.getElementById("extraselect").value) === "4"){
		if (extraNumber !== 4) {
			clearAll(),extraVariables(),chooseMission(),extraAmount();
		}
	} else {
		document.getElementById("testi").innerHTML = ("Something seems to have gone wrong. Choose a different number of extras and hope something goes right.");
	};

};


//Missions

function fullAVY() {
document.getElementById("chosenmission").innerHTML = ("A Vintage Year")

var entryAVY = ["left from the beginning","right from the beginning","through the party to the cellar","through the party to the main building"];
var killAVY = ["Fiber wire","RU-AP mine","Gun","Gravity","Falling object","Water/Wine","Kitchen knife","Hammer","Fire extinguisher","Snub nosed (revolver)"];
var exitAVY = ["cliffside path","elevator"];
var targetsAVY = ["Manuel"]

if (Math.random() <= 0.49) {
	targetsAVY.push("Don Fernando");
} else {
	targetsAVY.unshift("Don Fernando");
};

document.getElementById("mainresult").innerHTML = ("Start by heading " + entryAVY[Math.floor(Math.random()*entryAVY.length)].fontcolor("red") + " and kill the targets in the following order using the following methods:<br><br>" + targetsAVY[0] + ": " + killAVY[Math.floor(Math.random()*killAVY.length)].fontcolor("red") + "<br>" + 
targetsAVY[1] + ": " + killAVY[Math.floor(Math.random()*killAVY.length)].fontcolor("red") + 
"<br><br>Exit using the " + exitAVY[Math.floor(Math.random()*exitAVY.length)].fontcolor("red") + ".")

};

function fullCD() {
document.getElementById("chosenmission").innerHTML = ("Curtains Down")

var entryCD = ["left and down the stairs","through the opera hall","right of the hall and down the stairs"];
var killCD = ["Fiber wire","RU-AP Mine","Gun","Gravity","Falling object","Hammer","Screwdriver","Real WWI pistol"];

document.getElementById("mainresult").innerHTML = ("Start by heading " + entryCD[Math.floor(Math.random()*entryCD.length)].fontcolor("red") + " and kill the targets using the following methods. <br>The order of kills is free unless otherwise specified." + 
"<br><br>D'Alvade: " + killCD[Math.floor(Math.random()*killCD.length)].fontcolor("red") + 
"<br>Delahunt: " + killCD[Math.floor(Math.random()*killCD.length)].fontcolor("red"));

if (Math.random() <= 0.20) {
	document.getElementById("extra1").innerHTML=("Kill Delahunt first.");
	extraNumber += 1;
};
	
if (Math.random() <= 0.20) {
	document.getElementById("extra2").innerHTML=("Retrieve the prop WWI pistol.");
	extraNumber += 1;
};

};

function fullFL() {

document.getElementById("chosenmission").innerHTML = ("Flatline");

var killFL = ["Fiber wire","RU-AP mine","Gun","Pool","Gravity","Accidents"];
var entryFL = ["second floor","front door","security station","gym"];
var targetsFL = shuffle(["<br>Red target".fontcolor("red"),"<br><span id='blue'>Blue target</span>".fontcolor("blue"),"<br><span id='green'>Green target</span>".fontcolor("green")]);

document.getElementById("mainresult").innerHTML = ("Enter through the " + entryFL[Math.floor(Math.random()*entryFL.length)].fontcolor("red") + 
".<br><br>Kill the targets in the following order, using the following methods:<br>" + 
targetsFL[0] + ": " + killFL[Math.floor(Math.random()*killFL.length)] + 
targetsFL[1] + ": " + killFL[Math.floor(Math.random()*killFL.length)] + 
targetsFL[2] + ": " + killFL[Math.floor(Math.random()*killFL.length)]);

};

function fullANL() {
document.getElementById("chosenmission").innerHTML = ("A New Life")

var entryANL = ["garage","basement","front door","backyard"];
var killANL = ["kitchen knife","fiber wire","nailer","RU-AP mine","baseball bat","gun","glass ceiling","car","gravity","swimming pool","hedge cutter","Bull .480"];
var exitANL = ["garage","front door"];

if (Math.random() < 0.04) {
	killANL.push("lethal dose of boredom that is already killing him from the inside")
}

document.getElementById("mainresult").innerHTML = ("Enter through the " + entryANL[Math.floor(Math.random()*entryANL.length)].fontcolor("red") +
 ".<br><br>Kill Vinnie using the " + killANL[Math.floor(Math.random()*killANL.length)].fontcolor("red") +
 ".<br><br>Exit through the " + exitANL[Math.floor(Math.random()*exitANL.length)].fontcolor("red") +". ");

if (Math.random() <= 0.14) {
	document.getElementById("extra1").innerHTML=("Vinnie's wife must survive.");
	extraNumber += 1;
};

if (Math.random() <= 0.19) {
	document.getElementById("extra2").innerHTML = ("The dog must survive.");
	extraNumber += 1;
};

};

function fullTMOC() {
document.getElementById("chosenmission").innerHTML = ("The Murder of Crows");

var killTMOC = ["Fiber wire","RU-AP mine","Gun","Gravity","Kitchen knife","Kazo TRG"];
var targetsTMOC = shuffle(["Angelina","Mark Puryah II","Raymond"]);

while (targetsTMOC[0] === "Raymond") {
	shuffle(targetsTMOC);
};

document.getElementById("mainresult").innerHTML = ("Kill the targets in the following order with the following methods:<br><br>" + 
targetsTMOC[0] + ": " + killTMOC[Math.floor(Math.random()*killTMOC.length)].fontcolor("red") + "<br>" + 
targetsTMOC[1] + ": " + killTMOC[Math.floor(Math.random()*killTMOC.length)].fontcolor("red") + "<br>" + 
targetsTMOC[2] + ": " + killTMOC[Math.floor(Math.random()*killTMOC.length)].fontcolor("red"));

if (Math.random() <= 0.05) {
	document.getElementById("extra1").innerHTML = ("Retrieve the SG552.");
	extraNumber += 1;
};

};

function fullYBWO() {
document.getElementById("chosenmission").innerHTML = ("You Better Watch Out")

var entryYBWO = ["guest elevator","staff elevator"];
var topFloor = ["elevator","staircase"];
var killYBWO = ["Fiber wire","RU-AP mine","Gun","Gravity","Jacuzzi/Water","Kitchen knife"];
var targetsYBWO = ["Chad"]

if (Math.random() < 0.04) {
	killYBWO.push("Old age")
}

if (Math.random() <= 0.69) {
	targetsYBWO.push("Lorne");
} else {
	targetsYBWO.unshift("Lorne");
};

if (Math.random() <= 0.69) {
	exitYBWO = "helicopter."
} else {
	exitYBWO = "boat."
};

document.getElementById("mainresult").innerHTML = ("When going up, use the " + entryYBWO[Math.floor(Math.random()*entryYBWO.length)].fontcolor("red") + 
" to reach the main floor and the " + topFloor[Math.floor(Math.random()*topFloor.length)].fontcolor("red") + 
" to reach the top floor. <br>Kill the targets in the following order, using the following methods:<br><br>" + 
targetsYBWO[0] + ": " + killYBWO[Math.floor(Math.random()*killYBWO.length)].fontcolor("red") + "<br>" + 
targetsYBWO[1] + ": " + killYBWO[Math.floor(Math.random()*killYBWO.length)].fontcolor("red") + 
"<br><br>Exit using the " + exitYBWO.fontcolor("red"));

if (Math.random() <= 0.19) {
	document.getElementById("extra2").innerHTML = ("Kill the female assassin.");
	extraNumber += 1;
};

if (Math.random() <= 0.19) {
	document.getElementById("extra3").innerHTML = ("The dog must survive.");
	extraNumber += 1;
};

};

function fullDOTM() {

document.getElementById("chosenmission").innerHTML = ("Death on the Mississippi");

var killDOTM = ["Fiber wire","RU-AP mine","Gun","Kitchen knife","Fire extinguisher","Shovel","Accidents","Desert Eagle"];
var startDOTM = ["to the engine room","to the cabins"];

document.getElementById("mainresult").innerHTML = ("Start by heading " + startDOTM[Math.floor(Math.random()*startDOTM.length)].fontcolor("red") + ".<br><br>" + 
"Kill the targets using the following weapons:<br><br>Skip: " + killDOTM[Math.floor(Math.random()*killDOTM.length)].fontcolor("red") + 
"<br>Gang member: " + killDOTM[Math.floor(Math.random()*killDOTM.length)].fontcolor("red") + 
"<br>Gang member: " + killDOTM[Math.floor(Math.random()*killDOTM.length)].fontcolor("red") + 
"<br>Gang member: " + killDOTM[Math.floor(Math.random()*killDOTM.length)].fontcolor("red") + 
"<br>Gang member: " + killDOTM[Math.floor(Math.random()*killDOTM.length)].fontcolor("red") + 
"<br>Gang member: " + killDOTM[Math.floor(Math.random()*killDOTM.length)].fontcolor("red") + 
"<br>Gang member: " + killDOTM[Math.floor(Math.random()*killDOTM.length)].fontcolor("red"))

if (Math.random() <= 0.10) {
	document.getElementById("extra1").innerHTML = ("Retrieve the FN-2000.");
	extraNumber += 1;
};

};

function fullTDDUP() {
document.getElementById("chosenmission").innerHTML = ("Till Death Do Us Part")

var entryTDDUP = ["left door","front door","right door"];
var killTDDUP = ["Fiber wire","RU-AP mine","Gun","Gravity","Swamp","Shovel","Chandelier","Elephant Rifle"];
var exitTDDUP = ["your own boat","the priest's boat"];
var targetsTDDUP = ["Buddy"]

if (Math.random() <= 0.49) {
	targetsTDDUP.push("Pappy");
} else {
	targetsTDDUP.unshift("Pappy");
};

document.getElementById("mainresult").innerHTML = ("Enter through the " + entryTDDUP[Math.floor(Math.random()*entryTDDUP.length)].fontcolor("red") +
" and kill the targets in the following order, using the following methods:<br><br>" + 
targetsTDDUP[0] + ": " + killTDDUP[Math.floor(Math.random()*killTDDUP.length)].fontcolor("red") + "<br>" + 
targetsTDDUP[1] + ": " + killTDDUP[Math.floor(Math.random()*killTDDUP.length)].fontcolor("red") + "<br><br>Exit using " + 
exitTDDUP[Math.floor(Math.random()*exitTDDUP.length)].fontcolor("red") + ".")

if (Math.random() <= 0.30) {
	document.getElementById("extra2").innerHTML = ("Never go to the second floor.");
	extraNumber += 1;
};

};

function fullAHOC() {
document.getElementById("chosenmission").innerHTML = ("A House of Cards")

var killAHOC = ["Fiber wire","RU-AP mine","Gun","Gravity"];
var targetsAHOC = shuffle(["Schmutz","The sheikh","The scientist"]);

document.getElementById("mainresult").innerHTML = ("Kill the targets in the following order with the following methods:<br><br>" + 
targetsAHOC[0] + ": " + killAHOC[Math.floor(Math.random()*killAHOC.length)].fontcolor("red") + "<br>" + 
targetsAHOC[1] + ": " + killAHOC[Math.floor(Math.random()*killAHOC.length)].fontcolor("red") + "<br>" + 
targetsAHOC[2] + ": " + killAHOC[Math.floor(Math.random()*killAHOC.length)].fontcolor("red"));

if (Math.random() <= 0.15) {
	document.getElementById("extra1").innerHTML = ("Never step into 7th or 8th floors.");
	extraNumber += 1;
};

};

function fullADWTD(){
document.getElementById("chosenmission").innerHTML = ("A Dance with the Devil")

var danceStart = ["Heaven party","Hell party"]
var danceKill = ["Fiber wire","RU-AP mine","Gun","Accidents","Meat Cleaver","Stiletto","Cane sword","Dragunov Sniper"]

document.getElementById("mainresult").innerHTML = ("Visit the " + danceStart[Math.floor(Math.random()*danceStart.length)].fontcolor("red") + 
" first and kill the targets using the following weapons.<br>The order of kills is free unless otherwise specified.<br><br>Martinez: " + 
danceKill[Math.floor(Math.random()*danceKill.length)].fontcolor("red") +
"<br>Vaana: " + danceKill[Math.floor(Math.random()*danceKill.length)].fontcolor("red") +
"<br>Maynard John: " + danceKill[Math.floor(Math.random()*danceKill.length)].fontcolor("red") +
"<br>Eve: " + danceKill[Math.floor(Math.random()*danceKill.length)].fontcolor("red"))

if (Math.random() <= 0.10) {
	document.getElementById("extra1").innerHTML=("Steal the video tape.");
	extraNumber += 1;
};

};

function fullAXXV() {
document.getElementById("chosenmission").innerHTML = ("Amendment XXV")

var firstHalf = ["the roof","the hallway"];
var secondHalf = ["the roof","the courtyard"];
var killAXXV =  ["Fiber wire","RU-AP mine","Gun","Gravity","Kitchen knife","Nailer","Custom 1911"];
var targetsAXXV = ["The Vice President"]

if (Math.random() <= 0.79) {
	targetsAXXV.push("Mark Parchezzi III");
} else {
	targetsAXXV.unshift("Mark Parchezzi III");
};

document.getElementById("mainresult").innerHTML = ("When going to the main building, use " + firstHalf[Math.floor(Math.random()*firstHalf.length)].fontcolor("red") + 
" and when going to the West Wing, use " + secondHalf[Math.floor(Math.random()*secondHalf.length)].fontcolor("red") + "<br>Kill the targets in the following order, using the following methods:<br><br>" + 
targetsAXXV[0] + ": " + killAXXV[Math.floor(Math.random()*killAXXV.length)].fontcolor("red") + "<br>" + 
targetsAXXV[1] + ": " + killAXXV[Math.floor(Math.random()*killAXXV.length)].fontcolor("red") + 
"<br><br>When returning to the main building, use " + secondHalf[Math.floor(Math.random()*secondHalf.length)].fontcolor("red") + 
" and when returning to the entrance, use " + firstHalf[Math.floor(Math.random()*firstHalf.length)].fontcolor("red") + ".");


if (Math.random() <= 0.05) {
	document.getElementById("extra3").innerHTML=("The fire alarm must not be triggered.");
	extraNumber += 1;
};

if (Math.random() <= 0.10) {
	document.getElementById("extra4").innerHTML=("The dog must survive.");
	extraNumber += 1;
};

};

//oh god what this was a terrible idea
//If I am to continue making difficulty estimates, it's not gonna be using this method
/*
function difficultyCalc() {

var totalValue = 0;
var missionNumber = (document.getElementById("missionselect").selectedIndex);
var mission = (document.getElementsByTagName("option")[missionNumber].value);
var mainObjective = (document.getElementById("mainresult").textContent);
var shot = (document.getElementById("getshotextra").textContent);
var dist = (document.getElementById("distractionsextra").textContent);
var KO = (document.getElementById("knockoutsextra").textContent);
var SO = (document.getElementById("suitonlyextra").textContent);

//ANL
if (document.getElementById("chosenmission").textContent === "A New Life") {
	var wife = (document.getElementById("extra1").textContent);
	//kills
	if (mainObjective.toLowerCase().indexOf("kitchen knife") >= 0) {
		totalValue += 1.0;
	} else if (mainObjective.toLowerCase().indexOf("fiber wire") >= 0) {
		totalValue += 1.0;
	} else if (mainObjective.toLowerCase().indexOf("nailer") >= 0) {
		totalValue += 2.5;
	} else if (mainObjective.toLowerCase().indexOf("ru-ap mine") >= 0) {
		totalValue += 2.5;
	} else if (mainObjective.toLowerCase().indexOf("baseball bat") >= 0) {
		totalValue += 3;
	} else if (mainObjective.toLowerCase().indexOf("the gun") >= 0) {
		totalValue += 0.5;
	} else if (mainObjective.toLowerCase().indexOf("glass ceiling") >= 0) {
		totalValue += 2.5;
	} else if (mainObjective.toLowerCase().indexOf("the car") >= 0) {
		totalValue += 3;
	} else if (mainObjective.toLowerCase().indexOf("gravity") >= 0) {
		totalValue += 3.5;
	} else if (mainObjective.toLowerCase().indexOf("swimming pool") >= 0) {
		totalValue += 3;
	} else if (mainObjective.toLowerCase().indexOf("hedge cutter") >= 0) {
		totalValue += 4.5;
	}
	//entrances
	if (mainObjective.toLowerCase().indexOf("enter through the garage") >= 0) {
		totalValue += 0;
	} else if (mainObjective.toLowerCase().indexOf("enter through the front") >= 0) {
		totalValue += 0;
	} else if (mainObjective.toLowerCase().indexOf("basement") >= 0) {
		totalValue += 0;
	} else if (mainObjective.toLowerCase().indexOf("backyard") >= 0) {
		totalValue += 1.5;
	}
	//exits
	if (mainObjective.toLowerCase().indexOf("exit through the garage") >= 0) {
		totalValue += 0;
	} else if (mainObjective.toLowerCase().indexOf("exit through the front") >= 0) {
		totalValue += 0.5;
	}
	//extras
	if (wife.toLowerCase().indexOf("wife") >= 0) {
		totalValue += 3.0;
	}
	if (shot.toLowerCase().indexOf("shot") >= 0) {
		totalValue += 1;
	}
	if (dist.toLowerCase().indexOf("dist") >= 0) {
		totalValue += 1.0;
	}
	if (KO.toLowerCase().indexOf("knock") >= 0) {
		totalValue += 1.5;
	}
	if (SO.toLowerCase().indexOf("disg") >= 0) {
		totalValue += 0.5;
	}
	//special
	if ((wife.toLowerCase().indexOf("wife") >= 0) && (mainObjective.toLowerCase().indexOf("backyard") >= 0)) {
		totalValue += 4.0;
	};
	if ((mainObjective.toLowerCase().indexOf("the car") >= 0) && (mainObjective.toLowerCase().indexOf("exit through the front") >= 0)) {
		totalValue += 4.5;
	};
	if ((mainObjective.toLowerCase().indexOf("exit through the front") >= 0) && (shot.toLowerCase().indexOf("shot") >= 0)) {
		totalValue += 3.5;
	};
	if ((mainObjective.toLowerCase().indexOf("exit through the front") >= 0) && (shot.toLowerCase().indexOf("shot") >= 0) && (SO.toLowerCase().indexOf("disg") >= 0)) {
		totalValue += 1.5;
	};
	if ((mainObjective.toLowerCase().indexOf("exit through the front") >= 0) && (shot.toLowerCase().indexOf("shot") >= 0) && (SO.toLowerCase().indexOf("disg") >= 0) && (dist.toLowerCase().indexOf("dist") >= 0)) {
		totalValue += 3.5;
	};
	if ((mainObjective.toLowerCase().indexOf("exit through the front") >= 0) && (shot.toLowerCase().indexOf("shot") >= 0) && (SO.toLowerCase().indexOf("disg") >= 0) && (dist.toLowerCase().indexOf("dist") >= 0) && (KO.toLowerCase().indexOf("knock") >= 0)){
		totalValue += 5.0;
	};
}



if (totalValue === 0) {
	document.getElementById("difficulty").innerHTML = ("");
} else {
	document.getElementById("difficulty").innerHTML = ("Estimated difficulty: " + totalValue.toFixed(1));
}
};
*/






