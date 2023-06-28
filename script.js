const poke_container = document.querySelector(".poke-container");
const searchBtn = document.querySelector(".search-bar button");
const inputBox = document.querySelector(".search-bar input");
const pokemon_cont = 30;
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
  for (let index = 1; index <= pokemon_cont; index++) {
    await getPokemon(index, "multiple");
  }
};

const getPokemon = async (id, itr) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url)
    .then(async (res) => {
      const data = await res.json();
      if (itr === "multiple") {
        createPokeCard(data);
      } else {
        createSinglePokeCard(data);
      }
    })
    .catch((err) => {
      poke_container.innerHTML = "<h1>No Results Found</h1>";
    });
};

const createSinglePokeCard = async (pokemon) => {
  const pokeEl = document.createElement("div");
  const pokeInfoPopup = document.createElement("dialog");
  pokeEl.classList.add("pokemon");

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;

  const pokeInfo = await pokemonInformation(pokemon.id.toString());
  pokeInfoPopup.id = pokemonId;

  pokeEl.style.backgroundColor = colors[pokemonType];
  poke_container.innerHTML = "";

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

  const popupInner = `
      <div class="container">
        <div class="poki-image">
          <img
          <img src="${pokemon.sprites.other.home.front_shiny}" alt="${pokemon.name}">
        </div>
        <div class="poki-infor">
          <h2>${pokemonName}</h2>
          <p>
            ${pokeInfo.flavor_text_entries[2].flavor_text}
            ${pokeInfo.flavor_text_entries[4].flavor_text}
            ${pokeInfo.flavor_text_entries[7].flavor_text}
          </p>
          <br />
          <h3>Stats</h3>
          <div class="stats">
          <div class="stats-item">
          <span>HP: ${pokemon.stats[0].base_stat}</span>
        </div>

        <div class="stats-item">
          <span>Attack: ${pokemon.stats[1].base_stat}</span>
        </div>

        <div class="stats-item">
          <span>Defence: ${pokemon.stats[2].base_stat}</span>
        </div>

        <div class="stats-item">
          <span>Special-Attack: ${pokemon.stats[3].base_stat}</span>
        </div>

        <div class="stats-item">
          <span>Speed: ${pokemon.stats[5].base_stat}</span>
        </div>
          </div>
        </div>
      </div>
  `;

  pokeInfoPopup.innerHTML = popupInner;
  pokeEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokeEl);
  poke_container.appendChild(pokeInfoPopup);

  pokeEl.addEventListener("click", (e) => {
    const ele = e.target.closest(".pokemon").nextSibling;
    ele.showModal();
  });
};

const createPokeCard = async (pokemon) => {
  const pokeEl = document.createElement("div");
  const pokeInfoPopup = document.createElement("dialog");
  pokeEl.classList.add("pokemon");

  const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;

  const pokeInfo = await pokemonInformation(pokemon.id.toString());
  pokeInfoPopup.id = pokemonId;

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

  const popupInner = `
      <div class="container">
        <div class="poki-image">
          <img
          <img src="${pokemon.sprites.other.home.front_shiny}" alt="${pokemon.name}">
        </div>
        <div class="poki-infor">
          <h2>${pokemonName}</h2>
          <p>
            ${pokeInfo.flavor_text_entries[2].flavor_text}
            ${pokeInfo.flavor_text_entries[4].flavor_text}
            ${pokeInfo.flavor_text_entries[7].flavor_text}
          </p>
          <br />
          <h3>Stats</h3>
          <div class="stats">
            <div class="stats-item">
              <span>HP: ${pokemon.stats[0].base_stat}</span>
            </div>

            <div class="stats-item">
              <span>Attack: ${pokemon.stats[1].base_stat}</span>
            </div>

            <div class="stats-item">
              <span>Defence: ${pokemon.stats[2].base_stat}</span>
            </div>

            <div class="stats-item">
              <span>Special-Attack: ${pokemon.stats[3].base_stat}</span>
            </div>

            <div class="stats-item">
              <span>Speed: ${pokemon.stats[5].base_stat}</span>
            </div>
          </div>
        </div>
      </div>
  `;

  pokeInfoPopup.innerHTML = popupInner;
  pokeEl.innerHTML = pokemonInnerHTML;
  poke_container.appendChild(pokeEl);
  poke_container.appendChild(pokeInfoPopup);

  pokeEl.addEventListener("click", (e) => {
    const ele = e.target.closest(".pokemon").nextSibling;
    ele.showModal();
  });
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userValue = inputBox.value.toLowerCase();
  if (userValue) {
    getPokemon(userValue, "single");
  } else {
    fetchPokemons();
  }
});

const pokemonInformation = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  const data = await fetch(url);
  const dataJson = await data.json();
  return dataJson;
};

fetchPokemons();
