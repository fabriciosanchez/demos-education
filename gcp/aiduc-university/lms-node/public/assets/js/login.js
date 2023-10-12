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

    // Dynamically update fields in layout
    document.getElementById("username").innerHTML = respJson.name;
    document.getElementById("user_role").innerHTML = respJson.userType;

    // Determines what side menu will load
    if(respJson.userType == "Student")
    {
        document.getElementById("sidebar-nav-student").classList.remove('d-none');
        document.getElementById("dashboard_type").innerHTML = "Student's Dashboard";
        document.getElementById("breadcrumb-top-index").innerHTML = "Student's Dashboard";
        document.getElementById("time-studying-working").innerHTML = "Time studying";
    }
    else
    {
        document.getElementById("sidebar-nav-teacher").classList.remove('d-none');
        document.getElementById("dashboard_type2").innerHTML = "Teacher's Dashboard";
        document.getElementById("breadcrumb-top-index").innerHTML = "Teacher's Dashboard";
        document.getElementById("time-studying-working").innerHTML = "Time working";
    }
}

function setOffLocalStorage()
{
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
}