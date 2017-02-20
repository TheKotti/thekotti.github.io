//Creates the object that will be used as a source for the mission objectives
function createContainerObject() {
	var missionIndex = document.getElementById("missionselect");
	var mission_name = missionIndex.options[missionIndex.selectedIndex].value;
	var randomMissionList = [showstopper,hh,wot,agc,icon,landslide,ahbos,c27,ff,si];
	
	for (var prop in generic)
		if (generic.hasOwnProperty(prop))
			container[prop] = generic[prop];
	
	if(mission_name === "RANDOM")
		var current_mission = randomMissionList[Math.floor(Math.random()*randomMissionList.length)];
	else
		var current_mission = mission_names_map[mission_name];
	
	for (var prop in current_mission)
		if(current_mission.hasOwnProperty(prop))
			container[prop] = current_mission[prop];
	
	// Create a copy to avoid modifying the originals
	container.disguises = current_mission.disguises.slice()
};

//Makes sure old results are cleared when new objectives are randomized
function clearAll() {
	killList = [];
	container = {};
	result = {};
	document.getElementById("info").innerHTML = "";
};

//Hides unused html elements that appear in some results
function removeUndefined() {	
	if ("undefined" === typeof result.target2) {
		document.getElementById("kill2").innerHTML = "";
	}
	if ("undefined" === typeof result.target3) {
		document.getElementById("kill3").innerHTML = "";
	}
	if ("undefined" === typeof result.target4) {
		document.getElementById("kill4").innerHTML = "";
	}
	if ("undefined" === typeof result.target5) {
		document.getElementById("kill5").innerHTML = "";
	}
	if ("undefined" === typeof result.extra1) {
		document.getElementById("extra1").innerHTML = "";
	}
	if ("undefined" === typeof result.extra2) {
		document.getElementById("extra2").innerHTML = "";
	}
	if ("undefined" === typeof result.extra3) {
		document.getElementById("extra3").innerHTML = "";
	}
	if ("undefined" === typeof result.extra4) {
		document.getElementById("extra4").innerHTML = "";
	}
	if ("undefined" === typeof result.extra5) {
		document.getElementById("extra5").innerHTML = "";
	}
	if ("undefined" === typeof result.extra6) {
		document.getElementById("extra6").innerHTML = "";
	}

};

//Randomizes extra variables for the result
function extras() {
	
if (Math.random() < 0.12 && document.getElementById("disguise").checked == 0) {
	result.extra1 = "Never change into a new disguise.";
}

if (Math.random() < 0.25 && document.getElementById("disguise").checked == 0) {
	result.extra2 = "Do not kill or subdue non-targets.";
}

if (Math.random() < 0.18) {
	result.extra3 = "Do not throw items as distractions.";
}

if (Math.random() < 0.25) {
	result.extra4 = "Do not use firearms as distractions or to destroy objects.";
}

if (Math.random() < 0.12) {
	result.extra5 = "Do not climb.";
}

if (Math.random() < 0.05) {
	result.extra6 = "Do not crouch.";
}

};

//Creates the list of weapons/accidents from which the kill methods are pulled

// TODO: Turn into a pure function
function createWeaponList() {
	if (document.getElementById("melee").checked)
		killList = killList.concat(container.melee);
			
	if (document.getElementById("firearm").checked)
		killList = killList.concat(container.firearms);
	
	if (document.getElementById("accident").checked)
		killList = killList.concat(container.accidents);
	
	if (document.getElementById("generic").checked)
		killList = killList.concat(container.kills);
	
	var no_weapons_selected = !(killList.length > 0);
	if (no_weapons_selected)
		killList.push("No weapons selected!");
};

// Removes "Ninja" and "47 in his Suit" from potential disguises
// when starting in an undercover location
function disguisesOn() {
	var undercover_start = suitStarts.indexOf(result.entry) === -1;
	
	if (undercover_start)
		container.disguises.splice(0,1);
		// The first disguise in the list is always the non-undercover one
}

