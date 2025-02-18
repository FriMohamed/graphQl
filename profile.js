import { debounce } from "./helpers.js";
import { queryModuleData, xpByTimeModuleData, totalModuleXp } from "./moduleData.js";
import { queryUserInfo, renderUserInfo } from "./overViewData.js";
import { queryPeiscineData, renderPiscineInfo, selectEvent, totalPiscineXp, xpByTimePiscineData } from "./piscineData.js";
import { drawSimpleGraph } from "./simpleGraph.js";
import { drawSkillsGraph } from "./skillsGraph.js";

export async function renderProfile() {
    await queryUserInfo();
    renderUserInfo();

    await queryModuleData();
    drawSimpleGraph(xpByTimeModuleData, document.getElementById("module-xpByTime"), totalModuleXp);
    drawSkillsGraph(document.getElementById("module-skills"));

    await queryPeiscineData("piscine-go");
    renderPiscineInfo();
    drawSimpleGraph(xpByTimePiscineData, document.querySelector(".p-graph2 svg"), totalPiscineXp);
    resizing();
    selectEvent();
}


function resizing() {
    const handleResize = debounce(() => {
        if (document.getElementById("profile")) {
            document.getElementById("module-skills").innerHTML = "";
            document.getElementById("module-xpByTime").innerHTML = "";
            document.querySelector(".p-graph2 svg").innerHTML = "";
            drawSkillsGraph(document.getElementById("module-skills"));
            drawSimpleGraph(xpByTimeModuleData, document.getElementById("module-xpByTime"), totalModuleXp);
            drawSimpleGraph(xpByTimePiscineData, document.querySelector(".p-graph2 svg"), totalPiscineXp);
        }
    }, 300);

    window.addEventListener("resize", handleResize);
}