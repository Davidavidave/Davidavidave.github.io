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

document.addEventListener('DOMContentLoaded', function() {
  handleLogin();
});