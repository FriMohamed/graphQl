import { queryData } from "./helpers.js";
import { cleaners } from "./profile.js";
import { drawSimpleGraph } from "./simpleGraph.js";

let level = 0, xpByTimePiscineData = [], totalPiscineXp = 0;
async function queryPeiscineData(piscine) {
    level = 0
    xpByTimePiscineData = []
    totalPiscineXp = 0;
    
    const query = `
    {
    	transaction(where:{event: {path: {_eq: "/oujda/${piscine}"}}}) {
            type
            amount
            path
            createdAt
            object{
                name
            }
        }
    } 
    `;

    const token = localStorage.getItem("jwt");
    const data = await queryData(token, query);

    data.transaction.forEach(el => {
        if (el.type == "level") {
            level = (level > el.amount) ? level : el.amount;
        } else if (el.type == "xp") {
            totalPiscineXp += el.amount;
            xpByTimePiscineData.push([el.object.name, el.amount, new Date(el.createdAt)]);
        }
    });

    xpByTimePiscineData.sort((a, b) => a[2] - b[2]);
}

function renderPiscineInfo() {
    document.querySelector("#p-level span").textContent = level;

    let unit = " KB", xp = totalPiscineXp;
    if (xp >= 1000000) {
        xp = (xp / 1000000).toFixed(2);
        unit = " MB"
    } else xp = Math.round(xp / 1000);

    document.querySelector("#p-xp span").textContent = xp + unit;
}

function selectEvent() {
    const select = document.getElementById("piscine-select");
    select.addEventListener("change", async () => {
        document.querySelector(".p-graph2 svg").innerHTML = "";
        await queryPeiscineData(select.value);
        renderPiscineInfo();
        drawSimpleGraph(xpByTimePiscineData, document.querySelector(".p-graph2 svg"), totalPiscineXp);
    })

    cleaners.push(() => {
        select.removeEventListener("change", async () => {
            document.querySelector(".p-graph2 svg").innerHTML = "";
            await queryPeiscineData(select.value);
            renderPiscineInfo();
            drawSimpleGraph(xpByTimePiscineData, document.querySelector(".p-graph2 svg"), totalPiscineXp);
        })
    })
}

export { queryPeiscineData, renderPiscineInfo, selectEvent, xpByTimePiscineData, totalPiscineXp }