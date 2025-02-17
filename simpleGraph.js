import { drawLine, drawPoint, drawLabel } from "./helpers.js";

export function drawSimpleGraph(data, svg, totaleXp) {
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    const minTime = data[0][2];
    const maxTime = data[data.length - 1][2];

    let Height = 50;
    for(let j = 0; j < 5; j++) {
        drawLine(svg, 20, Height, svgWidth - 20, Height, "#777");
        Height += 80
    }
    
    let cumulXp = 0;
    const lastPointCord = [];
    for (let i = 0; i < data.length; i++) {
        let name = data[i][0];
        let time = data[i][2];
        let pointXp = data[i][1];

        if (data[i][3].includes("checkpoint")) {
            name = "checkpoint";
            const j = i;
            pointXp = 0;
            while (data[i][3].includes("checkpoint")) {
                if (i > 0 && data[i - 1][1] > data[i][1] && i != j) break;
                pointXp += data[i][1];
                time = data[i][2];
                i++;
                if(i == data.length) break
            }
            i--;
        }

        cumulXp += pointXp;
        const xPos = (time - minTime) / (maxTime - minTime) * (svgWidth - 60) + 40;
        const yPos = (svgHeight - 40) - (cumulXp * (svgHeight - 40) / totaleXp) + 10;

        const point = drawPoint(svg, xPos, yPos);
        point.labels = [];

        // XP lebel
        drawLabel(3, yPos + 6, `+${Math.round(pointXp / 1000)}KB`, svg, point, 10);

        // Time lebel
        const month = time.toLocaleString('default', { month: 'short' });
        const day = String(time.getDate()).padStart(2, '0');
        const formattedDate = `${month} ${day}`;
        drawLabel(xPos - 15, svgHeight - 15, formattedDate, svg, point, 10);

        // Project name label
        drawLabel(60, 20, name, svg, point, 16);
        if (i == 0) {
            lastPointCord[0] = xPos;
            lastPointCord[1] = yPos
        } else {
            drawLine(svg, lastPointCord[0], lastPointCord[1], xPos, yPos, "#9959ff", 2)
            lastPointCord[0] = xPos;
            lastPointCord[1] = yPos
        }
    }
}