// top of the history_past stack is the most recently displayed result
var history_past = []
var redo_stack = []

var suitStarts = ["Red Carpet","Palace Garden","Pile-Driver Barge","Attic","Undercover at IAGO Auction","Main Square","ICA Safe House","Harbor","Sapienza Ruins","Main Square Tower","Church Morgue","City gates","Promenade","Bazaar Entrance","Lamp Store Rooftop","School Alley","Consulate Parking Garage","Consulate plaza","Riverside Landing","47's Suite","West Bridge","Old Orchard","Southern Farm Perimeter","Water Tower","Infiltrating Along the Mountain Path","Riverside Landing","The Beach","Undercover gear near helipad","Event Entrance","Dolphin Fountain","Marina","Stands","Village Bus Stop","Village Hostel","Shaman's Hut","Village Bar","Main Street","Train","Boat","Skywalk","Taxi","Chawls","Whittleton Creek","Harbor","Chapel","Keep"];

var disguiseExits = ["Ambulance", "Trash Truck"];

var generic = {
	kills: ["Firearm","Melee Weapon (Small)","Melee Weapon (Large)","Accident","Explosion","Poison"],
	firearms: ["Pistol","Sniper Rifle","Explosive (Weapon)","Assault Rifle","SMG","Loud Shotgun"],
	accidents: ["Drowning","Falling Object","Fall","Fire","Electricity","Explosion (Accident)"]
};

var showstopper = {
	missionTitle: "The Showstopper",
	melee: ["Screwdriver","Letter Opener","Scissors","Kitchen Knife","Fiber Wire","Fire Axe","Battle Axe","Saber","Hatchet"],
	targetList: ["Viktor Novikov","Dalia Margolis"],
	contractTargets: ["Viktor Novikov","Dalia Margolis","Fashion designer Sebastian Sato","Model Helmut Kruger","FSB agent Max Decker","Sheik Salman Al-Ghazali","Reporter Liza McKenzie","Dalia's secretary Hailey Brennan","Viktor's bodyguard Kurt Donovan","Dalia's assistant Sophus Fatale"],
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
	contractTargets: ["Silvio Caruso","Francesca De Santis","Butler Terenzio Endrizzi","Golf coach Roberto Vargas","Chef Marcello Ray","Green plumber Luigi Saltatore","Dr. Oscar Lafayette","Bohemian Torres Piombo","Private investigator Sal Falcone","Scientist with dongle Viana Buccho","Undertaker Fabio Pavione","Red plumber Mario Saltatore"],
	entry: ["Main Square","ICA Safe House","Harbor","Sapienza Ruins","Main Square Tower","Church Morgue","Undercover in Mansion Kitchen","Undercover in Field Lab","Undercover in Mansion Garden","Undercover as Security Staff"],
	exit: ["Car","Speedboat (Pier)","Plane","Speedboat (Ruins)"],
	disguises: ["47 in his Suit","Biolab Security","Bodyguard","Bohemian","Butler","Church Staff","Cyclist","Delivery Man","Dr. Oscar Lafayette","Gardener","Green Plumber","Hazmat Suit","Housekeeper","Kitchen Assistant","Lab Technician","Mansion Chef","Mansion Security","Mansion Staff","Plague Doctor","Priest","Private Detective","Red Plumber","Roberto Vargas","Store Clerk","Street Performer","Waiter"],
};

var icon = {
	missionTitle: "The Icon",
	melee: ["Battle Axe","Cleaver","Fire Axe","Knife","Screwdriver","Fiber Wire"],
	targetList: ["Dino Bosco"],
	contractTargets: ["Dino Bosco","Tech crew member near city gates Palmiro Russo","Merchandise salesman Enrico Nucci","Bosco's agent Sophia Wilde","Guard in the tower Giuseppe Monaldo","SFX crew member indoors Amaranto 'Tony' Mazzi"],
	entry: ["City gates"],
	exit: ["Town Gate","Bosco's Car"],
	disguises: ["47 in his Suit","Kitchen Assistant","Movie Crew","Security Officer","SFX Crew"],
};

