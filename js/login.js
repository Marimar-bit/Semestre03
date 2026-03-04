//global variables login form 
const d = document;  
userInput = document.querySelector("#userInput");
passwordInput = document.querySelector("#passwordInput");
btnLogin = document.querySelector(".btn-login");

//event listener for login button
btnLogin.addEventListener("click", function(){
    //alert("You wrote: " + userInput.value + " and " + passwordInput.value);
    let dataForm = getData();
    sendData(dataForm);

});
//function to validate login form and send data to backend
let getData = () => {
    //Validate form data
    let user;
    if(userInput.value && passwordInput.value){
        user = {
            usuario: userInput.value,
            contrasena: passwordInput.value
        }
        userInput.value = "";
        passwordInput.value = "";
    }else{  
        alert("Form is valid");
    }
    console.log(user);
    return user;
};


///function to receive data from backend and validate login
let sendData = async (data) => {
    let url = "http://localhost:3000/api/login";
    try {
        let reply = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (reply.status === 401) {
        alert("Invalid credentials, please try again");
        return;
    }else{
        let userLogin = await reply.json();
        alert("Login successful, welcome " + userLogin.usuario);
        //save data in local storage
        localStorage.setItem("userLogin", JSON.stringify(userLogin));
        location.href = "index.html";

    }

} catch (error) {
        console.error(error);




    }};