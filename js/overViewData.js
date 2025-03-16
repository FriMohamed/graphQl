import { queryData } from "./helpers.js";
import { setLogOutLogic } from "./logout.js";

const userInfoQuery = `{
    user {
        login
        firstName
        lastName
        campus
    }
    transaction(where: {event: {path: {_eq: "/oujda/module"}} type:{_regex: "level|xp|up|down"}}) {
        type
        amount
    }  
}`

let login = "", fullName = "", campus = "", ratio = 0, level = 0, totalXp = 0;

async function queryUserInfo() {
    const token = localStorage.getItem("jwt");
    const data = await queryData(token, userInfoQuery);

    login = data.user[0].login;
    fullName = data.user[0].firstName + " " + data.user[0].lastName;
    campus = data.user[0].campus;

    let up = 0, down = 0;
    data.transaction.forEach(el => {
        if (el.type == "level") (el.amount > level) ? level = el.amount : level = level;
        else if (el.type == "up" || el.type == "down") {
            if (el.type == "up") up += el.amount;
            else down += el.amount;
        } else totalXp += el.amount;
    });

    ratio = (up / down).toFixed(1);
}

function renderUserInfo() {
    document.querySelector("#user-name span").textContent = login;
    document.querySelector("#full-name").textContent = fullName;
    document.querySelector("#campus").textContent = campus;
    document.querySelector("#level span").textContent = level;
    document.querySelector("#ratio span").textContent = ratio;

    let unit = "KB";
    if (totalXp >= 1000000) {
        totalXp = (totalXp / 1000000).toFixed(2);
        unit = "MB"
    } else totalXp = Math.round(totalXp / 1000);

    document.querySelector("#xp span").textContent = totalXp;
    document.querySelector("#xp .des").textContent = unit;
    setLogOutLogic();
}

export {queryUserInfo, renderUserInfo}