const API = "/api";
let token = localStorage.getItem("token") || "";

document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    const msg = document.getElementById("registerMsg");
    msg.textContent = "";

    try {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Register failed");

        msg.textContent = "Registered successfully. Now login.";
        form.reset();
    } catch (err) {
        msg.textContent = err.message;
    }
});


function authHeaders() {
    return token ? { Authorization: `Bearer ${token}` } : {};
}

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    const msg = document.getElementById("loginMsg");
    msg.textContent = "";

    try {
        const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        token = data.token;
        localStorage.setItem("token", token);
        msg.textContent = `Logged in as ${data.user.username} (${data.user.role})`;
    } catch (err) {
        msg.textContent = err.message;
    }
});

document.getElementById("taskForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();

    const msg = document.getElementById("taskMsg");
    msg.textContent = "";

    try {
        const res = await fetch(`${API}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify({ title, description })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Create failed");

        msg.textContent = `Created: ${data.task.title}`;
        form.reset();
    } catch (err) {
        msg.textContent = err.message;
    }
});

document.getElementById("loadTasks").addEventListener("click", async () => {
    const ul = document.getElementById("tasksList");
    ul.innerHTML = "";

    const res = await fetch(`${API}/tasks`, { headers: { ...authHeaders() } });
    const data = await res.json();

    if (!res.ok) {
        ul.innerHTML = `<li>${data.message || "Failed to load"}</li>`;
        return;
    }

    for (const t of data.tasks) {
        const li = document.createElement("li");
        li.textContent = `${t.title} [${t.status}]`;
        ul.appendChild(li);
    }
});