var landslide = {
	missionTitle: "Landslide",
	melee: ["Fiber Wire","Screwdriver","Scissors","Old Axe","Kitchen Knife","Saber","Folding Knife","Fire Axe","Letter Opener","Cleaver"],
	targetList: ["Marco Abiatti"],
	contractTargets: ["Marco Abiatti","Photographer Marcello Folliero","Woman working at Abiatti's stand Alberta Arcuri","Padre Francesco","Red plumber Mario Fratelli","Green plumber Luigi Fratelli","Singer Cristina Dionisi","Abiatti's technician Roberto Mulo","Baker Dario Bronzo","Renzo 'Not Rocco' Forte","Lawyer Salvatore Bravuomo","Bohemian Silvestro Pugliesi"],
	entry: ["Promenade"],
	exit: ["Town Gate","Car","Speedboat"],
	disguises: ["47 in his Suit","Stage Crew","Security","Bodyguard","Photographer","Waiter","Church Staff","Priest","Gardener","Green Plumber","Red Plumber","Kitchen Assistant","Salvatore Bravuomo","Bohemian"],
};

var agc = {
	missionTitle: "A Gilded Cage",
	melee: ["Battle Axe","Fire Axe","Saber","Scissors","Screwdriver","Kitchen Knife","Cleaver","Letter Opener","Folding Knife","Fiber Wire"],
	targetList: ["Claus Hugo Strandberg","Reza Zaydan"],
	contractTargets: ["Claus Hugo Strandberg","Reza Zaydan","Printing crew member Ashraf Raghib Mustafa","Cameraman Jeff Baker","School headmaster Shahin Abdul-Barr Maalouf","Masseur Konny Engström","Elite soldier in the tunnel Jawwaad Reza","Consulate intern Hektor Lindberg","Fortune teller Zaki Diab","Protester Shuaib Aly","Woman on lamp store roof Hilda Berg"],
	entry: ["Bazaar Entrance","Undercover at the Snail Stand","Undercover on the West Bazaar Rooftop","Undercover in the Courtyard Club","Undercover in Zaydan's Compound","Lamp Store Rooftop","Undercover in the Consulate","School Alley","Consulate Parking Garage"],
	exit: ["Bazaar Gates","Armored Vehicle","Car in the Garage"],
	disguises: ["47 in his Suit","Bodyguard","Cameraman","Consulate Intern","Consulate Janitor","Consulate Security","Elite Soldier","Food Vendor","Fortune Teller","Handyman","Headmaster","Local Printing Crew","Masseur","Military Officer","Soldier","Prisoner","Shopkeeper","Waiter"],
};

var ahbos = {
	missionTitle: "A House Built on Sand",
	melee: ["Battle Axe","Cleaver","Folding Knife","Kitchen Knife","Scissors","Screwdriver","Fiber Wire"],
	targetList: ["Matthieu Mendola","Kong Tuo-Kwang"],
	contractTargets: ["Matthieu Mendola","Kong Tuo-Kwang","Shopkeeper by the well Yousef Shitrit","Guitarist Jalal al Din Muti Said","Fortune teller Zaki Diab","Vomiting bodyguard Hussein Guirguis","Waiter at the meeting spot Ahmed Aziz","Bartender Jewel Bourgeois"],
	entry: ["Consulate plaza"],
	exit: ["Bazaar Gates","Truck","Door near the Well","Door by the Street"],
	disguises: ["47 in his Suit","Bodyguard","Food Vendor","Fortune Teller","Handyman","Soldier","Shopkeeper","Waiter"],
};

