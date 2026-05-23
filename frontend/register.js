const username = document.getElementById("username");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");
const terms = document.getElementById("terms");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const repeatPasswordError = document.getElementById("repeatPasswordError");
const termsError = document.getElementById("termsError");

function clearOnInput(input, errorField) {
  input.addEventListener("input", () => {
    errorField.textContent = "";
  });
}

clearOnInput(username, usernameError);
clearOnInput(password, passwordError);
clearOnInput(repeatPassword, repeatPasswordError);
terms.addEventListener("change", () => (termsError.textContent = ""));

document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let valid = true;

    // Username validation
    if (username.value.trim().length < 3) {
      usernameError.textContent = "Invalid username";
      valid = false;
    }

    // Password validation
    const pw = password.value;
    if (pw.length < 8 || !/\d/.test(pw)) {
      passwordError.textContent =
        "Password must be at least 8 characters and contain a number";
      valid = false;
    }

    // Repeat password validation
    if (repeatPassword.value !== pw) {
      repeatPasswordError.textContent = "Passwords do not match";
      valid = false;
    }

    // Terms checkbox
    if (!terms.checked) {
      termsError.textContent = "You must agree before registering";
      valid = false;
    }

    if (!valid) return;

    // Submit to backend
    const res = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.error === "Username already taken") {
        usernameError.textContent = "Username already taken";
      }
      return;
    }

    alert("Registration successful!");
    window.location.href = "login.html";
  });
