
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

document.addEventListener('DOMContentLoaded', function() {
  updateNavBar();
  var path = window.location.pathname;
  if (path.indexOf("contact.html") !== -1) handleContactForm();
  else if (path.indexOf("userprofile.html") !== -1) handleUserProfile();
  if (path.indexOf("index.html") !== -1 && localStorage.getItem("burgerJustLoggedOut") === "true") {
    updateNavBar();
    localStorage.removeItem("burgerJustLoggedOut");
  }
});