const TOKEN_KEY = "aiduc_lms_user_token";

async function login() {
    const email = document.getElementById('formEmail').value;
    const password = document.getElementById('formPassword').value;
    const url = `${BASE_API_URL}/users/login`;

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
    const url = `${BASE_API_URL}/users/me`;

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
    tryInnerHTML("username", respJson.name);
    tryInnerHTML("user_role", respJson.userType);

    // Determines what side menu will load
    if(respJson.userType == "Student")
    {
        document.getElementById("sidebar-nav-student")?.classList.remove('d-none');
        tryInnerHTML("dashboard_type", "Student's Dashboard");
        tryInnerHTML("time-studying-working", "Time studying");
        document.getElementById("df-chat-buble")?.setAttribute("chat-title", "Student's assistant");
        document.getElementById('profile-user-signedin')?.setAttribute('src', '/assets/img/profile-asoka.png');
        tryInnerHTML("breadcrumb-top-index", "Student's Dashboard");
    }
    else
    {
        document.getElementById("sidebar-nav-teacher")?.classList.remove('d-none');
        tryInnerHTML("dashboard_type2", "Teacher's Dashboard");
        tryInnerHTML("time-studying-working", "Time working");
        document.getElementById("df-chat-buble")?.setAttribute("chat-title", "Teacher's assistant");
        document.getElementById('profile-user-signedin')?.setAttribute('src', '/assets/img/profile-luke.png');
        tryInnerHTML("breadcrumb-top-index", "Teacher's Dashboard");
    }
}

function setOffLocalStorage()
{
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
}

function tryInnerHTML(id, value) {
    
    const element = document.getElementById(id);

    if(element)
    {
        element.innerHTML = value;
    }
}