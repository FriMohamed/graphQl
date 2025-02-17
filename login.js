import { renderModuleGraphs } from "./moduleGraphs.js";
import { getPiscinsData } from "./piscines.js";
import { loginHtml, profileHtml } from "./templates.js";
import { renderUserInfo } from "./userIdentification.js";

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
                renderUserInfo(token);
                renderModuleGraphs(token);
                getPiscinsData("piscine-go");
            }
        }, 100)
    } else {
        document.querySelector(".login-error").classList.remove("hidden");
    }
}

async function queryData(token, query) {
    const respons = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query: query
        })
    });

    const data = await respons.json();
    return data.data ? data.data : null 
}

function setLoginEvents() {
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
}

function setLogOutLogic() {
    const logOutBtn = document.querySelector("#user-name div");
    document.querySelector("#user-name").addEventListener("mouseover", (e) => {
        logOutBtn.classList.remove("hidden");
    })

    document.querySelector("#user-name").addEventListener("mouseout", (e) => {
        logOutBtn.classList.add("hidden");
    })

    logOutBtn.addEventListener("click", () => {
        document.body.innerHTML = loginHtml;
        setLoginEvents();
        localStorage.clear("jwt");
    })
}

export {login, queryData, setLoginEvents, setLogOutLogic}