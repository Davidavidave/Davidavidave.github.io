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
  handleSignup();
});