var c27 = {
	missionTitle: "Club 27",
	melee: ["Kitchen Knife","Screwdriver","Fire Axe","Cleaver","Hatchet","Letter Opener","Katana","Fiber Wire","Sapper's Axe"],
	targetList: ["Jordan Cross","Ken Morgan"],
	contractTargets: ["Jordan Cross","Ken Morgan","Cross' Manager Dexy Barat","Producer Max Liston","Guitarist Heidi Santoro","Guest residing in room 208 Toby Hicks","Former sitcom star Jackie Carrington","Drummer Abel De Silva","Hotel manager Mrs. Mookjai","Chef Tharn Srisai","Man passed out in Jackie's room Julian","Stalker Benjamin Bertam","Ken's bodyguard Otis Kaplan"],
	entry: ["Riverside Landing","47's Suite","Undercover in the Restaurant Kitchen","Undercover in the Linen Room","Undercover by the Security Shed","Undercover at the Himmapan Bar","Undercover in the Side Garden","Undercover in the 2nd Floor Hallway"],
	exit: ["Boat","Tuk-tuk","Tunnel"],
	disguises: ["47 in his Suit","Drummer","Exterminator","Groundskeeper","Hotel Security","Hotel Staff","Jordan Cross' Bodyguard","Kitchen Staff","Ken Morgan's Bodyguard","Recording Crew","Stalker","Waiter"],
};

var ff = {
	missionTitle: "Freedom Fighters",
	melee: ["Cleaver","Old Axe","Kitchen Knife","Screwdriver","Fiber Wire"],
	targetList: ["Sean Rose","Penelope Graves","Ezra Berg","Maya Parvati"],
	contractTargets: ["Sean Rose","Penelope Graves","Ezra Berg","Maya Parvati","Explosives specialist Quince Elliot","Militia cook Robert Powell","Point man Lloyd Burgess","Militia technician Milton Geiger","Sleeping militia soldier Mario Thompson","Militia spec ops in the barn Liam Butler","Drill instructor Albert Knarr"],
	entry: ["Undercover in the Garage","West Bridge","Undercover by the Greenhouse","Undercover on the Demolition Range","Old Orchard","Southern Farm Perimeter","Undercover in the Farmhouse","Water Tower"],
	exit: ["Bridge","Quad Bike","River","Front Gate","Tornado Shelter"],
	disguises: ["47 in his Suit","Explosives Specialist","Hacker","Militia Cook","Militia Elite","Militia Spec Ops","Militia Soldier","Militia Technician","Point Man","Scarecrow"],
};

var si = {
	missionTitle: "Situs Inversus",
	melee: ["Fiber Wire","Scalpel","Scissors","Kitchen Knife","Cleaver","Katana","Screwdriver","Fire Axe"],
	targetList: ["Yuki Yamazaki","Erich Soders"],
	contractTargets: ["Yuki Yamazaki","Showering resort staff member Lowell Aucoin","Dancing master Toshimi 'Sandā no ashi' Kaneko","Stetson man Amos Dexter","The director Akira Nakamura","Facial surgery patient Jason Portman","Yoga instructor J. Brooke","Head surgeon Nicholas Laurent","Helicopter pilot Nails","Nurse in the operating room Kimiho Ookawa","The curator Katashi Ito","Smoking handyman Tomiyuki Fujihara"],
	entry: ["Tobias Rieper's Suite","Spa","Infiltrating Along the Mountain Path","Restaurant","Undercover in the Staff Quarters","Undercover in the Kitchen","Undercover in the Garden","Morgue","Undercover in the Operating Theater"],
	exit: ["Helicopter","Snowmobile","Hiking Route","Cable Car"],
	sodersKills: ["Throw the Heart into the Trash Can","Shoot the Heart","Electrocution","Pistol","Large Firearm","Explosion","Poison the Stem Cells","Fail the Surgery","Make the Surgeon Fail the Surgery","Robot Arms"],
	disguises: ["Ninja","47 in his Suit","Baseball Player","Bodyguard","Chef","Chief Surgeon","Doctor","Handyman","Helicopter Pilot","Hospital Director","Morgue Doctor","Motorcyclist","Patient","Resort Security","Resort Staff","Surgeon","VIP Patient (Dexter)","VIP Patient (Portman)","Yoga Instructor"]
};

