import { queryData } from "./login.js"

const userInfoQuery = `{
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

export async function userIdentification(token) {
    const data = await queryData(token, userInfoQuery);
    if (data) {
        document.querySelector("#user-name span").textContent = data.user[0].login;
        document.querySelector("#full-name").textContent = data.user[0].firstName + " " + data.user[0].lastName;
        document.querySelector("#campus").textContent = data.user[0].campus;
        let level = 0, xp = 0;
        data.transaction.forEach(el => {
            if (el.type == "level") level = el.amount
            else xp += el.amount
        });
        document.querySelector("#level span").textContent = level;
        document.querySelector("#xp span").textContent = Math.round(xp / 1000);
    }
}