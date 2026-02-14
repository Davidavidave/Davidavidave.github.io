
function updateNavBar() {
  var authLinks = document.getElementById('auth-links');
  if (!authLinks) return;
  var isLoggedIn = localStorage.getItem('burgerLoggedIn') === 'true';
  if (isLoggedIn) {
    authLinks.innerHTML = '<ul class="sidebar-auth"><li><a href="userprofile.html"><span class="sidebar-icon">👤</span>Profile</a></li><li><a href="#" id="logout-link"><span class="sidebar-icon">🚪</span>Logout</a></li></ul>';
    document.getElementById('logout-link').onclick = function(e) {
      e.preventDefault();
      logout();
    };
  } else {
    authLinks.innerHTML = '<ul class="sidebar-auth"><li><a href="login.html"><span class="sidebar-icon">🔑</span>Login</a></li></ul>';
  }
}

function logout() {
  localStorage.removeItem('burgerLoggedIn');
  updateNavBar();
  window.location.href = 'index.html';
}

function handleContactForm() {
  var form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    var name = document.getElementById("name").value.replace(/^\s+|\s+$/g, '');
    var message = document.getElementById("message").value.replace(/^\s+|\s+$/g, '');
    if (name && message) {
      alert("Thank you, " + name + "! Your message has been received.");
      form.reset();
    } else {
      alert("Please fill in both fields before submitting.");
    }
  });
}

function handleUserProfile() {
  if (localStorage.getItem("burgerLoggedIn") !== "true") {
    window.location.href = "login.html";
    return;
  }
  var user = JSON.parse(localStorage.getItem("burgerUser") || '{}');
  var main = document.querySelector("main");
  if (main && user.firstName) {
    main.innerHTML = '<p><strong>First Name:</strong> ' + user.firstName + '</p><p><strong>Last Name:</strong> ' + user.lastName + '</p><p><strong>Email:</strong> ' + user.email + '</p><p><strong>Mobile Number:</strong> ' + user.mobile + '</p><p><strong>Home Address:</strong> ' + user.address + '</p><a href="#" class="btn" id="logoutBtn">Logout</a>';
    document.getElementById("logoutBtn").addEventListener("click", function(e) {
      e.preventDefault();
      localStorage.removeItem("burgerLoggedIn");
      updateNavBar();
      window.location.href = "index.html";
    });
  }
}

function getCart() {
  return JSON.parse(localStorage.getItem('burgerCart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('burgerCart', JSON.stringify(cart));
}

function addToCart(name, price) {
  var cart = getCart();
  var existingItem = cart.find(function(item) {
    return item.name === name;
  });
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: parseFloat(price.replace('Php ', '').replace(',', '')), quantity: 1 });
  }
  saveCart(cart);
  alert(name + ' added to cart!');
}

function removeFromCart(index) {
  var cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  updateCartDisplay();
}

function updateQuantity(index, quantity) {
  var cart = getCart();
  quantity = parseInt(quantity);
  if (quantity <= 0) {
    removeFromCart(index);
  } else {
    cart[index].quantity = quantity;
    saveCart(cart);
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  var cart = getCart();
  var tbody = document.querySelector('.cart-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  var total = 0;
  cart.forEach(function(item, index) {
    var itemTotal = item.price * item.quantity;
    total += itemTotal;
    var row = '<tr>' +
      '<td>' + item.name + '</td>' +
      '<td>Php ' + item.price.toFixed(2) + '</td>' +
      '<td><input type="number" value="' + item.quantity + '" min="1" class="quantity" onchange="updateQuantity(' + index + ', this.value)"></td>' +
      '<td>Php ' + itemTotal.toFixed(2) + '</td>' +
      '<td><button class="btn remove-btn" onclick="removeFromCart(' + index + ')">Remove</button></td>' +
      '</tr>';
    tbody.innerHTML += row;
  });
  var totalElement = document.querySelector('.cart-total p strong');
  if (totalElement) {
    totalElement.textContent = 'Total: Php ' + total.toFixed(2);
  }
}

function handleAddToCart() {
  var buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var product = this.closest('.product');
      var name = product.querySelector('h3').textContent;
      var price = product.querySelector('.price').textContent;
      addToCart(name, price);
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateNavBar();
  var path = window.location.pathname;
  if (path.indexOf("contact.html") !== -1) handleContactForm();
  else if (path.indexOf("userprofile.html") !== -1) handleUserProfile();
  else if (path.indexOf("products.html") !== -1) handleAddToCart();
  else if (path.indexOf("cart.html") !== -1) updateCartDisplay();
  if (path.indexOf("index.html") !== -1 && localStorage.getItem("burgerJustLoggedOut") === "true") {
    updateNavBar();
    localStorage.removeItem("burgerJustLoggedOut");
  }
});

//handle signup form
function handleSignup() {
  var btn = document.querySelector("button.btn");
  if (!btn) return;
  btn.addEventListener("click", function() {
    var firstName = document.getElementById("firstName").value.replace(/^\s+|\s+$/g, '');
    var lastName = document.getElementById("lastName").value.replace(/^\s+|\s+$/g, '');
    var email = document.getElementById("email").value.replace(/^\s+|\s+$/g, '');
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var mobile = document.getElementById("mobile").value.replace(/^\s+|\s+$/g, '');
    var address = document.getElementById("address").value.replace(/^\s+|\s+$/g, '');
    if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile || !address) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    var user = { email: email, password: password, firstName: firstName, lastName: lastName, mobile: mobile, address: address };
    localStorage.setItem("burgerUser", JSON.stringify(user));
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.indexOf("signup.html") !== -1) handleSignup();
});

