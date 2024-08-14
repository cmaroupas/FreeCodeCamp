// Get references to HTML elements
const teamName = document.getElementById("team"); // Element to display the team name
const typeOfSport = document.getElementById("sport"); // Element to display the type of sport
const worldCupYear = document.getElementById("year"); // Element to display the World Cup year
const headCoach = document.getElementById("head-coach"); // Element to display the head coach's name
const playerCards = document.getElementById("player-cards"); // Element to display the player cards
const playersDropdownList = document.getElementById("players"); // Dropdown menu for filtering players

// Define the football team object with details
const myFavoriteFootballTeam = {
  team: "Argentina",
  sport: "Football",
  year: 1986,
  isWorldCupWinner: true,
  headCoach: {
    coachName: "Carlos Bilardo",
    matches: 7,
  },
  players: [
    // Array of player objects with details
    { name: "Sergio Almirón", position: "forward", number: 1, isCaptain: false, nickname: null },
    { name: "Sergio Batista", position: "midfielder", number: 2, isCaptain: false, nickname: null },
    { name: "Ricardo Bochini", position: "midfielder", number: 3, isCaptain: false, nickname: "El Bocha" },
    { name: "Claudio Borghi", position: "midfielder", number: 4, isCaptain: false, nickname: "Bichi" },
    { name: "José Luis Brown", position: "defender", number: 5, isCaptain: false, nickname: "Tata" },
    { name: "Daniel Passarella", position: "defender", number: 6, isCaptain: false, nickname: "El Gran Capitán" },
    { name: "Jorge Burruchaga", position: "forward", number: 7, isCaptain: false, nickname: "Burru" },
    { name: "Néstor Clausen", position: "defender", number: 8, isCaptain: false, nickname: null },
    { name: "José Luis Cuciuffo", position: "defender", number: 9, isCaptain: false, nickname: "El Cuchu" },
    { name: "Diego Maradona", position: "midfielder", number: 10, isCaptain: true, nickname: "El Pibe de Oro" },
    { name: "Jorge Valdano", position: "forward", number: 11, isCaptain: false, nickname: "The Philosopher of Football" },
    { name: "Héctor Enrique", position: "midfielder", number: 12, isCaptain: false, nickname: null },
    { name: "Oscar Garré", position: "defender", number: 13, isCaptain: false, nickname: null },
    { name: "Ricardo Giusti", position: "midfielder", number: 14, isCaptain: false, nickname: null },
    { name: "Luis Islas", position: "goalkeeper", number: 15, isCaptain: false, nickname: "El loco" },
    { name: "Julio Olarticoechea", position: "defender", number: 16, isCaptain: false, nickname: null },
    { name: "Pedro Pasculli", position: "forward", number: 17, isCaptain: false, nickname: null },
    { name: "Nery Pumpido", position: "goalkeeper", number: 18, isCaptain: false, nickname: null },
    { name: "Oscar Ruggeri", position: "defender", number: 19, isCaptain: false, nickname: "El Cabezón" },
    { name: "Carlos Tapia", position: "midfielder", number: 20, isCaptain: false, nickname: null },
    { name: "Marcelo Trobbiani", position: "midfielder", number: 21, isCaptain: false, nickname: "Calesita" },
    { name: "Héctor Zelada", position: "goalkeeper", number: 22, isCaptain: false, nickname: null },
  ],
};

// Freeze the object to prevent modifications
Object.freeze(myFavoriteFootballTeam);

// Destructure properties from the football team object
const { sport, team, year, players } = myFavoriteFootballTeam;
const { coachName } = myFavoriteFootballTeam.headCoach;

// Update HTML elements with team information
typeOfSport.textContent = sport;
teamName.textContent = team;
worldCupYear.textContent = year;
headCoach.textContent = coachName;

// Function to set player cards in the player cards container
const setPlayerCards = (arr = players) => {
  playerCards.innerHTML += arr
    .map(
      ({ name, position, number, isCaptain, nickname }) =>
        `
        <div class="player-card">
          <h2>${isCaptain ? "(Captain)" : ""} ${name}</h2>
          <p>Position: ${position}</p>
          <p>Number: ${number}</p>
          <p>Nickname: ${nickname !== null ? nickname : "N/A"}</p>
        </div>
      `
    )
    .join("");
};

// Add event listener for changes in the players dropdown list
playersDropdownList.addEventListener("change", (e) => {
  playerCards.innerHTML = ""; // Clear existing player cards

  switch (e.target.value) {
    case "nickname":
      setPlayerCards(players.filter((player) => player.nickname !== null)); // Show players with nicknames
      break;
    case "forward":
      setPlayerCards(players.filter((player) => player.position === "forward")); // Show forwards
      break;
    case "midfielder":
      setPlayerCards(players.filter((player) => player.position === "midfielder")); // Show midfielders
      break;
    case "defender":
      setPlayerCards(players.filter((player) => player.position === "defender")); // Show defenders
      break;
    case "goalkeeper":
      setPlayerCards(players.filter((player) => player.position === "goalkeeper")); // Show goalkeepers
      break;
    default:
      setPlayerCards(); // Show all players if no filter is selected
      break;
  }
});
