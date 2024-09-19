// Get references to HTML elements
const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

// Initial indices for slicing the author data array
let startingIndex = 0;
let endingIndex = 8;

// Array to hold the fetched author data
let authorDataArr = [];

// Fetch author data from the provided URL
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json()) // Convert the response to JSON
  .then((data) => {
    authorDataArr = data; // Store the fetched data in the array
    // Display the initial set of authors
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));  
  })
  .catch((err) => {
    // Display an error message if the fetch fails
    authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

// Function to handle loading more authors when the button is clicked
const fetchMoreAuthors = () => {
  // Update the indices to load the next set of authors
  startingIndex += 8;
  endingIndex += 8;

  // Display the next set of authors
  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

  // Disable the button if there are no more authors to load
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true; // Disable the button
    loadMoreBtn.style.cursor = "not-allowed"; // Change cursor to indicate the button is inactive
    loadMoreBtn.textContent = 'No more data to load'; // Update button text
  }
};

// Function to display authors in the container
const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    // Append a new user card for each author
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};

// Add an event listener to the "Load More" button to fetch more authors when clicked
loadMoreBtn.addEventListener('click', fetchMoreAuthors);
