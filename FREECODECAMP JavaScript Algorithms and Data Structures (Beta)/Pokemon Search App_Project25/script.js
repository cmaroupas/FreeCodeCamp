// Select DOM elements for input, button, and Pokémon data display
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const typesDiv = document.getElementById("types");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteDiv = document.getElementById("sprite-2");
const pokeURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"; // Base URL for Pokémon data
const searchForm = document.getElementById("pokemon-form"); // Form element for searching Pokémon

// Fetch initial Pokémon data from the API
const fetchPokemonData = async () => {
  try {
    const response = await fetch(pokeURL);
    const data = await response.json();
    return data.results; // Return the results from the fetched data
  } catch (error) {
    console.error('Error fetching Pokémon data:', error); // Log any errors
  }
};

// Fetch data from a new URL (for a specific Pokémon)
const fetchNewURL = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data; // Return the data for the specific Pokémon
  } catch (error) {
    console.error('Error fetching Pokémon data:', error); // Log any errors
  }
};

// Update the Pokémon stats displayed on the page
const updateStats = (object) => {
  object.stats.forEach(stat => {
    const statName = stat.stat.name; // Get the name of the stat
    const baseStat = stat.base_stat; // Get the base value of the stat

    // Update the corresponding stat element based on the stat name
    switch (statName) {
      case 'hp':
        hp.textContent = baseStat;
        break;
      case 'attack':
        attack.textContent = baseStat;
        break;
      case 'defense':
        defense.textContent = baseStat;
        break;
      case 'special-attack':
        specialAttack.textContent = baseStat;
        break;
      case 'special-defense':
        specialDefense.textContent = baseStat;
        break;
      case 'speed':
        speed.textContent = baseStat;
        break;
      default:
        console.warn(`No element for stat: ${statName}`); // Warn if stat name is unrecognized
    }
  });
};

// Update the Pokémon sprite image displayed on the page
const updatePokemonImage = (data) => {
  const frontDefaultUrl = data.sprites.front_default; // Get the front default sprite URL
  if (frontDefaultUrl) {
    spriteDiv.innerHTML = `<img id="sprite" src="${frontDefaultUrl}" alt="${data.name}">`; // Update the sprite
  } else {
    spriteDiv.innerHTML = ''; // Clear the sprite if none exists
  }
};

// Fill the Pokémon data into the display elements
const pokemonDataFiller = (data) => {
  pokemonName.textContent = data.name.toUpperCase(); // Set Pokémon name
  pokemonId.textContent = `#${data.id}`; // Set Pokémon ID
  weight.textContent = `Weight: ${data.weight}`; // Set Pokémon weight
  height.textContent = `Height: ${data.height}`; // Set Pokémon height
  typesDiv.innerHTML = ""; // Clear previous types
  const typeNames = data.types.map(typeObject => typeObject.type.name); // Get Pokémon types
  typeNames.forEach((type) => {
    const typeClass = `types ${type}`; // Create class for type styling
    typesDiv.innerHTML += `<div class="${typeClass}">${type}</div>`; // Display each type
  });
  updateStats(data); // Update stats for the Pokémon
  updatePokemonImage(data); // Update the Pokémon image
};

// Function to find a Pokémon based on user input
const findPokemon = async () => {
  const inputValue = searchInput.value.toLowerCase().trim(); // Get and format the input value
  if (!inputValue) {
    searchInput.reportValidity(); // Ensure input is valid
    return; // Exit if input is empty
  }
  const data = await fetchPokemonData(); // Fetch initial Pokémon data
  // Look for a matching Pokémon by ID or name
  const match = data.find(pokemon => pokemon.id === parseInt(inputValue) || pokemon.name === inputValue);
  if (match) {
    const newURL = match.url; // Get the URL for the matching Pokémon
    const restOfData = await fetchNewURL(newURL); // Fetch detailed data for that Pokémon
    pokemonDataFiller(restOfData); // Fill the data into the display
  } else {
    alert("Pokémon not found"); // Alert if no match is found
  }
};

// Add click event listener to the search button
searchButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default form submission
  findPokemon(); // Call function to find Pokémon
});
