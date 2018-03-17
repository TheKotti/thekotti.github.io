// top of the history_past stack is the most recently displayed result
var history_past = []
var redo_stack = []

var suitStarts = ["Red Carpet","Palace Garden","Pile-Driver Barge","Attic","Undercover at IAGO Auction","Main Square","ICA Safe House","Harbor","Sapienza Ruins","Main Square Tower","Church Morgue","City gates","Promenade","Bazaar Entrance","Lamp Store Rooftop","School Alley","Consulate Parking Garage","Consulate plaza","Riverside Landing","47's Suite","West Bridge","Old Orchard","Southern Farm Perimeter","Water Tower","Infiltrating Along the Mountain Path","Riverside Landing","The Beach","Up The Ladder","Undercover gear near helipad"];

var generic = {
	kills: ["Firearm","Melee Weapon (Small)","Melee Weapon (Large)","Accident","Explosion","Poison"],
	firearms: ["Pistol","Sniper Rifle","Explosive (Weapon)","Assault Rifle","SMG","Loud Shotgun"],
	accidents: ["Drowning","Falling Object","Fall","Fire","Electricity","Explosion (Accident)"],
};

var showstopper = {
	missionTitle: "The Showstopper",
	melee: ["Screwdriver","Letter Opener","Scissors","Kitchen Knife","Fiber Wire","Fire Axe","Battle Axe","Saber","Hatchet"],
	targetList: ["Viktor Novikov","Dalia Margolis"],
	contractTargets: ["Viktor Novikov","Dalia Margolis","Sebastian Sato","Helmut Kruger","Max Decker","Sheik Salman Al-Ghazali","Liza McKenzie","Hailey Brennan","Kurt Donovan","Sophus Fatale"],
	entry: ["Red Carpet","Palace Garden","Pile-Driver Barge","Attic","Undercover in Kitchen","Undercover in Locker Room","Undercover at IAGO Auction","Undercover in AV Center","Undercover in Dressing Area"],
	exit: ["Front Gates","Kitchen","Helicopter","Speedboat"],
	disguises: ["47 in his Suit","Auction Staff","Chef","CICADA Bodyguard","Event Crew","Palace Staff","Security Guard","Stylist","Helmut Kruger","Sheikh","Vampire Magician"],
};

var hh = {
	missionTitle: "Holiday Hoarders",
	melee: ["Screwdriver","Letter Opener","Scissors","Kitchen Knife","Fiber Wire","Fire Axe","Battle Axe","Saber","Hatchet","Holiday Fireaxe","Shuriken","Circumcision Knife"],
	targetList: ['Harry "Smokey" Bagnato', 'Marv "Slick" Gonif'],
	contractTargets: ['Harry "Smokey" Bagnato', 'Marv "Slick" Gonif'],
	entry: ["Red Carpet","Palace Garden","Pile-Driver Barge","Attic","Undercover in Kitchen","Undercover in Locker Room","Undercover at IAGO Auction","Undercover in AV Center","Undercover in Dressing Area"],
	exit: ["Front Gates","Kitchen","Helicopter","Speedboat", "Chimney"],
	disguises: ["47 in his Suit","Auction Staff","Chef","CICADA Bodyguard","Event Crew","Palace Staff","Security Guard","Stylist","Helmut Kruger","Sheikh","Vampire Magician"],
};

var wot = {
	missionTitle: "World of Tomorrow",
	melee: ["Battle Axe","Old Axe","Katana","Fire Axe","Saber","Amputation Knife","Circumcision Knife","Combat Knife","Hatchet","Kitchen Knife","Letter Opener","Screwdriver","Fiber Wire"],
	targetList: ["Silvio Caruso","Francesca De Santis"],
	contractTargets: ["Silvio Caruso","Francesca De Santis","Terenzio Endrizzi","Roberto Vargas","Chef Marcello Ray","Luigi Saltatore","Dr. Oscar Lafayette","Torres Piombo","Sal Falcone","Viana Buccho","Fabio Pavione","Mario Saltatore"],
	entry: ["Main Square","ICA Safe House","Harbor","Sapienza Ruins","Main Square Tower","Church Morgue","Undercover in Mansion Kitchen","Undercover in Field Lab","Undercover in Mansion Garden","Undercover as Security Staff"],
	exit: ["Car","Speedboat (Pier)","Plane","Speedboat (Ruins)"],
	disguises: ["47 in his Suit","Biolab Security","Bodyguard","Bohemian","Butler","Church Staff","Cyclist","Delivery Man","Dr. Oscar Lafayette","Gardener","Green Plumber","Hazmat Suit","Housekeeper","Kitchen Assistant","Lab Technician","Mansion Chef","Mansion Security","Mansion Staff","Plague Doctor","Priest","Private Detective","Red Plumber","Roberto Vargas","Store Clerk","Street Performer","Waiter"],
};

