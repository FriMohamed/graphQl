export async function login(identifier, password) {
    const base64Credentials = btoa(`${identifier}:${password}`);
    const respons = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
        method: "POST",
        headers: {
            "Authorization": `basic ${base64Credentials}`
        }
    });

    if (respons.ok) {
        const token = await respons.json();
        localStorage.setItem('jwt', token);
        setTimeout(() => {
            document.querySelector(".login-container").classList.add("hidden");
            queryData(token);
        }, 100)
    } else {
        document.querySelector(".login-error").classList.remove("hidden");
    }
}

export async function queryData(token, query) {
    const respons = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query: query
        })
    });

    const data = await respons.json();
    // console.log(data);
    
    
    if (data.data) {
        document.querySelector(".profile-section").classList.remove("hidden");
        return data.data
    } else {
        document.querySelector(".login-container").classList.remove("hidden");
    }
}