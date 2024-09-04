// Define a mapping from operator symbols to their corresponding functions.
const infixToFunction = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
  }
  
  // Evaluate an infix expression with two operands and an operator.
  const infixEval = (str, regex) =>
    str.replace(regex, (_match, arg1, operator, arg2) =>
      infixToFunction[operator](parseFloat(arg1), parseFloat(arg2))
    );
  
  // Handle multiplication and division operations first, to respect operator precedence.
  const highPrecedence = str => {
    const regex = /([\d.]+)([*\/])([\d.]+)/;
    const str2 = infixEval(str, regex);
    // Recursively handle all high-precedence operations until none remain.
    return str === str2 ? str : highPrecedence(str2);
  }
  
  // Helper functions for spreadsheet calculations.
  const isEven = num => num % 2 === 0;
  const sum = nums => nums.reduce((acc, el) => acc + el, 0);
  const average = nums => sum(nums) / nums.length;
  const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b);
    const length = sorted.length;
    const middle = length / 2 - 1;
    // Calculate median differently for even and odd-length arrays.
    return isEven(length)
      ? average([sorted[middle], sorted[middle + 1]])
      : sorted[Math.ceil(middle)];
  }
  
  // Define a set of functions that can be used in the spreadsheet cells.
  const spreadsheetFunctions = {
    sum,
    average,
    median,
    even: nums => nums.filter(isEven),
    someeven: nums => nums.some(isEven),
    everyeven: nums => nums.every(isEven),
    firsttwo: nums => nums.slice(0, 2),
    lasttwo: nums => nums.slice(-2),
    has2: nums => nums.includes(2),
    increment: nums => nums.map(num => num + 1),
    random: ([x, y]) => Math.floor(Math.random() * y + x),
    range: nums => range(...nums),
    nodupes: nums => [...new Set(nums).values()],
    "": nums => nums,
  }
  
  // Apply the functions in the cells using their respective operations.
  const applyFunction = str => {
    const noHigh = highPrecedence(str); // Resolve high precedence operations first.
    const infix = /([\d.]+)([+-])([\d.]+)/; // Define regex for low precedence operations.
    const str2 = infixEval(noHigh, infix);
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i;
    const toNumberList = args => args.split(",").map(parseFloat);
    const apply = (fn, args) =>
      spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    // Replace functions in the string with their calculated values.
    return str2.replace(
      functionCall,
      (match, fn, args) =>
        spreadsheetFunctions.hasOwnProperty(fn.toLowerCase())
          ? apply(fn, args)
          : match
    );
  }
  
  // Define the range function for generating arrays of numbers or characters.
  const range = (start, end) =>
    Array(end - start + 1)
      .fill(start)
      .map((element, index) => element + index);
  const charRange = (start, end) =>
    range(start.charCodeAt(0), end.charCodeAt(0)).map(code =>
      String.fromCharCode(code)
    );
  
  // Evaluate a formula from a cell, including references to other cells.
  const evalFormula = (x, cells) => {
    const idToText = id => cells.find(cell => cell.id === id).value;
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi;
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2));
    const elemValue = num => character => idToText(character + num);
    const addCharacters = character1 => character2 => num =>
      charRange(character1, character2).map(elemValue(num));
    const rangeExpanded = x.replace(
      rangeRegex,
      (_match, char1, num1, char2, num2) =>
        rangeFromString(num1, num2).map(addCharacters(char1)(char2))
    );
    const cellRegex = /[A-J][1-9][0-9]?/gi;
    const cellExpanded = rangeExpanded.replace(cellRegex, match =>
      idToText(match.toUpperCase())
    );
    const functionExpanded = applyFunction(cellExpanded);
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells);
  }
  
  // Initialize the spreadsheet grid on window load.
  window.onload = () => {
    const container = document.getElementById("container");
    const createLabel = name => {
      const label = document.createElement("div");
      label.className = "label";
      label.textContent = name;
      container.appendChild(label);
    }
    const letters = charRange("A", "J"); // Create labels for columns (A-J).
    letters.forEach(createLabel); // Create column labels.
    range(1, 99).forEach(number => { // Create row labels and cells.
      createLabel(number);
      letters.forEach(letter => {
        const input = document.createElement("input");
        input.type = "text";
        input.id = letter + number;
        input.ariaLabel = letter + number;
        input.onchange = update; // Set the onchange event to update the cell value.
        container.appendChild(input);
      });
    });
  }
  
  // Update the cell's value upon change.
  const update = event => {
    const element = event.target;
    const value = element.value.replace(/\s/g, "");
    // Check for formula (starts with '=') and calculate its result.
    if (!value.includes(element.id) && value.startsWith("=")) {
      element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children));
    }
  }
  