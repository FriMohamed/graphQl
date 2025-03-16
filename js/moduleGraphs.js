// import { debounce } from "./helpers.js";
// import { drawSkillsGraph} from "./skillsGraph.js";
// import { drawSimpleGraph } from "./simpleGraph.js";
// import { queryData } from "./login.js";
// import { renderSimpleGraph } from "./piscines.js";





// async function renderModuleGraphs(token) {
//     xpByTimeData = [];
//     skills = new Map();
//     totaleXp = 0;
//     pagination.start = 0;


//     xpByTimeData.sort((a, b) => a[2] - b[2]);
//     drawSimpleGraph(xpByTimeData, document.getElementById("module-xpByTime"), totaleXp);
//     const skillsArr = [...skills];
//     skills = skillsArr.sort((a, b) => b[1] - a[1]);
//     setSkillGraphsEvents();
//     drawSkillsGraph(skills, document.getElementById("module-skills"));

// }

// function setSkillGraphsEvents() {
//     document.getElementById("prevent").addEventListener("click", () => {
//         pagination.start -= pagination.skillsOffset;
//         if (pagination.start < 0) pagination.start = 0;
//         document.getElementById("module-skills").innerHTML = "";
//         drawSkillsGraph(skills, document.getElementById("module-skills"));
//     });

//     document.getElementById("next").addEventListener("click", () => {
//         if (pagination.start + pagination.skillsOffset < skills.length) pagination.start += pagination.skillsOffset;
//         document.getElementById("module-skills").innerHTML = "";
//         drawSkillsGraph(skills, document.getElementById("module-skills"));
//     });
// }

// const handleResize = debounce(() => {
//     if (document.getElementById("profile")) {
//         document.getElementById("module-skills").innerHTML = "";
//         document.getElementById("module-xpByTime").innerHTML = "";
//         document.querySelector(".p-graph2 svg").innerHTML = "";
//         drawSimpleGraph(xpByTimeData, document.getElementById("module-xpByTime"), totaleXp);
//         drawSkillsGraph(skills, document.getElementById("module-skills"));
//         renderSimpleGraph();
//     }
// }, 300);

// window.addEventListener("resize", handleResize);

// export { renderModuleGraphs }