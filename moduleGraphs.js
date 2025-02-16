import { debounce } from "./helpers.js";
import { drawSkillsGraph, radialG } from "./skillGraph.js";
import { drawSimpleGraph } from "./simpleGraph.js";
import { queryData } from "./login.js";

const moduleGraphsQuery = `
    {
	transaction(where:{event: {path: {_eq: "/oujda/module"}} type: {_nregex: "level|up|down"}}) {
    type
    amount
    path
    createdAt
    object{
      name
    }
  }
  
  result (where:{event: {path: {_eq: "/oujda/module"}}}) {
    grade
  }
}
`;

const max = (a, b) => a > b ? a : b
let xpByTimeData = [], skills = new Map(), totaleXp = 0;
async function renderModuleGraphs() {
    xpByTimeData = [];
    skills = new Map();
    totaleXp = 0;
    radialG.start = 0;
    const token = localStorage.getItem("jwt");
    const data = await queryData(token, moduleGraphsQuery);
    data.transaction.forEach(el => {
        if (el.type == "xp") {
            xpByTimeData.push([el.object.name, el.amount, new Date(el.createdAt), el.path]);
            totaleXp += el.amount;
        } else {
            if (skills.has(el.type)) {
                skills.set(el.type, max(skills.get(el.type), el.amount));
            } else skills.set(el.type, el.amount);
        }
    });

    xpByTimeData.sort((a, b) => a[2] - b[2]);
    drawSimpleGraph(xpByTimeData, document.getElementById("module-xpByTime"), totaleXp);
    const skillsArr = [...skills];
    skills = skillsArr.sort((a, b) => b[1] - a[1]);

    document.getElementById("prevent").addEventListener("click",() => {
        radialG.start -= radialG.skillsOffset;
        if (radialG.start < 0) radialG.start = 0;
        document.getElementById("module-skills").innerHTML = "";
        drawSkillsGraph(skills, document.getElementById("module-skills"));
    });

    document.getElementById("next").addEventListener("click",() => {
        if (radialG.start + radialG.skillsOffset < skills.length) radialG.start += radialG.skillsOffset;
        document.getElementById("module-skills").innerHTML = "";
        drawSkillsGraph(skills, document.getElementById("module-skills"));
    });
    drawSkillsGraph(skills, document.getElementById("module-skills"));
    
}



const handleResize = debounce(() => {
    document.getElementById("module-skills").innerHTML = "";
    document.getElementById("module-xpByTime").innerHTML = "";
    drawSimpleGraph(xpByTimeData, document.getElementById("module-xpByTime"), totaleXp);
    drawSkillsGraph(skills, document.getElementById("module-skills"));
}, 300);

window.addEventListener("resize", handleResize);

export { renderModuleGraphs }