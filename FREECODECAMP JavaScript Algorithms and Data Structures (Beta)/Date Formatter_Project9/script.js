// Get references to the paragraph where the date will be displayed
// and the select element for choosing date formats
const currentDateParagraph = document.getElementById("current-date");
const dateOptionsSelectElement = document.getElementById("date-options");

// Create a new Date object to get the current date and time
const date = new Date();
const day = date.getDate(); // Get the day of the month (1-31)
const month = date.getMonth() + 1; // Get the month (0-11) and add 1 to make it 1-12
const year = date.getFullYear(); // Get the full year (e.g., 2024)
const hours = date.getHours(); // Get the current hour (0-23)
const minutes = date.getMinutes(); // Get the current minutes (0-59)

// Format the date as "day-month-year"
const formattedDate = `${day}-${month}-${year}`;
currentDateParagraph.textContent = formattedDate; // Display the formatted date in the paragraph

// Add an event listener to the select element to listen for changes
dateOptionsSelectElement.addEventListener("change", () => {
    // Use a switch statement to handle different date format options
    switch (dateOptionsSelectElement.value) {
        case "yyyy-mm-dd":
            // When the user selects "yyyy-mm-dd", reverse the order of the date
            // Split the formattedDate into an array ["day", "month", "year"]
            // Reverse the array to ["year", "month", "day"]
            // Join the array back into a string with "-" separating the parts
            currentDateParagraph.textContent = formattedDate
                .split("-")
                .reverse()
                .join("-");
            break;
        case "mm-dd-yyyy-h-mm":
            // When the user selects "mm-dd-yyyy-h-mm", format the date with month first
            // and include hours and minutes in the format
            currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
            break;
        default:
            // If the selected value does not match any case, display the original formatted date
            currentDateParagraph.textContent = formattedDate;
    }
});
