const loginBtn = document.getElementById("loginBtn");
const usernameInput = document.getElementById("usernameInput");

loginBtn.addEventListener("click", () => {
    const name = usernameInput.value.trim();

    if(name === "") return;

    localStorage.setItem("currentUser", name);

    window.location.href = "home.html";
});
