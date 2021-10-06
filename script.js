const form = document.getElementById("form");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const postcode = document.getElementById("postcode");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Check required fields
function checkRequired(inputsArr) {
  inputsArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
}

// Check phone number
function checkPhone(input) {
  // Any 10 numbers starting with 0 or +44
  const re = /^(?:0|\+44)?(?:\d\s?){10}$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Phone is not a valid UK number");
  }
}

// Check postcode is valid
function checkPC(input) {
  const re = /^[a-zA-Z]{1,2}\d[a-zA-Z\d]? ?\d[a-zA-Z]{2}$/;
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Post code is not valid");
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
  }
}

// Get fieldname
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([firstname, lastname, username, email, password, password2]);
  checkLength(firstname, 2, 15);
  checkLength(lastname, 2, 15);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPC(postcode);
  checkPhone(phone);
  checkPasswordsMatch(password, password2);
});
