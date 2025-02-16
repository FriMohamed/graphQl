import { drawCircle, drawText, drawPolyline, drawLine } from "./helpers.js";

export const radialG = {
    skillsOffset: 8,
    start: 0
}

export function drawSkillsGraph(data, svg) {
    let end = radialG.start + radialG.skillsOffset;
    if (end > data.length) end = data.length;
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    const cx = svgWidth*0.5;
    const cy = svgHeight*0.5;
    const r = Math.min(svgWidth, svgHeight) * 0.40;
    
    drawCircle(svg, cx, cy, r, 1, "black", "none");
    drawCircle(svg, cx, cy, 3, 0, "black", "black");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.35, .2, "black", "none");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.25, .2, "black", "none");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.15, .2, "black", "none");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.05, .2, "black", "none");

    const skillPoints = [];
    for (let i = radialG.start; i < end; i++) {
        let skill = data[i][0].slice(6);
        if (skill.includes("-")) {
            const skillWords = skill.split("-");
            skill = ""
            for (let j = 0; j < skillWords.length; j++) {
                if (j != skillWords.length-1) {
                    skill += skillWords[j][0]+ "-"
                } else skill += skillWords[j][0]
            }
        }

        const percentage = data[i][1];
        const angle = (i - radialG.start) * (360 / (end - radialG.start));
        const angleInRadians = (angle - 90) * (Math.PI / 180);
        
        let xEnd = cx + (r * Math.cos(angleInRadians));
        let yEnd = cy + (r * Math.sin(angleInRadians));
        if (angle == 0) drawText(svg, xEnd-10, yEnd-10, skill, 14);
        else if (angle == 180) drawText(svg, xEnd-10, yEnd+20, skill, 14);
        else if (angle > 0 && angle < 180) drawText(svg, xEnd+13, yEnd, skill, 14);
        else drawText(svg, xEnd-skill.length*10, yEnd, skill, 14);
        
        drawLine(svg, cx, cy, xEnd, yEnd, "black ", .8)
        
        const pointRadius = (percentage / 100) * r;
        const pointX = cx + (pointRadius * Math.cos(angleInRadians));
        const pointY = cy + (pointRadius * Math.sin(angleInRadians));
        skillPoints.push(`${pointX}, ${pointY}`);
        drawCircle(svg, pointX, pointY,3, 0, "black", "black");
    }

    drawPolyline(svg, skillPoints);

}