// Get references to the HTML elements by their IDs
const messageInput = document.getElementById("message-input"); // The input field where the user types their message
const result = document.getElementById("result"); // The element where the result will be displayed
const checkMessageButton = document.getElementById("check-message-btn"); // The button that triggers the spam check

// Define regular expressions for different types of spam
const helpRegex = /please help|assist me/i; // Matches messages asking for help or assistance
const dollarRegex = /[0-9]+ (?:hundred|thousand|million|billion)? dollars/i; // Matches messages mentioning amounts of dollars
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i; // Matches variations of "free money"
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i; // Matches variations of "stock alert"
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i; // Matches variations of "dear friend"

// Array of regular expressions to check against
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// Function to check if the message contains spam
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));
// - `denyList.some(...)` checks if any of the regular expressions in the denyList array match the message
// - `regex.test(msg)` tests if the current regex matches the given message

// Add an event listener to the button to handle the click event
checkMessageButton.addEventListener("click", () => {
  // Check if the input field is empty
  if (messageInput.value === "") {
    alert("Please enter a message."); // Alert user to enter a message
    return; // Exit the function if the input is empty
  }

  // Update the result text based on whether the message is considered spam or not
  result.textContent = isSpam(messageInput.value)
    ? "Oh no! This looks like a spam message." // If the message matches any spam pattern
    : "This message does not seem to contain any spam."; // If the message does not match any spam pattern
  
  // Clear the input field after processing
  messageInput.value = "";
});
