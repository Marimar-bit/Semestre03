const input = document.getElementById("pokemonInput");
const button = document.getElementById("searchBtn");
const card = document.getElementById("pokemonCard");
const error = document.getElementById("error");

async function buscarPokemon(nombre) {
    try {
        error.classList.add("hidden");
        card.classList.add("hidden");

        const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
        
        if (!respuesta.ok) {
            throw new Error("No encontrado");
        }

        const data = await respuesta.json();

        mostrarPokemon(data);

    } catch (err) {
        error.classList.remove("hidden");
    }
}

function mostrarPokemon(pokemon) {
    const tipos = pokemon.types
        .map(t => `<span>${t.type.name}</span>`)
        .join("");

    const habilidades = pokemon.abilities
        .map(a => `<li>${a.ability.name}</li>`)
        .join("");

    const stats = pokemon.stats
        .map(s => `<p><strong>${s.stat.name}:</strong> ${s.base_stat}</p>`)
        .join("");

    card.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <div class="types">${tipos}</div>

        <div class="stats">
            <h3>Estadísticas:</h3>
            ${stats}
        </div>

        <div>
            <h3>Habilidades:</h3>
            <ul>${habilidades}</ul>
        </div>
    `;

    card.classList.remove("hidden");
}

button.addEventListener("click", () => {
    if (input.value.trim() !== "") {
        buscarPokemon(input.value);
    }
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        buscarPokemon(input.value);
    }
});