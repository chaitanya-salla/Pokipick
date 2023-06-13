const poke_container = document.querySelector(".poke-container");
const pokemon_cont = 200;
const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#F4E7DA",
  rock: "#D5D5D4",
  fairy: "#FCEAFF",
  poison: "#98D7A5",
  bug: "#F8D5A3",
  dragon: "#97B3E6",
  psychic: "#EAEDA1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#f5f5f5",
};

const fetchPokemons = async () => {
  for (let index = 1; index < pokemon_cont; index++) {
    await getPokemon(index);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  createPokeCard(data);
};

const createPokeCard = (pokemon) => {
  const pokeEl = document.createElement("div");
  pokeEl.classList.add("pokemon");
  
  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId= pokemon.id.toString().padStart(3, '0');
  const pokemonType = pokemon.types[0].type.name;

  pokeEl.style.backgroundColor = colors[pokemonType];
  const pokemonInnerHTML = `
    <div class="img-container">
          <img src="${pokemon.sprites.other.home.front_shiny}" alt="${pokemon.name}">
        </div>
        <div class="info">
          <span class="number">#${pokemonId}</span>
          <h3 class="name">${pokemonName}</h3>
          <small class="type">Type: <span>${pokemonType}</span> </small>
    </div>
    `;
    console.log(pokemon.types[0].type.name);
    pokeEl.innerHTML = pokemonInnerHTML;
    poke_container.appendChild(pokeEl);

};

fetchPokemons();
