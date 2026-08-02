/* =================================================
   REGISTRATION SYSTEM
================================================= */

const registrationForm =
    document.getElementById("registrationForm");


registrationForm.addEventListener("submit", function(event) {

    // Prevent page reload
    event.preventDefault();


    // Get input values

    let name =
        document.getElementById("name").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let phone =
        document.getElementById("phone").value.trim();

    let address =
        document.getElementById("address").value.trim();

    let password =
        document.getElementById("password").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    let message =
        document.getElementById("registrationMessage");


    /* ============================
       NAME VALIDATION
    ============================ */

    if (name === "") {

        message.textContent =
            "Please enter your name.";

        message.style.color = "red";

        return;
    }


    /* ============================
       EMAIL VALIDATION
    ============================ */

    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        message.textContent =
            "Please enter a valid email.";

        message.style.color = "red";

        return;
    }


    /* ============================
       PHONE VALIDATION
    ============================ */

    let phonePattern =
        /^01[3-9]\d{8}$/;


    if (!phonePattern.test(phone)) {

        message.textContent =
            "Please enter a valid Bangladeshi phone number.";

        message.style.color = "red";

        return;
    }


    /* ============================
       ADDRESS VALIDATION
    ============================ */

    if (address === "") {

        message.textContent =
            "Please enter your address.";

        message.style.color = "red";

        return;
    }


    /* ============================
       PASSWORD VALIDATION
    ============================ */

    if (password.length < 8) {

        message.textContent =
            "Password must contain at least 8 characters.";

        message.style.color = "red";

        return;
    }


    /* ============================
       CONFIRM PASSWORD
    ============================ */

    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        message.style.color = "red";

        return;
    }


    /* ============================
       CREATE USER OBJECT
    ============================ */

    let user = {

        name: name,

        email: email,

        phone: phone,

        address: address,

        password: password

    };


    /* ============================
       SAVE USER
    ============================ */

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    /* ============================
       SUCCESS
    ============================ */

    message.textContent =
        "Registration successful! You can now shop.";

    message.style.color = "green";


    // Clear form

    registrationForm.reset();

});



/* =================================================
   SHOPPING CART
================================================= */

// Load existing cart from localStorage

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];



/* =================================================
   ADD TO CART
================================================= */

function addToCart(productName, price, quantityId) {

    // Get quantity

    let quantity =
        parseInt(
            document.getElementById(quantityId).value
        );


    /* ============================
       QUANTITY VALIDATION
    ============================ */

    if (isNaN(quantity) || quantity <= 0) {

        alert("Please enter a valid quantity.");

        return;
    }


    /* ============================
       CHECK PRODUCT ALREADY EXISTS
    ============================ */

    let existingProduct =
        cart.find(
            item => item.name === productName
        );


    if (existingProduct) {

        existingProduct.quantity += quantity;

    }

    else {

        cart.push({

            name: productName,

            price: price,

            quantity: quantity

        });

    }


    // Save cart

    saveCart();


    // Display cart

    displayCart();


    alert(
        productName +
        " added to cart!"
    );
}



/* =================================================
   SAVE CART
================================================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}



/* =================================================
   DISPLAY CART
================================================= */

function displayCart() {

    let cartItems =
        document.getElementById("cartItems");


    // Empty cart

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        updateTotal();

        return;
    }


    cartItems.innerHTML = "";


    // Loop through cart

    cart.forEach(function(item, index) {

        let itemTotal =
            item.price * item.quantity;


        cartItems.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        Price:
                        ৳${item.price}
                    </p>

                    <p>
                        Total:
                        ৳${itemTotal}
                    </p>

                </div>


                <div class="cart-controls">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>


                    <strong>
                        ${item.quantity}
                    </strong>


                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>


                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${index})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;

    });


    updateTotal();
}



/* =================================================
   INCREASE QUANTITY
================================================= */

function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();
}



/* =================================================
   DECREASE QUANTITY
================================================= */

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    }

    else {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();
}



/* =================================================
   REMOVE PRODUCT
================================================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();
}



/* =================================================
   CALCULATE TOTAL
================================================= */

function updateTotal() {

    let subtotal = 0;


    // Calculate subtotal

    cart.forEach(function(item) {

        subtotal +=
            item.price * item.quantity;

    });


    /* ============================
       DISCOUNT
    ============================ */

    let discountPercent = 0;


    if (subtotal >= 1000) {

        discountPercent = 10;

    }

    else if (subtotal >= 500) {

        discountPercent = 5;

    }

    else {

        discountPercent = 0;

    }


    /* ============================
       DISCOUNT AMOUNT
    ============================ */

    let discountAmount =
        subtotal * discountPercent / 100;


    /* ============================
       AFTER DISCOUNT
    ============================ */

    let afterDiscount =
        subtotal - discountAmount;


    /* ============================
       DELIVERY CHARGE
    ============================ */

    let location =
        document.getElementById("location").value;


    let delivery = 0;


    if (subtotal === 0) {

        delivery = 0;

    }

    else if (location === "dhaka") {

        delivery = 70;

    }

    else if (location === "outside") {

        delivery = 120;

    }

    else {

        delivery = 0;

    }


    /* ============================
       GRAND TOTAL
    ============================ */

    let grandTotal =
        afterDiscount + delivery;


    /* ============================
       DISPLAY
    ============================ */

    document.getElementById("subtotal")
        .textContent = subtotal;


    document.getElementById("discountPercent")
        .textContent = discountPercent;


    document.getElementById("discountAmount")
        .textContent = discountAmount;


    document.getElementById("afterDiscount")
        .textContent = afterDiscount;


    document.getElementById("delivery")
        .textContent = delivery;


    document.getElementById("grandTotal")
        .textContent = grandTotal;

}

    /* ============================
       ORDER CONFIRMATION
    ============================ */

    alert(
        "Order placed successfully!\n\n" +

        "Customer: " + user.name + "\n" +

        "Phone: " + user.phone + "\n\n" +

        "Subtotal: ৳" + subtotal + "\n" +

        "Delivery: ৳" + delivery + "\n" +

        "Grand Total: ৳" + grandTotal
    );


    /* ============================
       CLEAR CART
    ============================ */

    cart = [];

    saveCart();

    displayCart();

}



/* =================================================
   PAGE LOAD
================================================= */

displayCart();