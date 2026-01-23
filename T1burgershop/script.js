

// Nav bar login/profile/logout toggle logic
function updateNavBar() {
  const authLinks = document.getElementById('auth-links');
  if (!authLinks) return;
  if (localStorage.getItem('burgerLoggedIn') === 'true') {
    authLinks.innerHTML = `
      <ul class="sidebar-auth">
        <li><a href="userprofile.html" id="profile-link"><span class="sidebar-icon">👤</span>Profile</a></li>
        <li><a href="#" id="logout-link"><span class="sidebar-icon">🚪</span>Logout</a></li>
      </ul>
    `;
    setTimeout(() => {
      const logoutBtn = document.getElementById('logout-link');
      if (logoutBtn) {
        logoutBtn.onclick = function(e) {
          e.preventDefault();
          logout();
        };
      }
    }, 0);
  } else {
    authLinks.innerHTML = `
      <ul class="sidebar-auth">
        <li><a href="login.html" id="login-link"><span class="sidebar-icon">🔑</span>Login</a></li>
      </ul>
    `;
  }
}

function logout() {
  localStorage.removeItem('burgerLoggedIn');
  updateNavBar();
  window.location.href = 'index.html'; // Always redirect after logout
}

// Call on every page load
document.addEventListener('DOMContentLoaded', updateNavBar);
document.addEventListener("DOMContentLoaded", function () {
  // Contact form logic
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // prevent actual form submission
      const name = document.getElementById("name").value.trim();
      const message = document.getElementById("message").value.trim();
      if (name && message) {
        alert("Thank you, " + name + "! Your message has been received.");
        form.reset(); // clear the form after submission
      } else {
        alert("Please fill in both fields before submitting.");
      }
    });
  }

  // Signup page logic
  if (window.location.pathname.endsWith("signup.html")) {
    const signupBtn = document.querySelector("button.btn");
    if (signupBtn) {
      signupBtn.addEventListener("click", function () {
        // For demo: just save a dummy user and redirect to login
        const [firstNameInput, lastNameInput] = document.querySelectorAll('input[type=text]');
        const [passwordInput] = document.querySelectorAll('input[type=password]');
        const emailInput = document.querySelector('input[type=email]');
        const mobileInput = document.querySelector('input[type=tel]');
        const addressInput = document.querySelector('textarea');
        localStorage.setItem("burgerUser", JSON.stringify({
          email: emailInput?.value,
          password: passwordInput?.value,
          firstName: firstNameInput?.value,
          lastName: lastNameInput?.value,
          mobile: mobileInput?.value,
          address: addressInput?.value
        }));
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
      });
    }
  }

  // Login page logic (allow any non-empty email and password)
  if (window.location.pathname.endsWith("login.html")) {
    const loginBtn = document.querySelector("button.btn");
    if (loginBtn) {
      loginBtn.addEventListener("click", function () {
        const email = document.querySelector('input[type=email]').value;
        const password = document.querySelector('input[type=password]').value;
        if (email && password) {
          localStorage.setItem("burgerLoggedIn", "true");
          window.location.href = "userprofile.html";
        } else {
          alert("Please enter both email and password.");
        }
      });
    }
  }

  // User profile page logic
  if (window.location.pathname.endsWith("userprofile.html")) {
    if (localStorage.getItem("burgerLoggedIn") !== "true") {
      // Not logged in, redirect to login
      window.location.href = "login.html";
    } else {
      // Fill user info if available
      const user = JSON.parse(localStorage.getItem("burgerUser") || '{}');
      const { firstName, lastName, email, mobile, address } = user;
      if (firstName) {
        const main = document.querySelector("main");
        if (main) {
          main.innerHTML = `
            <p><strong>First Name:</strong> ${firstName ?? ''}</p>
            <p><strong>Last Name:</strong> ${lastName ?? ''}</p>
            <p><strong>Email:</strong> ${email ?? ''}</p>
            <p><strong>Mobile Number:</strong> ${mobile ?? ''}</p>
            <p><strong>Home Address:</strong> ${address ?? ''}</p>
            <a href="#" class="btn" id="logoutBtn">Logout</a>
          `;
        }
      }
      // Logout logic
      setTimeout(function () {
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("burgerLoggedIn");
            updateNavLinks();
            // Immediately update nav links on all pages
            document.querySelectorAll('.nav-userprofile').forEach(link => link.style.display = "none");
            document.querySelectorAll('.nav-login').forEach(link => link.style.display = "");
            window.location.href = "index.html";
          });
        }
      }, 100);
    }
  }

  // Add this block to index.html and other pages to handle nav update after logout
  if (window.location.pathname.endsWith("index.html") && localStorage.getItem("burgerJustLoggedOut") === "true") {
    updateNavLinks();
    localStorage.removeItem("burgerJustLoggedOut");
  }

  updateNavLinks();
});