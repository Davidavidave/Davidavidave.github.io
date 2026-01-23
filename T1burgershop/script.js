document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function(event) {
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
});

// --- Simple Auth Logic ---
document.addEventListener("DOMContentLoaded", function() {
  // Signup page logic
  if (window.location.pathname.endsWith("signup.html")) {
    const signupBtn = document.querySelector("button.btn");
    if (signupBtn) {
      signupBtn.addEventListener("click", function() {
        // For demo: just save a dummy user and redirect to login
        localStorage.setItem("burgerUser", JSON.stringify({
          email: document.querySelector('input[type=email]').value,
          password: document.querySelectorAll('input[type=password]')[0].value,
          firstName: document.querySelectorAll('input[type=text]')[0].value,
          lastName: document.querySelectorAll('input[type=text]')[1].value,
          mobile: document.querySelector('input[type=tel]').value,
          address: document.querySelector('textarea').value
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
      loginBtn.addEventListener("click", function() {
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
      if (user.firstName) {
        const main = document.querySelector("main");
        if (main) {
          main.innerHTML = `
            <p><strong>First Name:</strong> ${user.firstName}</p>
            <p><strong>Last Name:</strong> ${user.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Mobile Number:</strong> ${user.mobile}</p>
            <p><strong>Home Address:</strong> ${user.address}</p>
            <a href="#" class="btn" id="logoutBtn">Logout</a>
          `;
        }
      }
      // Logout logic
      setTimeout(function() {
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.removeItem("burgerLoggedIn");
            window.location.href = "index.html";
          });
        }
      }, 100);
    }
  }

  // Hide user profile link if not logged in
  const navLinks = document.querySelectorAll('a[href="userprofile.html"]');
  if (navLinks.length) {
    if (localStorage.getItem("burgerLoggedIn") !== "true") {
      navLinks.forEach(link => link.style.display = "none");
    } else {
      navLinks.forEach(link => link.style.display = "");
    }
  }
});