var icon = {
	missionTitle: "The Icon",
	melee: ["Battle Axe","Cleaver","Fire Axe","Knife","Screwdriver","Fiber Wire"],
	targetList: ["Dino Bosco"],
	contractTargets: ["Dino Bosco","Palmiro Russo","Enrico Nucci","Sophia Wilde","Giuseppe Monaldo","Amaranto 'Tony' Mazzi"],
	entry: ["City gates"],
	exit: ["Town Gate","Bosco's Car"],
	disguises: ["47 in his Suit","Kitchen Assistant","Moview Crew","Security Officer","SFX Crew"],
};

var landslide = {
	missionTitle: "Landslide",
	melee: ["Fiber Wire","Screwdriver","Scissors","Old Axe","Kitchen Knife","Saber","Folding Knife","Fire Axe","Letter Opener","Cleaver"],
	targetList: ["Marco Abiatti"],
	contractTargets: ["Marco Abiatti","Marcello Folliero","Alberta Arcuri","Padre Francesco","Mario Fratelli","Luigi Fratelli","Cristina Dionisi","Roberto Mulo","Dario Bronzo","Renzo Forte","Salvatore Bravuomo","Silvestro Pugliesi"],
	entry: ["Promenade"],
	exit: ["Town Gate","Car","Speedboat"],
	disguises: ["47 in his Suit","Stage Crew","Security","Bodyguard","Photographer","Waiter","Church Staff","Priest","Gardener","Green Plumber","Red Plumber","Kitchen Assistant","Salvatore Bravuomo","Bohemian"],
};

var agc = {
	missionTitle: "A Gilded Cage",
	melee: ["Battle Axe","Fire Axe","Saber","Scissors","Screwdriver","Kitchen Knife","Cleaver","Letter Opener","Folding Knife","Fiber Wire"],
	targetList: ["Claus Hugo Strandberg","Reza Zaydan"],
	contractTargets: ["Claus Hugo Strandberg","Reza Zaydan","Ashraf Raghib Mustafa","Jeff Baker","Shahin Abdul-Barr Maalouf","Konny Engström","Jawwaad Reza","Hektor Lindberg","Zaki Diab","Shuaib Aly","Hilda Berg"],
	entry: ["Bazaar Entrance","Undercover at the Snail Stand","Undercover on the West Bazaar Rooftop","Undercover in the Courtyard Club","Undercover in Zaydan's Compound","Lamp Store Rooftop","Undercover in the Consulate","School Alley","Consulate Parking Garage"],
	exit: ["Bazaar Gates","Armored Vehicle","Car in the Garage"],
	disguises: ["47 in his Suit","Bodyguard","Cameraman","Consulate Intern","Consulate Janitor","Consulate Security","Elite Soldier","Food Vendor","Fortune Teller","Handyman","Headmaster","Local Printing Crew","Masseur","Military Officer","Soldier","Prisoner","Shopkeeper","Waiter"],
};

var ahbos = {
	missionTitle: "A House Built on Sand",
	melee: ["Battle Axe","Cleaver","Folding Knife","Kitchen Knife","Scissors","Screwdriver","Fiber Wire"],
	targetList: ["Matthieu Mendola","Kong Tuo-Kwang"],
	contractTargets: ["Matthieu Mendola","Kong Tuo-Kwang","Yousef Shitrit","Jalal al Din Muti Said","Zaki Diab","Hussein Guirguis","Ahmed Aziz","Jewel Bourgeois"],
	entry: ["Consulate plaza"],
	exit: ["Bazaar Gates","Truck","Door near the Well","Door by the Street"],
	disguises: ["47 in his Suit","Bodyguard","Food Vendor","Fortune Teller","Handyman","Soldier","Shopkeeper","Waiter"],
};

var c27 = {
	missionTitle: "Club 27",
	melee: ["Kitchen Knife","Screwdriver","Fire Axe","Cleaver","Hatchet","Letter Opener","Katana","Fiber Wire","Sapper's Axe"],
	targetList: ["Jordan Cross","Ken Morgan"],
	contractTargets: ["Jordan Cross","Ken Morgan","Dexy Barat","Max Liston","Heidi Santoro","Toby Hicks","Jackie Carrington","Abel De Silva","Mrs. Mookjai","Tharn Srisai","Julian","Benjamin Bertam","Otis Kaplan"],
	entry: ["Riverside Landing","47's Suite","Undercover in the Restaurant Kitchen","Undercover in the Linen Room","Undercover by the Security Shed","Undercover at the Himmapan Bar","Undercover in the Side Garden","Undercover in the 2nd Floor Hallway"],
	exit: ["Boat","Tuk-tuk","Tunnel"],
	disguises: ["47 in his Suit","Drummer","Exterminator","Groundskeeper","Hotel Security","Hotel Staff","Jordan Cross' Bodyguard","Kitchen Staff","Ken Morgan's Bodyguard","Recording Crew","Stalker","Waiter"],
};

