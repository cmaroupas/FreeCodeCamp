// Function to calculate the mean (average) of an array of numbers
// This function takes an array of numbers as input, sums up all the elements,
// and then divides the sum by the number of elements in the array.
const getMean = (array) => 
    array.reduce((acc, el) => acc + el, 0) / array.length;
  
  // Function to calculate the median of an array of numbers
  // The median is the middle value in a sorted list of numbers. 
  // If the array has an odd length, the middle element is returned.
  // If the array has an even length, the mean of the two middle elements is returned.
  const getMedian = (array) => {
    // Create a shallow copy of the array and sort it in ascending order.
    // The `slice()` method creates the copy to avoid mutating the original array.
    const sorted = array.slice().sort((a, b) => a - b);
  
    // Determine if the array length is even or odd.
    const median =
      array.length % 2 === 0
        // If the array length is even, calculate the mean of the two middle elements.
        ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
        // If the array length is odd, return the middle element.
        : sorted[Math.floor(array.length / 2)];
  
    return median; // Return the median value.
  }
  
  // Function to calculate the mode of an array of numbers
  // The mode is the number that appears most frequently in the array.
  // The mode returns nothing (null) when all elements in the array have the same frequency,
// indicating that there is no single mode (i.e., no number appears more frequently than others).
  const getMode = (array) => {
    // Initialize an empty object to keep track of the frequency of each element in the array.
    const counts = {};
    
    // Iterate through each element in the array.
    // For each element, increase its count in the `counts` object.
    array.forEach((el) => {
      counts[el] = (counts[el] || 0) + 1;
    });
  
    // Check if all elements have the same frequency.
    // If they do, there's no mode, so return `null`.
    if (new Set(Object.values(counts)).size === 1) {
      return null;
    }
  
    // Sort the keys of the `counts` object based on their frequency in descending order.
    // The key with the highest frequency is stored in `highest`.
    const highest = Object.keys(counts).sort(
      (a, b) => counts[b] - counts[a]
    )[0];
  
    // Filter the keys to find all elements that have the same frequency as `highest`.
    const mode = Object.keys(counts).filter(
      (el) => counts[el] === counts[highest]
    );
  
    // Return the mode(s) as a string, separated by commas if there are multiple modes.
    return mode.join(", ");
  }
  
  // Function to calculate the range of an array of numbers
  // The range is the difference between the maximum and minimum values in the array.
  const getRange = (array) => {
    return Math.max(...array) - Math.min(...array);
  }
  
  // Function to calculate the variance of an array of numbers
  // Variance is a measure of how spread out the numbers in the array are.
  // It is calculated by finding the mean of the squared differences from the mean.
  const getVariance = (array) => {
    // First, calculate the mean of the array.
    const mean = getMean(array);
    
    // Then, use `reduce()` to sum up the squared differences from the mean.
    const variance = array.reduce((acc, el) => {
      const difference = el - mean;  // Calculate the difference between the element and the mean.
      const squared = difference ** 2;  // Square the difference.
      return acc + squared;  // Add the squared difference to the accumulator.
    }, 0) / array.length;  // Divide the sum by the number of elements to get the variance.
  
    return variance;  // Return the variance.
  }
  
  // Function to calculate the standard deviation of an array of numbers
  // Standard deviation is a measure of the amount of variation or dispersion of the numbers in the array.
  // It is the square root of the variance.
  const getStandardDeviation = (array) => {
    // First, calculate the variance of the array.
    const variance = getVariance(array);
    
    // Then, take the square root of the variance to get the standard deviation.
    const standardDeviation = Math.sqrt(variance);
  
    return standardDeviation;  // Return the standard deviation.
  }
  
  // Function to calculate and display various statistical values based on user input
  const calculate = () => {
    // Get the string of numbers input by the user from the HTML element with the id "numbers".
    const value = document.querySelector("#numbers").value;
    
    // Split the input string into an array of strings using a regular expression to match commas and optional spaces.
    const array = value.split(/,\s*/g);
    
    // Convert the array of strings into an array of numbers.
    // Filter out any elements that are not valid numbers using `isNaN`.
    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
  
    // Calculate the statistical values using the functions defined above.
    const mean = getMean(numbers);
    const median = getMedian(numbers);
    const mode = getMode(numbers);
    const range = getRange(numbers);
    const variance = getVariance(numbers);
    const standardDeviation = getStandardDeviation(numbers);
  
    // Display the calculated values in the corresponding HTML elements by updating their text content.
    document.querySelector("#mean").textContent = mean;
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode;
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance;
    document.querySelector("#standardDeviation").textContent = standardDeviation;
  }
  