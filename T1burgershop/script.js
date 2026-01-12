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
