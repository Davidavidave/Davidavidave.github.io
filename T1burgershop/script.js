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
  window.location.href = 'index.html'; 
}


document.addEventListener('DOMContentLoaded', updateNavBar);
document.addEventListener("DOMContentLoaded", function () {
  
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
      const name = document.getElementById("name").value.trim();
      const message = document.getElementById("message").value.trim();
      if (name && message) {
        alert("Thank you, " + name + "! Your message has been received.");
        form.reset(); 
      } else {
        alert("Please fill in both fields before submitting.");
      }
    });
  }

  
  if (window.location.pathname.endsWith("signup.html")) {
    const signupBtn = document.querySelector("button.btn");
    if (signupBtn) {
      signupBtn.addEventListener("click", function () {
        const form = document.getElementById("signupForm");
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const mobile = document.getElementById("mobile").value.trim();
        const address = document.getElementById("address").value.trim();

        
        if (!firstName || !lastName || !email || !password || !confirmPassword || !mobile || !address) {
          alert("Please fill in all fields.");
          return;
        }
        
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }

        
        localStorage.setItem("burgerUser", JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          mobile,
          address
        }));
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
      });
    }
  }

  
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


  if (window.location.pathname.endsWith("userprofile.html")) {
    if (localStorage.getItem("burgerLoggedIn") !== "true") {
    
      window.location.href = "login.html";
    } else {
    
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
  
      setTimeout(function () {
        const logoutBtn = document.getElementById("logoutBtn");
        if (logoutBtn) {
          logoutBtn.addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("burgerLoggedIn");
            updateNavLinks();
          
            document.querySelectorAll('.nav-userprofile').forEach(link => link.style.display = "none");
            document.querySelectorAll('.nav-login').forEach(link => link.style.display = "");
            window.location.href = "index.html";
          });
        }
      }, 100);
    }
  }


  if (window.location.pathname.endsWith("index.html") && localStorage.getItem("burgerJustLoggedOut") === "true") {
    updateNavLinks();
    localStorage.removeItem("burgerJustLoggedOut");
  }

  updateNavLinks();
});