async function cargarImagenes() {
    try {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=10");

        if (!respuesta.ok) {
            throw new Error("Error en la respuesta del servidor");
        }

        const datos = await respuesta.json();

        mostrarImagenes(datos);

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("galeria").innerHTML =
            "<p style='color:red'>No se pudieron cargar las imágenes</p>";
    }
}

function mostrarImagenes(imagenes) {

    const galeria = document.getElementById("galeria");

    galeria.innerHTML = ""; // limpia antes

    imagenes.forEach(imagen => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${imagen.url}" alt="${imagen.title}">
            <h4>ID: ${imagen.id}</h4>
            <p>${imagen.title}</p>

            

        `;

        galeria.appendChild(card);
    });

    const tarjetaTexto = document.createElement("div");
    tarjetaTexto.classList.add("card");

    tarjetaTexto.innerHTML = `
        <h3>Galería creada con API pública aplicando promesas, fetch y async/await</h3>
        <p>El navegador no encuentra el dominio de la API, por eso no cargan las imagenes :p</p>
       
    `;

    galeria.appendChild(tarjetaTexto);



}





cargarImagenes();