import { setLoginEvents } from "./login.js";
import { queryData } from "./helpers.js";
import { renderProfile } from "./profile.js";
import { loginHtml, profileHtml } from "./templates.js";



const token = localStorage.getItem("jwt");
if (token) {
  if (await queryData(token, "{user{id}}")) {
    document.body.innerHTML = profileHtml;
    renderProfile();
  } else {
    document.body.innerHTML = loginHtml;
    setLoginEvents();
  }
} else {
  document.body.innerHTML = loginHtml;
  setLoginEvents();
}