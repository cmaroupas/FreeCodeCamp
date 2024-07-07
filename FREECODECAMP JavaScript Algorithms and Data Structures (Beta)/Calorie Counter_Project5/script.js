// This block of code initializes variables that reference specific elements in your HTML file.
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false; // This variable keeps track of whether there's an error in input.

// This function removes certain characters from a string to clean it up.
function cleanInputString(str) {
  const regex = /[+-\s]/g; // This regular expression matches any plus, minus, or space characters.
  return str.replace(regex, ''); // Removes matched characters from the string and returns the cleaned string.
}

// This function checks if a string contains an invalid number format (like scientific notation).
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // This regular expression checks for scientific notation (like "1e5").
  return str.match(regex); // Returns true if the string matches the invalid format.
}

// This function adds a new entry (name and calories input fields) based on the selected dropdown option.
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); // Inserts the new HTML for name and calories inputs.
}

// This function calculates the total calories consumed and remaining based on user inputs.
function calculateCalories(e) {
  e.preventDefault(); // Prevents the form from submitting and refreshing the page.

  isError = false; // Resets the error flag to false.

  // Retrieves all input fields for breakfast, lunch, dinner, snacks, and exercise sections.
  const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
  const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
  const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
  const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
  const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

  // Calculates calories consumed for each section using a helper function.
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

  // If there's an error detected during input processing, stop further calculations.
  if (isError) {
    return;
  }

  // Calculates total consumed and remaining calories, determines surplus or deficit.
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';

  // Updates the output section in HTML to display results.
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
  `;

  output.classList.remove('hide'); // Makes the output visible by removing the 'hide' class.
}

// Helper function to calculate total calories from a list of input fields.
function getCaloriesFromInputs(list) {
  let calories = 0;

  // Iterates through each input field and adds its value (after cleaning) to the total calories.
  for (const item of list) {
    const currVal = cleanInputString(item.value); // Cleans up the input value.
    const invalidInputMatch = isInvalidInput(currVal); // Checks for invalid input format.

    // If invalid input format is found, displays an alert and sets the error flag.
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null; // Stops further processing and returns null.
    }

    calories += Number(currVal); // Adds cleaned input value to the total calories (converted to number).
  }

  return calories; // Returns the total calories calculated from the inputs.
}

// Function to clear all input fields and reset the form.
function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container'));

  // Clears out all input fields within each input container.
  for (const container of inputContainers) {
    container.innerHTML = '';
  }

  budgetNumberInput.value = ''; // Resets the budget input field to empty.
}

// Event listeners to trigger actions when buttons are clicked or form is submitted.
addEntryButton.addEventListener("click", addEntry); // Adds new entry fields when 'Add Entry' button is clicked.
calorieCounter.addEventListener("submit", calculateCalories); // Calculates calories when form is submitted.
clearButton.addEventListener("click", clearForm); // Clears form when 'Clear' button is clicked.
