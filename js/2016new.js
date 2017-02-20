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
	container = {};
	result = {};
};

//Randomizes extra variables for the result
// TODO: Turn into data
function extras() {
	result.extras = []
	
if (Math.random() < 0.12 && document.getElementById("disguise").checked == 0)
	result.extras.push("Never change into a new disguise.");

if (Math.random() < 0.25 && document.getElementById("disguise").checked == 0)
	result.extras.push("Do not kill or subdue non-targets.");
	
if (Math.random() < 0.18) 
	result.extras.push("Do not throw items as distractions.");

if (Math.random() < 0.25)
	result.extras.push("Do not use firearms as distractions or to destroy objects.");

if (Math.random() < 0.12)
	result.extras.push("Do not climb.");

if (Math.random() < 0.05)
	result.extras.push("Do not crouch.");
	
};

//Returns the list of weapons/accidents from which the kill methods are pulled
function createWeaponList() {
	var killList = []
	
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
	
	return killList;
};

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
	result.num_targets = result.targets.length;
	// Randomize weapons
	result.weapons = createWeaponList();
	shuffle(result.weapons);
		
	if (mode == "CONTRACTS") {
		var targetAmountCheck = Math.random();
		result.num_targets = 5;
		if (targetAmountCheck < 0.84) result.num_targets--;
		if (targetAmountCheck < 0.69) result.num_targets--;
		if (targetAmountCheck < 0.39) result.num_targets--;
		if (targetAmountCheck < 0.04) result.num_targets--;
	}
	
	// Removee "Ninja" and "47 in his Suit" from potential disguises
	// when starting in an undercover location
	var undercover_start = suitStarts.indexOf(result.entry) === -1;
	if (undercover_start)
		// The first disguise in the list is always the non-undercover one
		container.disguises.splice(0,1);
	
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
	
	// Write to the HTML elements from the results object
	for(var i = 0; i < 5; ++i){ // kills
		if(i < result.num_targets)
			document.getElementById("kill" + (i+1)).innerHTML = 
				"<p class='redtext'>" + result.targets[i]
				+ "</p>: " + result.weapons[i] + result.disguises[i];
		else
			document.getElementById("kill" + (i+1)).innerHTML = "";
	}
	for(var i = 0; i < 6; ++i){ // extras
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

//All the things that should happen when you make it go
function literallyEverything() {
	clearAll();
	createContainerObject();
	containerToResult();
	targetsAndKills();
	if(document.getElementById("restrictions").checked)
		extras();
	writeEverything();
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