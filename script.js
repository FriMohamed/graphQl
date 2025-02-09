import { login } from "./login.js";
import { userIdentification } from "./userIdentification.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault()
    const usernameField = document.getElementById("identifier");
    const passwordField = document.getElementById("password");
    login(usernameField.value, passwordField.value)
    usernameField.value = "";
    passwordField.value = "";
})

document.querySelector('#toggle-password').addEventListener("click", () => {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      }
})

const token = localStorage.getItem("jwt");

if (token) {
  userIdentification(token);
} else {
  document.querySelector(".login-container").classList.remove("hidden");
}
