import { clearLoginEvents, setLoginEvents } from "./login.js";
import { queryData } from "./helpers.js";
import { clearProfileEvents, renderProfile } from "./profile.js";
import { loginHtml, profileHtml } from "./templates.js";



const token = localStorage.getItem("jwt");
async function initializeApp() {
  try {
    if (token) {
      const userData = await queryData(token, "{user{id}}");
      if (userData) {
        setProfileView();
      } else {
        setLoginView();
      }
    } else {
      setLoginView();
    }
  } catch (error) {
    console.error("Error initializing app:", error);
    setLoginView();
  }
}

export function setProfileView() {
  clearLoginEvents();
  document.body.innerHTML = profileHtml;
  renderProfile();
}

export function setLoginView() {
  clearProfileEvents();
  document.body.innerHTML = loginHtml;
  setLoginEvents();
}

initializeApp();