// Initialize player stats
let xp = 0; // Player's experience points
let health = 100; // Player's health points
let gold = 50; // Player's gold
let currentWeaponIndex = 0; // Index of the current weapon in the weapons array
let fighting; // Index of the monster the player is currently fighting
let monsterHealth; // Current health of the monster
let inventory = ["stick"]; // Player's inventory of weapons, starts with a stick

// Get references to HTML elements
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Define weapons and monsters
const weapons = [
  { name: 'stick', power: 5 },
  { name: 'dagger', power: 30 },
  { name: 'claw hammer', power: 50 },
  { name: 'sword', power: 100 }
];

const monsters = [
  { name: "slime", level: 2, health: 15 },
  { name: "fanged beast", level: 8, health: 60 },
  { name: "dragon", level: 20, health: 300 }
];

// Define locations and their properties
const locations = [
  // Town Square
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  // Store
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  // Cave
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  // Fight
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  // Kill Monster
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  // Lose
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart,restart,restart ],
    text: "You die. &#x2620;"
  },
  // Easter Egg
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// Initialize buttons with initial functions
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// Function to update the UI based on location
function update(location) {
  monsterStats.style.display = 'none';
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

// Functions to navigate to different locations
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

// Function to buy health
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

// Function to buy weapons
function buyWeapon() {
  if (currentWeaponIndex < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeaponIndex++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeaponIndex].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

// Function to sell weapons
function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Functions to initiate fights with different monsters
function fightSlime() {
  fighting = 0; 
  goFight();
}

function fightBeast() {
  fighting = 1; 
  goFight();
}

function fightDragon() {
  fighting = 2; 
  goFight();
}

// Function to prepare for fight
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
} 

// Function to handle player's attack during the fight
function attack() {
  // Display attack messages and calculate monster's health reduction
  if (isMonsterHit()) {
    // Calculate the damage inflicted on the monster by the player's attack
    monsterHealth -= weapons[currentWeaponIndex].power + Math.floor(Math.random() * xp) + 1;
  } else {
    // Display message indicating the player missed the attack
    text.innerText += " You miss.";
  }

  // Update UI with player's and monster's health
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  
  // Check if the player or the monster has been defeated
  if (health <= 0) {
    lose(); // Execute lose function if player's health reaches 0 or below
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame(); // Execute winGame function if player defeats the dragon
    } else {
      defeatMonster(); // Execute defeatMonster function if player defeats other monsters
    }
  }
  
  // Check if the player's weapon breaks with a probability of 10%
  if (Math.random() <= .1 && inventory.length !== 1) {
    // Remove the broken weapon from the inventory and decrease the current weapon index
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeaponIndex--;
  }
}

// Function to calculate the monster's attack value
function getMonsterAttackValue(level) {
  // Calculate the monster's attack value based on its level and a random factor
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit); // Log the calculated attack value (optional)
  return hit > 0 ? hit : 0; // Ensure the attack value is not negative
}

// Function to determine if the player's attack hits the monster
function isMonsterHit() {
  // Determine if the player's attack hits based on a probability or player's low health
  return Math.random() > 0.2 || health < 20;
}

// Function to handle player's dodge action during the fight
function dodge() {
  // Display a message indicating the player successfully dodged the monster's attack
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
} 

// Function called when the player defeats a monster
function defeatMonster() {
  // Increase player's gold and experience points based on the defeated monster's level
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp = xp += monsters[fighting].level;
  // Update UI with updated gold and experience points
  goldText.innerText = gold;
  xpText.innerText = xp;
  // Update UI to show victory message
  update(locations[4]);
}

// Function called when the player loses
function lose() {
  // Update UI to show loss message
  update(locations[5]);
}

// Function called when the player wins the game
function winGame() {
  // Update UI to show win message
  update(locations[6]);
}

// Function to restart the game
function restart() {
  // Reset player's stats and inventory to initial values
  xp = 0;
  health = 100;
  gold = 50;
  currentWeaponIndex = 0;
  inventory = ["stick"];
  // Update UI with reset stats and navigate to the town square
  healthText.innerText = health;
  goldText.innerText = gold;
  xpText.innerText = xp;
  goTown(); 
} 

// Function for the player to pick the number 2 in the Easter egg game
function pickTwo(){
  pick(2);
}

// Function for the player to pick the number 8 in the Easter egg game
function pickEight(){
  pick (8);
}

// Function for the player to pick a number in the Easter egg game
function pick(guess) {
  // Generate an array of ten random numbers between 0 and 10
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  // Display the player's pick and the generated numbers
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  // Check if the player's pick matches any of the generated numbers
  if (numbers.includes(guess)) {
    // Display win message and increase player's gold
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    // Display lose message and decrease player's health
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
  
    // Check if player loses all health
    if (health <= 0) {
      lose(); // Execute lose function if player's health reaches 0 or below
    }
  }
}