import { setLoginView } from "./index.js";
import { cleaners} from "./profile.js";

export function setLogOutLogic() {
    const logOutBtn = document.querySelector("#user-name div");
    document.querySelector("#user-name").addEventListener("mouseover", (e) => {
        logOutBtn.classList.remove("hidden");
    })

    document.querySelector("#user-name").addEventListener("mouseout", (e) => {
        logOutBtn.classList.add("hidden");
    })

    cleaners.push(() => {
        document.querySelector("#user-name").removeEventListener("mouseover", (e) => {
            logOutBtn.classList.remove("hidden");
        })

        document.querySelector("#user-name").removeEventListener("mouseout", (e) => {
            logOutBtn.classList.add("hidden");
        })
    })

    logOutBtn.addEventListener("click", () => {
        localStorage.clear("jwt");
        setLoginView();
    })
}