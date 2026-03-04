//form global variables
let nameInput = document.querySelector("#productos-select");
let priceInput = document.querySelector("#precio-pro");
let stockInput = document.querySelector("#stock-pro");
let descriptionInput = document.querySelector("#des-pro");
let imageInput = document.querySelector("#img-pro");
let btnCreate = document.querySelector(".btn-create");

//add event to the button
btnCreate.addEventListener("click", () => {
    //alert("Producto: " + nameInput.value);
    let dataProduct = getDataProduct();
    sendDataProduct(dataProduct);

});

//function to validate form and get data to backend
let getDataProduct = () => {
    //Validate form data
    let product;
    if(nameInput.value && priceInput.value && stockInput.value && descriptionInput.value){
        product = {
            nombre: nameInput.value,
            precio: priceInput.value,
            stock: stockInput.value,
            descripcion: descriptionInput.value,
           
        }
        nameInput.value = "";
        priceInput.value = "";
        stockInput.value = "";
        descriptionInput.value = "";
    }else{  
        alert("Form is valid");
    }
    console.log(product);
    return product;
};

let sendDataProduct = async (data) => {
    //console.log(data);
    let url = "http://localhost:3000/api/productos";
    try {
        let reply = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (reply.status === 406) {
        alert("Invalid data, please try again");
        return;
    }else{
        let message = await reply.json();
        alert(message.message);
        
    }

} catch (error) {
        console.error(error);
    }
};