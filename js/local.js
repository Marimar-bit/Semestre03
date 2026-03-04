//global variables

let userName = document.querySelector("#user-name");
let btnLogout = document.querySelector("#btnLogout");


document.addEventListener("DOMContentLoaded", () => {
    getUser();
});

//function to user put username in navbar
let getUser = () => {
    let user = JSON.parse(localStorage.getItem("userLogin"));
    userName.textContent = user.usuario;
}

//event to logout button
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("userLogin");
    location.href = "login.html";
});