//Chooses targets and kill methods
function targetsAndKills() {
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	var missionIndex = document.getElementById("missionselect");
	var mission = missionIndex.options[missionIndex.selectedIndex].value;
	
	if (mode == "CONTRACTS") {
		container.targetList = container.contractTargets;
		shuffle(container.targetList);
	}
	if (mode == "ELUSIVE") {
		container.targetList = ["Elusive Target"];
	}
	
	result.target1 = container.targetList[0];
	result.weapon1 = killList[Math.floor(Math.random()*killList.length)];
	result.target2 = container.targetList[1];
	result.weapon2 = killList[Math.floor(Math.random()*killList.length)];
	result.target3 = container.targetList[2];
	result.weapon3 = killList[Math.floor(Math.random()*killList.length)];
	result.target4 = container.targetList[3];
	result.weapon4 = killList[Math.floor(Math.random()*killList.length)];
	result.target5 = container.targetList[4];
	result.weapon5 = killList[Math.floor(Math.random()*killList.length)];
		
	if (mode == "CONTRACTS") {
		var targetAmountCheck = Math.random();
		if (targetAmountCheck < 0.84) {
			result.target5 = undefined;
		}
		if (targetAmountCheck < 0.69) {
			result.target4 = undefined;
		}
		if (targetAmountCheck < 0.39) {
			result.target3 = undefined;
		}
		if (targetAmountCheck < 0.04) {
			result.target2 = undefined;
		}
	}
	
	if (document.getElementById("disguise").checked == 1)  {
		result.disguise1 = " as " + container.disguises[Math.floor(Math.random()*container.disguises.length)];
		result.disguise2 = " as " + container.disguises[Math.floor(Math.random()*container.disguises.length)];
		result.disguise3 = " as " + container.disguises[Math.floor(Math.random()*container.disguises.length)];
		result.disguise4 = " as " + container.disguises[Math.floor(Math.random()*container.disguises.length)];
		result.disguise5 = " as " + container.disguises[Math.floor(Math.random()*container.disguises.length)];
	} else {
		result.disguise1 = "";
		result.disguise2 = "";
		result.disguise3 = "";
		result.disguise4 = "";
		result.disguise5 = "";
	}
	
	if (mode == "MAIN" && container.missionTitle === "Situs Inversus" && !(document.getElementById("melee").checked == 0 && document.getElementById("firearm").checked == 0 && document.getElementById("accident").checked == 0 && document.getElementById("generic").checked == 0)) {
		result.weapon2 = container.sodersKills[Math.floor(Math.random()*container.sodersKills.length)];
	}
};

//Adds properties from the container object to the result object
function containerToResult() {
	result.missionTitle = container.missionTitle;
	result.entry = container.entry[Math.floor(Math.random()*container.entry.length)];
	result.exit = container.exit[Math.floor(Math.random()*container.exit.length)];
};

//Makes text appear
function writeEverything() {
	document.getElementById("chosenmission").innerHTML = result.missionTitle;
	document.getElementById("start").innerHTML = "<p class='bluetext'>Start</p>: " + result.entry;
	document.getElementById("kill1").innerHTML = "<p class='redtext'>" + result.target1 + "</p>: " + result.weapon1 + result.disguise1;
	document.getElementById("kill2").innerHTML = "<p class='redtext'>" + result.target2 + "</p>: " + result.weapon2 + result.disguise2;
	document.getElementById("kill3").innerHTML = "<p class='redtext'>" + result.target3 + "</p>: " + result.weapon3 + result.disguise3;
	document.getElementById("kill4").innerHTML = "<p class='redtext'>" + result.target4 + "</p>: " + result.weapon4 + result.disguise4;
	document.getElementById("kill5").innerHTML = "<p class='redtext'>" + result.target5 + "</p>: " + result.weapon5 + result.disguise5;
	document.getElementById("exit").innerHTML = "<p class='bluetext'>Exit</p>: " + result.exit;
	document.getElementById("extra1").innerHTML = result.extra1;
	document.getElementById("extra2").innerHTML = result.extra2;
	document.getElementById("extra3").innerHTML = result.extra3;
	document.getElementById("extra4").innerHTML = result.extra4;
	document.getElementById("extra5").innerHTML = result.extra5;
	document.getElementById("extra6").innerHTML = result.extra6;
	
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (result.missionTitle == "Freedom Fighters" && mode == "MAIN") {
		document.getElementById("info").innerHTML = "To gain access to the exits, recreate the mission in Contracts mode."
	}
};

//All the things that should happen when you make it go
function literallyEverything() {
	clearAll();
	createContainerObject();
	createWeaponList();
	containerToResult();
	disguisesOn();
	targetsAndKills();
	if(document.getElementById("restrictions").checked)
		extras();
	writeEverything();
	removeUndefined();
};

//Displays/hides the options
function showFilters() {
	var section = document.getElementById('filters');
	var nappi = document.getElementById('filterbutton');
	if (section.style.display !== "none") {
		section.style.display = "none";
		nappi.innerHTML = "Show options";
	} else {
		section.style.display = "block"
		nappi.innerHTML = "Hide options";
	}
};

//Shuffles an array
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
};