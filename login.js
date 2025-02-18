import { renderProfile } from "./profile.js";
import { queryData } from "./helpers.js";
import { profileHtml } from "./templates.js";

async function login(identifier, password) {
    const base64Credentials = btoa(`${identifier}:${password}`);
    const respons = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
        method: "POST",
        headers: {
            "Authorization": `basic ${base64Credentials}`
        }
    });

    if (respons.ok) {
        const token = await respons.json();
        localStorage.setItem('jwt', token);
        setTimeout(async() => {
            // test the token if its valde
            if (await queryData(token, "{user{id}}")) {
                document.body.innerHTML = profileHtml;
                renderProfile();
            }
        }, 100)
    } else {
        document.querySelector(".login-error").classList.remove("hidden");
    }
}

function setLoginEvents() {
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault()
        const usernameField = document.getElementById("identifier");
        const passwordField = document.getElementById("password");
        login(usernameField.value, passwordField.value);
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
}

export {login, setLoginEvents}