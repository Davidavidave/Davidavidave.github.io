
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

function handleLogin() {
  var btn = document.querySelector("button.btn");
  if (!btn) return;
  btn.addEventListener("click", function() {
    var email = document.querySelector('input[type=email]').value;
    var password = document.querySelector('input[type=password]').value;
    if (email && password) {
      localStorage.setItem("burgerLoggedIn", "true");
      window.location.href = "userprofile.html";
    } else {
      alert("Please enter both email and password.");
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

document.addEventListener('DOMContentLoaded', function() {
  updateNavBar();
  var path = window.location.pathname;
  if (path.indexOf("contact.html") !== -1) handleContactForm();
  else if (path.indexOf("signup.html") !== -1) handleSignup();
  else if (path.indexOf("login.html") !== -1) handleLogin();
  else if (path.indexOf("userprofile.html") !== -1) handleUserProfile();
  if (path.indexOf("index.html") !== -1 && localStorage.getItem("burgerJustLoggedOut") === "true") {
    updateNavBar();
    localStorage.removeItem("burgerJustLoggedOut");
  }
});