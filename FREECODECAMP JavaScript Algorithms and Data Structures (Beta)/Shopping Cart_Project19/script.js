// Grabbing elements from the HTML document using their IDs to interact with later in the code
const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");

// A flag to keep track of whether the cart is currently visible or hidden
let isCartShowing = false;

// Defining a list of products available for purchase
const products = [
  { id: 1, name: "Vanilla Cupcakes (6 Pack)", price: 12.99, category: "Cupcake" },
  { id: 2, name: "French Macaron", price: 3.99, category: "Macaron" },
  { id: 3, name: "Pumpkin Cupcake", price: 3.99, category: "Cupcake" },
  { id: 4, name: "Chocolate Cupcake", price: 5.99, category: "Cupcake" },
  { id: 5, name: "Chocolate Pretzels (4 Pack)", price: 10.99, category: "Pretzel" },
  { id: 6, name: "Strawberry Ice Cream", price: 2.99, category: "Ice Cream" },
  { id: 7, name: "Chocolate Macarons (4 Pack)", price: 9.99, category: "Macaron" },
  { id: 8, name: "Strawberry Pretzel", price: 4.99, category: "Pretzel" },
  { id: 9, name: "Butter Pecan Ice Cream", price: 2.99, category: "Ice Cream" },
  { id: 10, name: "Rocky Road Ice Cream", price: 2.99, category: "Ice Cream" },
  { id: 11, name: "Vanilla Macarons (5 Pack)", price: 11.99, category: "Macaron" },
  { id: 12, name: "Lemon Cupcakes (4 Pack)", price: 12.99, category: "Cupcake" },
];

// Looping through the products array to create HTML content for each product dynamically
products.forEach(({ name, id, price, category }) => {
  dessertCards.innerHTML += `
    <div class="dessert-card">
      <h2>${name}</h2>
      <p class="dessert-price">$${price}</p>
      <p class="product-category">Category: ${category}</p>
      <button id="${id}" class="btn add-to-cart-btn">Add to cart</button>
    </div>
  `;
});

// Defining a ShoppingCart class to manage the cart functionality
class ShoppingCart {
  constructor() {
    // Initializing an empty array to store items in the cart
    this.items = [];
    // Initializing total amount to 0
    this.total = 0;
    // Defining the tax rate as a fixed percentage
    this.taxRate = 8.25;
  }

  // Method to add an item to the cart
  addItem(id, products) {
    // Find the product in the products array by its ID
    const product = products.find((item) => item.id === id);
    const { name, price } = product; // Destructuring to get product name and price
    this.items.push(product); // Adding the product to the items array

    // Counting the quantity of each product in the cart
    const totalCountPerProduct = {};
    this.items.forEach((dessert) => {
      totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
    });

    // Get the count for the current product in the cart
    const currentProductCount = totalCountPerProduct[product.id];
    const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    // If the product is already in the cart, update the quantity
    if (currentProductCount > 1) {
      currentProductCountSpan.textContent = `${currentProductCount}x`;
    } else {
      // If the product is new to the cart, create a new HTML element for it
      productsContainer.innerHTML += `
        <div id="dessert${id}" class="product">
          <p>
            <span class="product-count" id="product-count-for-id${id}"></span>${name}
          </p>
          <p>${price}</p>
        </div>
      `;
    }
  }

  // Method to get the total count of items in the cart
  getCounts() {
    return this.items.length;
  }

  // Method to clear all items from the cart
  clearCart() {
    // Check if the cart is already empty
    if (!this.items.length) {
      alert("Your shopping cart is already empty");
      return;
    }

    // Ask for user confirmation before clearing the cart
    const isCartCleared = confirm("Are you sure you want to clear all items from your shopping cart?");

    if (isCartCleared) {
      // If confirmed, reset the cart data and update the UI
      this.items = [];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTaxes.textContent = 0;
      cartTotal.textContent = 0;
    }
  }

  // Method to calculate taxes based on the subtotal amount
  calculateTaxes(amount) {
    return parseFloat(((this.taxRate / 100) * amount).toFixed(2)); // Convert to a fixed decimal format
  }

  // Method to calculate the total price including taxes
  calculateTotal() {
    // Calculate subtotal by summing up the prices of all items in the cart
    const subTotal = this.items.reduce((total, item) => total + item.price, 0);
    const tax = this.calculateTaxes(subTotal); // Calculate the tax amount
    this.total = subTotal + tax; // Calculate total amount including tax
    // Update the HTML content with the calculated amounts
    cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
    cartTaxes.textContent = `$${tax.toFixed(2)}`;
    cartTotal.textContent = `$${this.total.toFixed(2)}`;
    return this.total; // Return the total amount
  }
}

// Instantiate the ShoppingCart class to create a new cart object
const cart = new ShoppingCart();

// Grabbing all the "Add to cart" buttons and adding event listeners to them
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
[...addToCartBtns].forEach((btn) => {
  btn.addEventListener("click", (event) => {
    // When a button is clicked, add the corresponding product to the cart
    cart.addItem(Number(event.target.id), products);
    totalNumberOfItems.textContent = cart.getCounts(); // Update the total number of items in the cart
    cart.calculateTotal(); // Calculate and update the total price
  });
});

// Event listener for showing or hiding the cart when the cart button is clicked
cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing; // Toggle the cart visibility
  showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show"; // Update the button text
  cartContainer.style.display = isCartShowing ? "block" : "none"; // Show or hide the cart container
});

// Event listener for clearing the cart when the "Clear Cart" button is clicked
clearCartBtn.addEventListener("click", cart.clearCart.bind(cart));
