import { queryData } from "./helpers.js";

const moduleGraphsQuery = `
    {
	transaction(where:{event: {path: {_eq: "/oujda/module"}} type: {_nregex: "level|up|down"}}) {
    type
    amount
    createdAt
    object{
      name
    }
  }
}
`;

let xpByTimeModuleData = [], skills = [], totalModuleXp = 0;
const max = (a, b) => a > b ? a : b;

async function queryModuleData() {
    const token = localStorage.getItem("jwt");
    const skillsMap = new Map();
    const data = await queryData(token, moduleGraphsQuery);
    data.transaction.forEach(el => {
        if (el.type == "xp") {
            xpByTimeModuleData.push([el.object.name, el.amount, new Date(el.createdAt)]);
            totalModuleXp += el.amount;
        } else {
            if (skillsMap.has(el.type)) {
                skillsMap.set(el.type, max(skillsMap.get(el.type), el.amount));
            } else skillsMap.set(el.type, el.amount);
        }
    });

    // sort data by time
    xpByTimeModuleData.sort((a, b) => a[2] - b[2]);

    // sort skills by progress percentage so the skills that u advance in appear first
    skills = [...skillsMap];
    skills.sort((a, b) => b[1] - a[1]);
}

export {queryModuleData, xpByTimeModuleData, skills, totalModuleXp}