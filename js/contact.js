// Contact form validation

var form = document.getElementById("contactForm");
var formMessage = document.getElementById("formMessage");

var fields = ["name", "email", "phone", "message"];

function showError(id, text) {
  document.getElementById(id + "Error").textContent = text;
}

function isValidEmail(email) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

function isDigitsOnly(phone) {
  var pattern = /^[0-9]+$/;
  return pattern.test(phone);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  var valid = true;
  formMessage.textContent = "";
  formMessage.className = "message";

  // Check that no field is empty
  fields.forEach(function (id) {
    var value = document.getElementById(id).value.trim();
    if (value === "") {
      showError(id, "This field is required.");
      valid = false;
    } else {
      showError(id, "");
    }
  });

  var email = document.getElementById("email").value.trim();
  if (email !== "" && !isValidEmail(email)) {
    showError("email", "Please enter a valid email address.");
    valid = false;
  }

  var phone = document.getElementById("phone").value.trim();
  if (phone !== "" && !isDigitsOnly(phone)) {
    showError("phone", "Phone number must contain only digits.");
    valid = false;
  }

  if (valid) {
    var name = document.getElementById("name").value.trim();
    formMessage.textContent = "Thank you, " + name + "! Your message has been sent.";
    formMessage.className = "message success";
    form.reset();
  }
});
