import { drawLabel, drawLine, drawPoint } from "./helpers.js";
import { queryData } from "./login.js";
let level = 0;
let totalXp = 0;
let xpByTime = [];

export async function getPiscinsData(piscine) {
    if (piscine != "piscine-go" && piscine != "module/piscine-js") return;
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
    level = 0;
    totalXp = 0;
    xpByTime = []

    data.transaction.forEach(el => {
        if (el.type == "level") {
            level = (level > el.amount) ? level : el.amount;
        } else if (el.type == "xp") {
            totalXp += el.amount;
            xpByTime.push([el.object.name, el.amount, new Date(el.createdAt), el.path]);
        }
    });

    xpByTime.sort((a, b) => a[2] - b[2]);
    setEvent();
    renderbisicInfo();
    renderGraph();
}

function renderbisicInfo() {
    document.querySelector("#p-level span").textContent = level;
    let unit = " KB"
    let xp = totalXp;
    if (xp / 1000 >= 1000) {
        xp = (xp / 1000000).toFixed(2);
        unit = " MB"
    } else xp = Math.round(xp / 1000);
    document.querySelector("#p-xp span").textContent = xp + unit;
}

export function renderGraph() {
    const svg = document.querySelector(".p-graph2 svg");
    const svgRect = svg.getBoundingClientRect();
    const graphWidth = svgRect.width;
    const graphHeight = svgRect.height;
    const minTime = xpByTime[0][2];
    const maxTime = xpByTime[xpByTime.length - 1][2];

    let Height = 50;
    for(let j = 0; j < 5; j++) {
        drawLine(svg, 20, Height, graphWidth - 20, Height, "#777");
        Height += 80
    }
    let cumulXp = 0;
    const lastPointCord = [];

    for (let i = 0; i < xpByTime.length; i++) {
        const j = i;
        let name = xpByTime[i][0];
        let pointXp = xpByTime[i][1];
        let time = xpByTime[i][2];

        if (i < xpByTime.length - 1 && areSameDay(xpByTime[i + 1][2], xpByTime[i][2])) {
            pointXp = 0
            while (i < xpByTime.length - 1 && areSameDay(xpByTime[i + 1][2], xpByTime[i][2])) {
                pointXp += xpByTime[i][1];
                i++;
            }
            time = xpByTime[i][2];
            name = xpByTime[i][0];
            pointXp += xpByTime[i][1];
        }

        cumulXp += pointXp;
        const xPos = (time - minTime) / (maxTime - minTime) * (graphWidth - 60) + 40;
        const yPos = (graphHeight - 40) - (cumulXp * (graphHeight - 40) / totalXp) + 10;
        const point = drawPoint(svg, xPos, yPos);
        point.labels = [];

        // XP lebel
        drawLabel(3, yPos + 6, `+${Math.round(pointXp / 1000)}KB`, svg, point, 10);

        // Time lebel
        const month = time.toLocaleString('default', { month: 'short' });
        const day = String(time.getDate()).padStart(2, '0');
        const formattedDate = `${month} ${day}`;
        drawLabel(xPos - 15, graphHeight - 15, formattedDate, svg, point, 10);

        // Project name label
        drawLabel(60, 20, name, svg, point, 16);
        if (j == 0) {
            lastPointCord[0] = xPos;
            lastPointCord[1] = yPos;
            
        } else {
            drawLine(svg, lastPointCord[0], lastPointCord[1], xPos, yPos, "#9959ff", 2);
            lastPointCord[0] = xPos;
            lastPointCord[1] = yPos;
        }
    }
}

function setEvent() {
    const select = document.getElementById("piscine-select");
    select.addEventListener("change", () => {
        document.querySelector(".p-graph2 svg").innerHTML = "";
        getPiscinsData(select.value);
    })
}

function areSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}