var ts = {
	missionTitle: "The Source",
	melee: ["Kitchen Knife","Screwdriver","Fire Axe","Cleaver","Hatchet","Letter Opener","Katana","Fiber Wire","Sapper's Axe"],
	targetList: ["Oybek Nabazov","Sister Yulduz"],
	contractTargets: ["Oybek Nabazov","Sister Yulduz","Waiter outside the exhibition Robert Egg","Cult bodyguard Akram","Defecting cultist Jeff","Manipulative cultist Rebecca","Man with a beige hat in the exhibition Charles Slaughter","Former sitcom star Jackie Carrington","Man passed out in Jackie's room Julian","Man with a yellow jumper tied around his waist Sam Harrison","Female Hotel Staff in the globe room Vipada Ahunai","Cultist in the top floor Robert Uppey Jr","Security Guard on the pier A-Wut"],
	entry: ["Hotel Front Terrace"],
	exit: ["Boat","Tunnel"],
	disguises: ["47 in his Suit","Exterminator","Groundskeeper","Hotel Security","Hotel Staff","Cult Bodyguard","Kitchen Staff","Waiter","Cult Member"],
};

var ta = {
	missionTitle: "The Author",
	melee: ["Battle Axe","Cleaver","Fire Axe","Knife","Screwdriver","Fiber Wire"],
	targetList: ["Craig Black","Brother Akram"],
	contractTargets: ["Craig Black","Brother Akram"],
	entry: ["Portico"],
	exit: ["Town Gate"],
	disguises: ["47 in his Suit","Waiter","Craig Black","Brother Akram","The Superfan","Bodyguard"],
};

var pz = {
	missionTitle: "Patient Zero",
	melee: ["Fiber Wire","Scalpel","Scissors","Kitchen Knife","Cleaver","Katana","Screwdriver","Fire Axe"],
	targetList: ["Owen Cage","Klaus Liebleid"],
	contractTargets: ["Owen Cage","Klaus Liebleid"],
	entry: ["Infiltrating below the helipad"],
	exit: ["Snowmobile","Hiking Route","Cable Car"],
	disguises: ["47 in his Suit","Bodyguard","Chef","Bio Suit","Handyman","Helicopter Pilot","Hospital Director","Morgue Doctor","VIP Patient","Patient","Resort Security","Resort Staff","Surgeon","VIP Patient (Dexter)","Yoga Instructor"]
};

var tfl = {
	missionTitle: "The Finish Line",
	melee: ["Fiber Wire", "Amputation Knife", "Battleaxe", "Cleaver", "Kitchen Knife", "Scissors", "Screwdriver", "Starfish", "Fire Axe", "Old Axe"],
	targetList: ["Robert Knox", "Sierra Knox"],
	contractTargets: ["Robert Knox", "Sierra Knox"],
	entry: ["Event Entrance","Dolphin Fountain","Marina","Stands","Food Stand","Overpass","Driver's Lounge","Podium","Medical Area","Kronstadt Bayside Center","Kowoon Pit"],
	exit: ["Helicopter", "Main Gate","Sewer","Speedboat","Ambulance"],
	disguises: ["47 in his Suit","Aeon Driver","Aeon Mechanic","Event Crew","Event Security","Florida Man","Food Vendor","Journalist","Kitchen Staff","Kowoon Driver","Kowoon Mechanic","Kronstadt Engineer","Kronstadt Researcher","Kronstadt Security","Mascot","Medic","Moses Lee","Pale Rider","Photographer","Race Coordinator","Race Marshall","Sheik","Sotteraneo Mechanic","Street Musician","Ted Mendez","Thwack Driver","Waiter","Blue Seed Driver","Kronstadt Driver","Kronstadt Mechanic"]
};

