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
	var optionals = [
		"kill2", "kill3", "kill4", "kill5",
		"extra1", "extra2", "extra3", "extra4", "extra5", "extra6"
	]
	
	optionals.forEach( function(element){
		var HTML_element = document.getElementById(element).innerHTML;
		var missing = !(HTML_element.indexOf("undefined") === -1);
	
		if(missing)
			document.getElementById(element).innerHTML = "";
	});
};

//Randomizes extra variables for the result
// TODO: Turn into data
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
	
	if (mode == "CONTRACTS") {
		container.targetList = container.contractTargets;
		shuffle(container.targetList);
	}
	if (mode == "ELUSIVE")
		container.targetList = ["Elusive Target"];
	
	// Copy the target list
	result.targets = container.targetList.slice();
	// Randomize weapons
	shuffle(killList);
	result.weapons = killList;
		
	if (mode == "CONTRACTS") {
		var targetAmountCheck = Math.random();
		if (targetAmountCheck < 0.84) {
			result.targets[4] = undefined;
		}
		if (targetAmountCheck < 0.69) {
			result.targets[3] = undefined;
		}
		if (targetAmountCheck < 0.39) {
			result.targets[2] = undefined;
		}
		if (targetAmountCheck < 0.04) {
			result.targets[1] = undefined;
		}
	}
	
	if (document.getElementById("disguise").checked)  {
		//copy the disguise list, add  " as " to every element, then shuffle it
		result.disguises =
			container.disguises.slice().map(function(e){ return " as " + e; });
		shuffle(result.disguises);
	} else
		result.disguises = ["", "", "", "", ""];
	
	// add Soders-specific kill if relevant
	if (mode == "MAIN" && container.missionTitle === "Situs Inversus" && !(document.getElementById("melee").checked == 0 && document.getElementById("firearm").checked == 0 && document.getElementById("accident").checked == 0 && document.getElementById("generic").checked == 0)) {
		result.weapons[1] = container.sodersKills[Math.floor(Math.random()*container.sodersKills.length)];
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
	document.getElementById("start").innerHTML =
		"<p class='bluetext'>Start</p>: " + result.entry;
	
	for(var i = 0; i < 5; ++i)
		document.getElementById("kill" + (i+1)).innerHTML = 
			"<p class='redtext'>" + result.targets[i]
			+ "</p>: " + result.weapons[i] + result.disguises[i];
	
	for(var i = 1; i < 7; ++i)
		document.getElementById("extra" + i).innerHTML = result["extra"+i];
	
	document.getElementById("exit").innerHTML =
		"<p class='bluetext'>Exit</p>: " + result.exit;
	
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (result.missionTitle == "Freedom Fighters" && mode == "MAIN")
		document.getElementById("info").innerHTML =
			"To gain access to the exits, recreate the mission in Contracts mode.";
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