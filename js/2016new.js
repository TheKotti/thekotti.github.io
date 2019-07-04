//Creates the object that will be used as a source for the mission objectives
function createContainerObject() {
	container = {};
	
	var missionIndex = document.getElementById("missionselect");
	var mission_name = missionIndex.options[missionIndex.selectedIndex].value;
	var randomMissionList = [showstopper,hh,wot,agc,icon,landslide,ahbos,c27,ff,si,ts,ta,pz,tfl,ths,cag,al,tas,gh,eots,iog];
//The Vector is missing due to way too many workarounds for dribbleondo to get that mission working properly.
	
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
	
	return container
};

//Randomizes extra variables for the result
function createExtrasList(exit) {
	if(!document.getElementById("restrictions").checked)
		return [];
		
	var extras = [];
	
	if (Math.random() < 0.12
		&& document.getElementById("disguise").checked == 0
		&& !disguiseExits.includes(exit))
		extras.push("Never change into a new disguise.");

	if (Math.random() < 0.20
		&& document.getElementById("disguise").checked == 0
		&& !koExits.includes(exit))
		extras.push("Do not kill or subdue non-targets.");
	
	if (Math.random() < 0.18) 
		extras.push("Do not throw items as distractions.");

	if (Math.random() < 0.25)
		extras.push("Do not use firearms as distractions or to destroy objects.");

	if (Math.random() < 0.12)
		extras.push("Do not climb.");

	if (Math.random() < 0.05)
		extras.push("Do not crouch.");
	
	return extras;
};

//Returns the list of weapons/accidents from which the kill methods are pulled
function createWeaponList(container) {
	var kills = []
	
	for( var kill_type in killTypesMap )
		if (document.getElementById(kill_type).checked)
			kills = kills.concat(container[killTypesMap[kill_type]]);
	
	var no_weapons_selected = !(kills.length > 0);
	if (no_weapons_selected)
		for(var i = 0; i < 5; ++i)
			kills.push("No weapons selected!");
	
	// Randomize weapons
	shuffle(kills);
	
	// add Soders-specific kill if relevant. Tried to do the same for Bradley Paine, with no luck =/
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (mode == "MAIN" && container.missionTitle === "Situs Inversus" && !(no_weapons_selected)) 
		kills[1] = container.sodersKills[Math.floor(Math.random()*container.sodersKills.length)];
	
	return kills;
};

//Create the disguise list
//reads the "entry" field in mission_information
function createDisguiseList(container, mission_information) {
	var disguises = [];
	// Remove "Ninja" and "47 in his Suit" from potential disguises
	// when starting in an undercover location
	// The first disguise in the list is always the non-undercover one
	var undercover_start = suitStarts.indexOf(mission_information.entry) === -1;
	if (undercover_start)
		container.disguises.splice(0,1);
	
	//copy the disguise list, add  " as " to every element, then shuffle it
	if (document.getElementById("disguise").checked)
		disguises =
			container.disguises.slice().map(function(e){ return " as " + e; });
	else
		disguises = ["", "", "", "", ""];
	
	shuffle(disguises);
	return disguises;
};

//Chooses targets and kill methods
function createTargetList(container) {
	var targets = [];
	
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (mode == "CONTRACTS") {
		var targetAmountCheck = Math.random();
		var num_targets = 5;
		if (targetAmountCheck < 0.84) num_targets--;
		if (targetAmountCheck < 0.69) num_targets--;
		if (targetAmountCheck < 0.39) num_targets--;
		if (targetAmountCheck < 0.04) num_targets--;
		
		shuffle(container.contractTargets);
		targets = container.contractTargets.slice(0, num_targets);
	}
	else if (mode == "ELUSIVE")
		targets = ["Elusive Target"];
	else {
		// Copy the missions' target list
		targets = container.targetList.slice();
	}
	
	return targets;
};

//Adds properties from the container object to the result object
function containerToResult(container) {
	var result = {};
	result.missionTitle = container.missionTitle;
	result.entry = container.entry[Math.floor(Math.random()*container.entry.length)];
	result.exit = container.exit[Math.floor(Math.random()*container.exit.length)];
	return result;
};

//Makes text appear
function writeEverything(result) {
	document.getElementById("chosenmission").innerHTML = result.missionTitle;
	document.getElementById("start").innerHTML =
		"<p class='bluetext'>Start</p>: " + result.entry;
	
	var MAX_TARGETS = 5, MAX_EXTRAS = 6;
	
	// Write to the HTML elements from the results object
	for(var i = 0; i < MAX_TARGETS; ++i){ // kills
		if(i < result.targets.length)
			document.getElementById("kill" + (i+1)).innerHTML = 
				"<p class='redtext'>" + result.targets[i]
				+ "</p>: " + result.weapons[i] + result.disguises[i];
		else
			document.getElementById("kill" + (i+1)).innerHTML = "";
	}
	for(var i = 0; i < MAX_EXTRAS; ++i){ // extras
		if(i < result.extras.length)
			document.getElementById("extra" + (i+1)).innerHTML = result.extras[i];
		else 
			document.getElementById("extra" + (i+1)).innerHTML = "";
	}
	document.getElementById("exit").innerHTML =
		"<p class='bluetext'>Exit</p>: " + result.exit;
	
	var modeIndex = document.getElementById("modeselect");
	var mode = modeIndex.options[modeIndex.selectedIndex].value;
	if (result.missionTitle == "Freedom Fighters" && mode == "MAIN")
		document.getElementById("info").innerHTML =
			"To gain access to the exits, recreate the mission in Contracts mode.";
	else
		document.getElementById("info").innerHTML = "";
};

function generate_result() {
	const current_mission = createContainerObject();
	
	var roulette = containerToResult(current_mission);
	roulette.extras = createExtrasList(roulette.exit);
	roulette.targets = createTargetList(current_mission);
	roulette.weapons = createWeaponList(current_mission);
	roulette.disguises = createDisguiseList(current_mission, roulette);
	
	return roulette;
};

//All the things that should happen when you make it go
function button_MakeItGo(){
	var result = generate_result();
	writeEverything(result);
	history_push(result);
}

//adds x to the history stack for a maximum of 20 most recent runs
function history_push(x){
	redo_stack = [];
	history_past.push(x);
	if(history_past.length > 20)
		history_past.shift();
	
	//history exists, enable undo_nappi
	if(history_past.length > 1)
		document.getElementById("undo_nappi").disabled = false;
	// disable redo_nappi
	document.getElementById("redo_nappi").disabled = true;
}


// undo and redo functions, affect global state
function history_undo(){
	if(history_past.length < 2)
		return;
	
	//add the currently displayed result to the redo stack
	redo_stack.push(history_past.pop());
	var previous = history_past[history_past.length - 1];
	writeEverything(previous);
	
	// enable redo_nappi
	document.getElementById("redo_nappi").disabled = false;
	//history exists, enable undo_nappi
	if(history_past.length < 2)
		document.getElementById("undo_nappi").disabled = true;
}

function history_redo(){
	if(redo_stack.length < 1)
		return;
	
	history_past.push(redo_stack.pop());
	var previous = history_past[history_past.length - 1];
	writeEverything(previous);
	
	
	//history exists, enable undo_nappi
	if(history_past.length > 1)
		document.getElementById("undo_nappi").disabled = false;
	// disable redo_nappi
	if(redo_stack.length < 1)
		document.getElementById("redo_nappi").disabled = true;
}

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
