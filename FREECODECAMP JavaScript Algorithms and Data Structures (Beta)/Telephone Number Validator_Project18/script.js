document.getElementById("check-btn").addEventListener("click", validateNumber);
document.getElementById("clear-btn").addEventListener("click", clearResults);

function validateNumber() {
    const userInput = document.getElementById("user-input").value.trim();
    const resultsDiv = document.getElementById("results-div");

    // If input is empty, show an alert
    if (!userInput) {
        alert("Please provide a phone number");
        return;
    }

    const validUSNumberRegex = /^1?\s?(\d{3}|\(\d{3}\))[-\s]?\d{3}[-\s]?\d{4}$/;

    if (validUSNumberRegex.test(userInput)) {
        resultsDiv.textContent = `Valid US number: ${userInput}`;
    } else {
        resultsDiv.textContent = `Invalid US number: ${userInput}`;
    }
}

function clearResults() {
    document.getElementById("results-div").textContent = "";
    document.getElementById("user-input").value = "";
}
