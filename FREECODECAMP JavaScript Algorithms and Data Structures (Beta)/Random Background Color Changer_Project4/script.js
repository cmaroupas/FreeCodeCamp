// Array containing dark color hex codes
const darkColorsArr = [
    "#2C3E50", // Midnight Blue
    "#34495E", // Wet Asphalt
    "#2C2C2C", // Black
    "#616A6B", // Asphalt
    "#4A235A", // Pomp and Power
    "#2F4F4F", // Dark Slate Gray
    "#0E4B5A", // Dark Cerulean
    "#36454F", // Charcoal
    "#2C3E50", // Midnight Blue (Duplicate)
    "#800020", // Burgundy
];

// Function to get a random index within the range of the darkColorsArr length
function getRandomIndex() {
    const randomIndex = Math.floor(darkColorsArr.length * Math.random());
    return randomIndex;
}

// Selecting the <body> and the <span> element with id "bg-hex-code"
const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");

// Function to change the background color
function changeBackgroundColor() {
    // Get a random color from darkColorsArr
    const color = darkColorsArr[getRandomIndex()];

    // Update the text content of the <span> element to display the current color
    bgHexCodeSpanElement.innerText = color;
    
    // Set the background color of the <body> to the chosen color
    body.style.backgroundColor = color;
}

// Selecting the button element with id "btn"
const btn = document.querySelector("#btn");

// Assigning the changeBackgroundColor function to be called when the button is clicked
btn.onclick = changeBackgroundColor;