//handle payment form
function handlePaymentForm() {
  var form = document.getElementById("paymentForm");
  if (!form) return;

  
  var deliveryRadios = document.querySelectorAll('input[name="delivery"]');
  deliveryRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      var deliveryAddress = document.getElementById('delivery-address');
      if (this.value === 'delivery') {
        deliveryAddress.style.display = 'block';
      } else {
        deliveryAddress.style.display = 'none';
      }
      updateOrderSummary();
    });
  });

  
  var paymentRadios = document.querySelectorAll('input[name="payment"]');
  paymentRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      var cardDetails = document.getElementById('card-details');
      var paypalDetails = document.getElementById('paypal-details');
      cardDetails.style.display = 'none';
      paypalDetails.style.display = 'none';
      if (this.value === 'card') {
        cardDetails.style.display = 'block';
      } else if (this.value === 'paypal') {
        paypalDetails.style.display = 'block';
      }
    });
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();


    var deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
    var paymentOption = document.querySelector('input[name="payment"]:checked').value;

    if (deliveryOption === 'delivery' && !document.getElementById('address').value.trim()) {
      alert('Please enter a delivery address.');
      return;
    }

    if (paymentOption === 'card') {
      var cardNumber = document.getElementById('cardNumber').value.trim();
      var expiry = document.getElementById('expiry').value.trim();
      var cvv = document.getElementById('cvv').value.trim();
      var cardName = document.getElementById('cardName').value.trim();

      if (!cardNumber || !expiry || !cvv || !cardName) {
        alert('Please fill in all card details.');
        return;
      }
    }


    alert('Processing payment...');
    setTimeout(function() {
      window.location.href = 'confirmation.html';
    }, 2000);
  });
}

function updateOrderSummary() {
  var deliveryOption = document.querySelector('input[name="delivery"]:checked').value;
  var subtotal = 450.00; 
  var deliveryCost = deliveryOption === 'delivery' ? 50.00 : 0.00;
  var total = subtotal + deliveryCost;

  var summaryElement = document.querySelector('.order-summary');
  if (summaryElement) {
    summaryElement.innerHTML = `
      <h3>Order Summary</h3>
      <p>Subtotal: Php ${subtotal.toFixed(2)}</p>
      <p>Delivery: Php ${deliveryCost.toFixed(2)}</p>
      <p><strong>Total: Php ${total.toFixed(2)}</strong></p>
    `;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  handlePaymentForm();
});

//login
function handleLogin() {
  var btn = document.querySelector("button.btn");
  if (!btn) return;
  btn.addEventListener("click", function() {
    var email = document.querySelector('input[type=email]').value.trim();
    var password = document.querySelector('input[type=password]').value;
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    var user = JSON.parse(localStorage.getItem("burgerUser") || '{}');
    if (user.email === email && user.password === password) {
      localStorage.setItem("burgerLoggedIn", "true");
      window.location.href = "userprofile.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.indexOf("login.html") !== -1) handleLogin();
});

