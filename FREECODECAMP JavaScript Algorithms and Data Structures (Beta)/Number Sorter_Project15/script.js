// Get the sort button element from the DOM
const sortButton = document.getElementById("sort");

// Function to handle sorting when the sort button is clicked
const sortInputArray = (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve all dropdown elements with the class 'values-dropdown', map their values to numbers, and store in an array
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown")
  ].map((dropdown) => Number(dropdown.value));

  // Sort the array of input values
  const sortedValues = inputValues.sort((a, b) => {
    return a - b;
  });

  // Update the UI with the sorted values
  updateUI(sortedValues);
}

// Function to update the UI with sorted values
const updateUI = (array = []) => {
  // Iterate over the sorted array and update each output element's text
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(`output-value-${i}`);
    outputValueNode.innerText = num;
  });
}

// Bubble sort algorithm implementation
const bubbleSort = (array) => {
  // Loop through each element in the array
  for (let i = 0; i < array.length; i++) {
    // Compare adjacent elements and swap if they are in the wrong order
    for (let j = 0; j < array.length - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }

  // Return the sorted array
  return array;
}

// Selection sort algorithm implementation
const selectionSort = (array) => {
  // Loop through each element in the array
  for (let i = 0; i < array.length; i++) {
    // Find the index of the smallest element in the remaining unsorted portion of the array
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    // Swap the smallest element with the current element
    const temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
  }

  // Return the sorted array
  return array;
}

// Insertion sort algorithm implementation
const insertionSort = (array) => {
  // Loop through each element starting from the second one
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i];
    let j = i - 1;

    // Move elements of array[0..i-1] that are greater than currValue to one position ahead of their current position
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = currValue;
  }

  // Return the sorted array
  return array;
}

// Add an event listener to the sort button to trigger the sortInputArray function on click
sortButton.addEventListener("click", sortInputArray);
