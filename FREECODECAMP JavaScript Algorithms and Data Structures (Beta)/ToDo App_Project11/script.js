// Get references to DOM elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Retrieve task data from local storage or initialize with an empty array
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

// Function to add a new task or update an existing task
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  // Add new task or update existing task in the array
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  // Save the updated task data to local storage
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer(); // Refresh the task container
  reset(); // Reset the form and button text
};

// Function to update the task container with the current tasks
const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""; // Clear existing tasks

  taskData.forEach(({ id, title, date, description }) => {
    // Create HTML for each task and add it to the container
    tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
      </div>
    `;
  });
};

// Function to delete a task
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove(); // Remove the task from the DOM
  taskData.splice(dataArrIndex, 1); // Remove the task from the array
  localStorage.setItem("data", JSON.stringify(taskData)); // Update local storage
};

// Function to populate the form with task data for editing
const editTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex]; // Set the current task

  // Populate form fields with task data
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task"; // Change button text for updating

  taskForm.classList.toggle("hidden"); // Show the form
};

// Function to reset the form and button text
const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task"; // Reset button text to "Add Task"

  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden"); // Hide the form
  currentTask = {}; // Clear current task
};

// Initialize the task container if there are tasks in local storage
if (taskData.length) {
  updateTaskContainer();
}

// Event listener to show the task form
openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

// Event listener to handle closing the form
closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  // Show confirmation dialog if there are unsaved changes
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

// Event listener to cancel the close confirmation dialog
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Event listener to discard changes and reset the form
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset();
});

// Event listener to handle form submission
taskForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission
  addOrUpdateTask(); // Add or update the task
});