var ff = {
	missionTitle: "Freedom Fighters",
	melee: ["Cleaver","Old Axe","Kitchen Knife","Screwdriver","Fiber Wire"],
	targetList: ["Sean Rose","Penelope Graves","Ezra Berg","Maya Parvati"],
	contractTargets: ["Sean Rose","Penelope Graves","Ezra Berg","Maya Parvati","Quince Elliot","Robert Powell","Lloyd Burgess","Milton Geiger","Mario Thompson","Liam Butler","Albert Knarr"],
	entry: ["Undercover in the Garage","West Bridge","Undercover by the Greenhouse","Undercover on the Demolition Range","Old Orchard","Southern Farm Perimeter","Undercover in the Farmhouse","Water Tower"],
	exit: ["Bridge","Quad Bike","River","Front Gate","Tornado Shelter"],
	disguises: ["47 in his Suit","Explosives Specialist","Hacker","Militia Cook","Militia Elite","Militia Spec Ops","Militia Soldier","Militia Technician","Point Man","Scarecrow"],
};

var si = {
	missionTitle: "Situs Inversus",
	melee: ["Fiber Wire","Scalpel","Scissors","Kitchen Knife","Cleaver","Katana","Screwdriver","Fire Axe"],
	targetList: ["Yuki Yamazaki","Erich Soders"],
	contractTargets: ["Yuki Yamazaki","Lowell Aucoin","Toshimi 'Sandā no ashi' Kaneko","Amos Dexter","Akira Nakamura","Jason Portman","J. Brooke","Nicholas Laurent","Nails","Kimiho Ookawa","Katashi Ito","Tomiyuki Fujihara"],
	entry: ["Tobias Rieper's Suite","Spa","Infiltrating Along the Mountain Path","Restaurant","Undercover in the Staff Quarters","Undercover in the Kitchen","Undercover in the Garden","Morgue","Undercover in the Operating Theater"],
	exit: ["Helicopter","Snowmobile","Hiking Route","Cable Car"],
	sodersKills: ["Throw the Heart into the Trash Can","Shoot the Heart","Electricution","Pistol","Large Firearm","Explosion","Poison the Stem Cells","Reveal Yourself as 47","Fail the Surgery","Make the Surgeon Fail the Surgery","Robot Arms"],
	disguises: ["Ninja","47 in his Suit","Baseball Player","Bodyguard","Chef","Chief Surgeon","Doctor","Handyman","Helicopter Pilot","Hospital Director","Morgue Doctor","Motorcyclist","Patient","Resort Security","Resort Staff","Surgeon","VIP Patient (Dexter)","VIP Patient (Portman)","Yoga Instructor"]
};

var ts = {
	missionTitle: "The Source",
	melee: ["Kitchen Knife","Screwdriver","Fire Axe","Cleaver","Hatchet","Letter Opener","Katana","Fiber Wire","Sapper's Axe"],
	targetList: ["Oybek Nabazov","Sister Yulduz"],
	contractTargets: ["Oybek Nabazov","Sister Yulduz"],
	entry: ["Riverside Landing"],
	exit: ["Boat","Tunnel"],
	disguises: ["47 in his Suit","Exterminator","Groundskeeper","Hotel Security","Hotel Staff","Cult Bodyguard","Kitchen Staff","Waiter","Cult Member"],
};

var ta = {
	missionTitle: "The Author",
	melee: ["Battle Axe","Cleaver","Fire Axe","Knife","Screwdriver","Fiber Wire"],
	targetList: ["Craig Black","Brother Akram"],
	contractTargets: ["Craig Black","Brother Akram"],
	entry: ["The Beach"],
	exit: ["Town Gate"],
	disguises: ["47 in his Suit","Waiter","Craig Black","Brother Akram","The Superfan","Bodyguard"],
};

var tv = {
	missionTitle: "The Vector",
	targetList: ["Bradley Paine"],
	contractTargets: ["Bradley Paine"],
	entry: ["Up the Ladder"],
	exit: ["Down the Ladder"],
	disguises: ["47 in his sniping trenchcoat"],
};

var pz = {
	missionTitle: "Patient Zero",
	melee: ["Fiber Wire","Scalpel","Scissors","Kitchen Knife","Cleaver","Katana","Screwdriver","Fire Axe","Lethal Poison Syringe"],
	targetList: ["Owen Cage","Klaus Liebleid"],
	contractTargets: ["Owen Cage","Klaus Liebleid"],
	entry: ["Undercover gear near helipad"],
	exit: ["Helicopter","Snowmobile","Hiking Route","Cable Car"],
	disguises: ["47 in his undercover gear","Baseball Player","Bodyguard","Chef","Chief Surgeon","Doctor","Handyman","Helicopter Pilot","Hospital Director","Morgue Doctor","Motorcyclist","Patient","Resort Security","Resort Staff","Surgeon","VIP Patient (Dexter)","Yoga Instructor"]
};


var mission_names_map = {
	"TSS" : showstopper,
	"HH": hh,
	"WOT": wot,
	"ICON": icon,
	"LS": landslide,
	"AGC": agc,
	"AHBOS": ahbos,
	"C27": c27,
	"FF": ff,
	"SI": si,
        "TS": ts,
	"TA": ta,
	"TV": tv,
	"PZ": pz
}

var killTypesMap = {
	"melee": "melee",
	"firearm": "firearms",
	"accident": "accidents",
	"generic": "kills"
}
