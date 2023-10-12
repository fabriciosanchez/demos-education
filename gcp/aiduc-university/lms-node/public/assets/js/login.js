const TOKEN_KEY = "aiduc_lms_user_token";

async function login() {
    const email = document.getElementById('formEmail').value;
    const password = document.getElementById('formPassword').value;
    const url = "http://localhost:3002/users/login";

    if(email === "" || email === null) {
        return;
    }

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ "email": email, "password": password })
    });

    const resJson = await response.json();

    if(!response.ok)
    {
        alert(resJson.message);
    }
    else
    {
        setLocalStorage(TOKEN_KEY, resJson.token);
        window.location.href = "/";
    }
}

function setLocalStorage(name, value)
{
    localStorage.setItem(name, value);
}

async function checkUser() {
    const url = "http://localhost:3002/users/me";
    const token = localStorage.getItem(TOKEN_KEY);
    if(!token)
    {
        window.location.href = "/login"
    }

    const response = await fetch(url, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });
    const respJson = await response.json();
    if(!response.ok)
    {
        alert(respJson.message);
        window.location.href = "/login"
    }
    console.log(respJson);
    document.getElementById("username").innerHTML = respJson.name
}

function setOffLocalStorage()
{
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
}