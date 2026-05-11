/*Cart count */
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartCount = document.getElementById("cart-count");
  if (!cartCount) return;

  cartCount.textContent = totalItems;
  cartCount.style.display = totalItems > 0 ? "inline-flex" : "none";
}
/*add tickets to cart */
const addCartButtons = document.querySelectorAll(".add-cart-btn");

addCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const ticketRow = button.closest(".ticket-row");
    const quantityInput = ticketRow.querySelector(".ticket-quantity");
    const ticketImage = ticketRow.querySelector("img");

    const quantity = parseInt(quantityInput.value);

    if (quantity < 1 || isNaN(quantity)) {
      alert("Please choose at least 1 ticket.");
      return;
    }
    const product = {
      id: button.dataset.name,
      name: button.dataset.name,
      price: Number(button.dataset.price),
      image: ticketImage.src,
      quantity: quantity,
    };
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Ticket added to cart!");
  });
});

/*Load cart page */
function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItemsContainer.innerHTML = "";

  cart.forEach((item, index) => {
    let subtotal = item.price * item.quantity;
    total += subtotal;

    cartItemsContainer.innerHTML += `
        <div class="cart-ticket">
            <img src="${item.image}" alt="${item.name}" class="cart-ticket-img">
            <h2>${item.name}</h2>
            <p>Price: ${item.price} kr</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Subtotal: ${subtotal}kr</p>
        </div>
        <button onclick="removeFromCart (${index})">Remove</button>
        </div>
        `;
  });

  cartTotal.textContent = total + "kr";
}
/*Remove items */
window.removeFromCart = function (index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  clear-cart-btn.addEventListener("click", function () {
    localStorage.removeItem("cart");
  });

  loadCart();
  updateCartCount();
};

/*continue shopping button*/
const continueBtn = document.querySelector(".continue-btn");

if (continueBtn) {
  continueBtn.addEventListener("click", function () {
    window.location.href = "ticketpage.html";
  });
}

/*Payment Button*/
const paymentBtn = document.querySelector(".payment-btn");

if (paymentBtn) {
  paymentBtn.addEventListener("click", function () {
    alert("Payment page is not available yet.");
  });
}

/*run on every page */
updateCartCount();
loadCart();

const elements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});
