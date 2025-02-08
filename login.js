export async function getToken(identifier, password) {
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
            // graphQlEndPoint(token);

        }, 100)
    } else {
        document.querySelector(".login-error").classList.remove("hidden");
    }
}

export async function graphQlEndPoint(token) {
    const respons = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            query: `query {
                        user {
                            login
                        }
                    }`
        })
    });

    console.log(respons);
    

    if (respons.ok) {
        const data = await respons.json();
        document.querySelector(".profile-section").classList.remove("hidden");
        document.querySelector(".user-identification").textContent = data.data.user[0].login
    } else {
        document.querySelector(".login-container").classList.remove("hidden");
    }
}