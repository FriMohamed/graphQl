import { setLogOutLogic, queryData } from "./login.js"

export const userInfoQuery = `{
    user {
        login
        firstName
        lastName
        campus
    }
    transaction(where: {event: {path: {_eq: "/oujda/module"}} type:{_regex: "level|xp"}}) {
        type
        amount
    }  
}`

export async function renderUserInfo(token) {
    const data = await queryData(token, userInfoQuery);
    if (data) {
        document.querySelector("#user-name span").textContent = data.user[0].login;
        document.querySelector("#full-name").textContent = data.user[0].firstName + " " + data.user[0].lastName;
        document.querySelector("#campus").textContent = data.user[0].campus;
        let level = 0, xp = 0, unit = "KB";
        data.transaction.forEach(el => {
            if (el.type == "level") level = el.amount;
            else xp += el.amount;
        });
        document.querySelector("#level span").textContent = level;
        if (xp / 1000 >= 1000) {
            xp = (xp / 10000).toFixed(2);
            unit = "MB"
        } else xp = Math.round(xp / 1000);
        document.querySelector("#xp span").textContent = xp;
        document.querySelector("#xp .des").textContent = unit;
        setLogOutLogic();
        return 1
    } else {
        return 0
    }
}