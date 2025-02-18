import { setLoginEvents } from "./login.js";
import { loginHtml } from "./templates.js";

export function setLogOutLogic() {
    const logOutBtn = document.querySelector("#user-name div");
    document.querySelector("#user-name").addEventListener("mouseover", (e) => {
        logOutBtn.classList.remove("hidden");
    })

    document.querySelector("#user-name").addEventListener("mouseout", (e) => {
        logOutBtn.classList.add("hidden");
    })

    logOutBtn.addEventListener("click", () => {
        document.body.innerHTML = loginHtml;
        localStorage.clear("jwt");
        setLoginEvents();
    })
}