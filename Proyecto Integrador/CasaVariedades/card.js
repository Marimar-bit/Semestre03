const productos = [

{
nombre: "Organizador de cocina",
precio: 18000,
Estado: "Disponible",
categoria: "hogar",
imagen: "./img/Organizador-Platillero-De-Cocina-8-Puestos.webp"
},

{
nombre: "Collar para perro",
precio: 12000,
categoria: "mascotas",
imagen: "./img/collar.jpg"
},

{
nombre: "Cuaderno universitario",
precio: 8000,
categoria: "papeleria",
imagen: "./img/cuaderno.jpg"
},

{
nombre: "Labial",
precio: 15000,
categoria: "belleza",
imagen: "./img/labial.jpg"
},

{
nombre: "Aretes",
precio: 9000,
categoria: "bisuteria",
imagen: "./img/aretes.jpg"
}

];


const contenedor = document.getElementById("contenedor-productos");


function mostrarProductos(categoria){

contenedor.innerHTML = "";

const filtrados = productos.filter(p => p.categoria === categoria);

filtrados.forEach(producto => {

contenedor.innerHTML += `

<div class="bg-white rounded-xl shadow-lg p-4">

<img src="${producto.imagen}" class="w-full h-40 object-cover rounded">

<h3 class="mt-3 font-semibold text-lg">
${producto.nombre}
</h3>

<p class="text-green-600 font-bold">
$${producto.precio}
</p>

<p>${producto.Estado}</p>

<a href="https://wa.me/573000000000?text=Hola quiero comprar ${producto.nombre}"
class="block text-center mt-3 bg-green-500 text-white py-2 rounded-lg">

Realizar compra
</a>

</div>

`;

});

}


const botones = document.querySelectorAll(".categoria");

botones.forEach(boton => {

boton.addEventListener("click", () => {

const categoria = boton.dataset.categoria;

mostrarProductos(categoria);

});

});