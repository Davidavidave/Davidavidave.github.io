
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

// Cart functions
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