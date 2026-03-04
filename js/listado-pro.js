let tablaPro = document.querySelector("#table-pro > tbody");
let searchInput = document.querySelector("#search-input");

//evento para detectar cuando cargue la pagina
document.addEventListener("DOMContentLoaded", ()=>{
    getTableData(); //funcion que trae los datos de la BD
})

//funcion asincrona para obtener datos de la BD

async function getTableData() {
    let url = "http://localhost:3000/api/productos"; //peticion de la BD
    try {
        //realizar peticion
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-type" : "aplication/json"
            }
        });

        //validar respuesta
        if(respuesta.status == 204){
            console.log("No hay datos en la BD")
        }else{
            let tableData = await respuesta.json(); //pasa los datos a un formato de origen
            console.log(tableData);
            //agregar datos a local storage
            localStorage.setItem("datosTabla", JSON.stringify(tableData));


            //mostrar datos en la tabla

            tableData.forEach((pro,i) => {
                let = fila = document.createElement("tr");
                fila.innerHTML = `
                <td>${i+1}</td>
                <td> ${pro.nombre}   </td>
                <td>  ${pro.descripcion}  </td>
                <td>  ${pro.precio}  </td>
                <td> ${pro.stock}   </td>
                <td> <img src ="${pro.imagen}" width="50px">  </td>
                <td>  editar - borrar  </td>
                `;
                tablaPro.appendChild(fila);
            });
        }



    } catch (error) {
        console.log(error);
    }
    
};

//function to edit table data
let editDataTable = (id) => {

}
//function to delete table data
let deleteDataTable = (id) => {

}