var ths = {
	missionTitle: "Three-headed Serpent",
	melee: ["Fiber Wire","Screwdriver","Kitchen Knife","Cleaver","Scissors","Barber Razor","Letter Opener","Machete"],
	targetList: ["Rico Delgado", "Andrea Martinez","Jorge Franco"],
	contractTargets: ["Rico Delgado", "Andrea Martinez","Jorge Franco"],
	entry: ["Village Bus Stop","Village Hostel","Shaman's Hut","Village Bar","Construction Site","Coca Fields","Submarine Cave","Mansions Basement"],
	exit: ["Sports Car", "Helicopter","Speedboat","Local's Car","Motorbike","Bus"],
	disguises: ["47 in his Suit","Drummer","Hippo Whisperer","Shaman","Submarine Crew","Submarine Engineer","Tattoo Artist","Coca Field Worker","Construction Worker","Mansion Staff","Mansion Guard","Coca Field Guard","Elite Guard","Street Soldier","Hippie","Barman","Gardener","Chef"]
};

var cag = {
	missionTitle: "Chasing a Ghost",
	melee: ["Fiber Wire","Beak Axe","Old Axe","Scissors","Measuring Tape","Amputation Knife","Screwdriver","Barber Razor","Cleaver","Folding Knife","Letter Opener","Kitchen Knife","Saber","Fire Axe"],
	targetList: ["The Maelstrom","Dawood Rangan","Vanya Shah"],
	contractTargets: ["The Maelstrom","Dawood Rangan","Vanya Shah"],
	entry: ["Main Street","Train","Boat","Skywalk","Taxi","Chawls","Laundry","Barge","Slums","Metal Forge","Photo Shoot","Hill","Train Yard"],
	exit: ["Boat","Street","Taxi","Train","Crows' Hideout"],
	disguises: ["47 in his Suit","Local Security","Food Vendor","Thug","Elite Thug","Metal Worker","Tailor","Queen's Guard","Vanya's Servant","Queen's Bodyguard","Laundry Worker","Laundry Foreman","Dancer","Holy Man","Lead Actor","Kashmirian","Barber","Bollywood Crew","Bollywood Bodyguard","Painter"]
};

var al = {
	missionTitle: "Another Life",
	melee: ["Fiber Wire","Old Axe","Kitchen Knife","Screwdriver","Scissors","Letter Opener","Fire Axe","Hatchet"],
	targetList: ["Janus","Nolan Cassidy"],
	contractTargets: ["Janus","Nolan Cassidy"],
	entry: ["Whittleton Creek","Construction Area","Fumigation","Garbage Removal","Suburb Sign","BBQ Party"],
	exit: ["Bus", "Raft","Sewer","Construction Van","Trash Truck","Roadwork Gate"],
	disguises: ["47 in his Suit","Exterminator","Politician","Real Estate Broker","Nurse","Arkian Robe","Janus' Bodyguard","Cassidy Bodyguard","Police Debuty","Construction Crew","Politician's Assistant","Server","Garbage Man","Spencer 'The Hammer' Green","BBQ Owner","Mailman","Gunther Mueller","Gardener","James Batty","Plumber"]
};

var tas = {
	missionTitle: "The Ark Society",
	melee: ["Fiber Wire","Battleaxe","Broadsword","Saber","Old Axe","Katana","Burial Dagger","Circumcision Knife","Screwdriver","Sapper's Axe","Cleaver","Scalpel","Hatchet","Viking Axe","Aztec Necklace","Scissors"],
	targetList: ["Zoe Washington","Sophia Washington"],
	contractTargets: ["Zoe Washington","Sophia Washington"],
	entry: ["Harbor","Chapel","Keep","Reception Area","Kitchens","Warehouse","Gallery","Architects' Lounge"],
	exit: ["Rooftop","Helicopter","Boat","Warehouse","Castle Wall"],
	disguises: ["47 in his Suit","Initiate","Ark Member","Architect","Jebediah Block","Burial Robes","Knight","Event Staff","Chef","Custodian","Raider","Elite Guard","Musician","Blake Nathaniel","Entertainer","Butler","Castle Staff","Master of Ceremonies"]
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
	"PZ": pz,
	"TFL": tfl,
	"THS": ths,
	"CAG": cag,
	"AL": al,
	"TAS": tas
}

var killTypesMap = {
	"melee": "melee",
	"firearm": "firearms",
	"accident": "accidents",
	"generic": "kills"
}
