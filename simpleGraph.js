import { drawLine, drawPoint, drawLabel } from "./helpers.js";

function areSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

export function drawSimpleGraph(data, svg, totalXp) {
    const svgRect = svg.getBoundingClientRect();
    const graphWidth = svgRect.width;
    const graphHeight = svgRect.height;
    const minTime = data[0][2];
    const maxTime = data[data.length - 1][2];

    let Height = 50;
    for(let j = 0; j < 5; j++) {
        drawLine(svg, 20, Height, graphWidth - 20, Height, "#777");
        Height += 80
    }

    let cumulXp = 0;
    const lastPointCord = [];
    // console.log("start");
    // console.log(data);
    
    
    for (let i = 0; i < data.length; i++) {
        const j = i;// check for the first point

        let name = data[i][0];
        let pointXp = data[i][1];
        let time = data[i][2];

        if (i < data.length - 1 && areSameDay(data[i + 1][2], data[i][2])) {
            pointXp = 0
            while (i < data.length - 1 && areSameDay(data[i + 1][2], data[i][2])) {
                pointXp += data[i][1];
                i++;
            }
            time = data[i][2];
            name = data[i][0];
            pointXp += data[i][1];
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