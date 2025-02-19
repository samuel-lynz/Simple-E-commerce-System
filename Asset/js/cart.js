document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    
    const cartBtn = document.getElementById("cart-btn");
    const cartSection = document.getElementById("cart-section");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const checkoutBtn = document.getElementById("checkout-btn");
    const clearCartBtn = document.getElementById("clear-cart-btn");

    // Show/Hide Cart
    cartBtn.addEventListener("click", function (event) {
        event.preventDefault();
        cartSection.style.display = cartSection.style.display === "block" ? "none" : "block";
    });

    // Add to Cart
    document.querySelectorAll(".buy-btn",).forEach(button => {
        button.addEventListener("click", function () {
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            addToCart(name, price);
        });
    });

    function addToCart(name, price) {
        let item = cart.find(product => product.name === name);

        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach((product, index) => {
            total += product.price * product.quantity;
            itemCount += product.quantity;

            const li = document.createElement("li");
            li.innerHTML = `${product.name} x ${product.quantity} - GH₵ ${product.price * product.quantity} 
                <button class="remove-item" data-index="${index}">X</button>`;
            cartItems.appendChild(li);
        });

        cartTotal.innerText = total;
        cartCount.innerText = itemCount;

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                removeFromCart(this.dataset.index);
            });
        });
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Checkout
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Your cart is empty.");
        } else {
            alert("Proceeding to checkout...");
            cart = [];
            updateCart();
        }
    });

    // Clear Cart
    clearCartBtn.addEventListener("click", function () {
        cart = [];
        updateCart();
    });

    // JavaScript to toggle the navigation menu
        document.getElementById('menu-toggle').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });

});
