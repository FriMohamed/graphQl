import { drawCircle, drawText, drawPolyline, drawLine } from "./helpers.js";
import { skills } from "./moduleData.js";
import { cleaners } from "./profile.js";

let offset = 8, start = 0;
export function insial() { start = 0 }
function drawSkillsGraph(svg) {
    let end = start + offset;
    if (end > skills.length) end = skills.length;
    if (end - start == 2) start -= 1;
    else if (end - start == 1) start -= 2;
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    const cx = svgWidth * 0.5;
    const cy = svgHeight * 0.5;
    const r = Math.min(svgWidth, svgHeight) * 0.4;

    drawCircle(svg, cx, cy, r, 1, "black", "none");
    drawCircle(svg, cx, cy, 3, 0, "black", "black");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.35, .2, "black", "none");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.25, .2, "black", "none");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.15, .2, "black", "none");
    drawCircle(svg, cx, cy, Math.min(svgWidth, svgHeight) * 0.05, .2, "black", "none");

    const skillPoints = [];
    for (let i = start; i < end; i++) {
        let skill = skills[i][0].slice(6);
        if (skill.includes("-")) {
            const skillWords = skill.split("-");
            skill = ""
            for (let j = 0; j < skillWords.length; j++) {
                if (j != skillWords.length - 1) {
                    skill += skillWords[j][0] + "-"
                } else skill += skillWords[j][0]
            }
        }

        const percentage = skills[i][1];
        const angle = (i - start) * (360 / (end - start));
        const angleInRadians = (angle - 90) * (Math.PI / 180);

        let xEnd = cx + (r * Math.cos(angleInRadians));
        let yEnd = cy + (r * Math.sin(angleInRadians));
        if (angle == 0) drawText(svg, xEnd - 10, yEnd - 10, skill, 14);
        else if (angle == 180) drawText(svg, xEnd - 10, yEnd + 20, skill, 14);
        else if (angle > 0 && angle < 180) drawText(svg, xEnd + 13, yEnd, skill, 14);
        else drawText(svg, xEnd - skill.length * 10, yEnd, skill, 14);

        drawLine(svg, cx, cy, xEnd, yEnd, "black ", .8)

        const pointRadius = (percentage / 100) * r;
        const pointX = cx + (pointRadius * Math.cos(angleInRadians));
        const pointY = cy + (pointRadius * Math.sin(angleInRadians));
        skillPoints.push(`${pointX}, ${pointY}`);
        drawCircle(svg, pointX, pointY, 3, 0, "black", "black");
    }

    drawPolyline(svg, skillPoints);
}

export function setSkillGraphsEvents() {
    document.getElementById("prevent").addEventListener("click", () => {
        if (start == 0) return
        start -= offset;
        if (start < 0) start = 0;
        document.getElementById("module-skills").innerHTML = "";
        drawSkillsGraph(document.getElementById("module-skills"));
    });

    document.getElementById("next").addEventListener("click", () => {
        if (start >= skills.length) return;
        if (start + offset < skills.length) start += offset;
        document.getElementById("module-skills").innerHTML = "";
        drawSkillsGraph(document.getElementById("module-skills"));
    });

    cleaners.push(() => {
        document.getElementById("prevent").removeEventListener("click", () => {
            start -= offset;
            if (start < 0) start = 0;
            document.getElementById("module-skills").innerHTML = "";
            drawSkillsGraph(document.getElementById("module-skills"));
        });

        document.getElementById("next").removeEventListener("click", () => {
            if (start + offset < skills.length) start += offset;
            document.getElementById("module-skills").innerHTML = "";
            drawSkillsGraph(document.getElementById("module-skills"));
        });
    });
}

export { drawSkillsGraph }