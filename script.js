import { queryData, setLoginEvents } from "./login.js";
import { renderModuleGraphs } from "./moduleGraphs.js";
import { getPiscinsData } from "./piscines.js";
import { loginHtml, profileHtml } from "./templates.js";
import { renderUserInfo } from "./userIdentification.js";



const token = localStorage.getItem("jwt");

if (token) {
  if (await queryData(token, "{user{id}}")) {
    document.body.innerHTML = profileHtml;
    renderUserInfo(token);
    renderModuleGraphs(token);
    getPiscinsData("piscine-go");
  } else {
    document.body.innerHTML = loginHtml;
    setLoginEvents();
  }
} else {
  document.body.innerHTML = loginHtml;
  setLoginEvents();
}