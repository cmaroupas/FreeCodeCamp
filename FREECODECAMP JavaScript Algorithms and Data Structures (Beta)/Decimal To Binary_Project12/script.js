// Get references to the HTML elements
const numberInput = document.getElementById("number-input");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const animationContainer = document.getElementById("animation-container");

// Array containing animation data for demonstrating decimal to binary conversion
const animationData = [
  {
    inputVal: 5,
    marginTop: 300,
    addElDelay: 1000,
    msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.',
    showMsgDelay: 15000,
    removeElDelay: 20000,
  },
  {
    inputVal: 2,
    marginTop: -200,
    addElDelay: 1500,
    msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.',
    showMsgDelay: 10000,
    removeElDelay: 15000,
  },
  {
    inputVal: 1,
    marginTop: -200,
    addElDelay: 2000,
    msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.",
    showMsgDelay: 5000,
    removeElDelay: 10000,
  }
];

// Function to convert a decimal number to its binary representation
const decimalToBinary = (input) => {
  // Base case: if input is 0 or 1, return it as a string
  if (input === 0 || input === 1) {
    return String(input);
  } else {
    // Recursive case: divide the input by 2 and append the remainder
    return decimalToBinary(Math.floor(input / 2)) + (input % 2);
  }
};

// Function to show the animation for the decimal to binary conversion
const showAnimation = () => {
  // Set initial text for the result element
  result.innerText = "Call Stack Animation";

  // Loop through each animation frame data
  animationData.forEach((obj) => {
    // Add a new paragraph element to the animation container with delay
    setTimeout(() => {
      animationContainer.innerHTML += `
        <p id="${obj.inputVal}" style="margin-top: ${obj.marginTop}px;" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
    }, obj.addElDelay);

    // Update the paragraph's text content to show the message after delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).textContent = obj.msg;
    }, obj.showMsgDelay);

    // Remove the paragraph element after the specified delay
    setTimeout(() => {
      document.getElementById(obj.inputVal).remove();
    }, obj.removeElDelay);
  });

  // After the animation ends, display the result of decimalToBinary(5)
  setTimeout(() => {
    result.textContent = decimalToBinary(5);
  }, 20000);
};

// Function to handle user input and perform conversion or animation
const checkUserInput = () => {
  // Parse the input value to an integer
  const inputInt = parseInt(numberInput.value);

  // Validate the input: must be a number and non-negative
  if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
    alert("Please provide a decimal number greater than or equal to 0");
    return;
  }

  // If the input is 5, show the animation
  if (inputInt === 5) {
    showAnimation();
    return;
  }

  // Otherwise, display the binary conversion result
  result.textContent = decimalToBinary(inputInt);
  // Clear the input field
  numberInput.value = "";
};

// Add event listener for the convert button to trigger input check
convertBtn.addEventListener("click", checkUserInput);

// Add event listener for the Enter key to trigger input check
numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
