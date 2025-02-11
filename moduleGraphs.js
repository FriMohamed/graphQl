import { queryData } from "./login.js";

const moduleGraphsQuery = `
    {
	transaction(where:{event: {path: {_eq: "/oujda/module"}} type: {_neq: "level"}}) {
    type
    amount
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

async function renderModuleGraphs() {
    const token = localStorage.getItem("jwt");
    const data = await queryData(token, moduleGraphsQuery);
    const xpByTimeData = [], ratioByTimeData = [], skills = new Map();
    data.transaction.forEach(el => {
        if (el.type == "xp") {
            xpByTimeData.push([el.object.name, el.amount, new Date(el.createdAt)]);
        } else if (el.type == "up" || el.type == "down") {
            ratioByTimeData.push([el.type, el.amount, new Date(el.createdAt)]);
        } else {
            if (skills.has(el.type)) {
                skills.set(el.type, max(skills.get(el.type), el.amount));
            } else skills.set(el.type, el.amount);
        }
    });
    console.log(skills);
}

export { renderModuleGraphs }