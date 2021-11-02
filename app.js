const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) =>
  fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
  const elementTypes = types.map(typeInfo => typeInfo.type.name)
  accumulator += `
        <li class="card ${elementTypes[0]}">
          <img class="card-image alt="${name}" src="https://assets.pokemon.com/assets/cms2-pt-br/img/cards/web/SM35/SM35_PT-BR_${id}.png" />
          <h2 class="card-title">${id}.${name}</h2>
          <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>`
  return accumulator
}, '')

const insertPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(insertPokemonsIntoPage)


/*
referencia:
https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2
https://pokeres.bastionbot.org/images/pokemon/
repositorio com imagens pokemons em desenho

https://pokeapi.co/
https://pokedex.org/

Banco de imagens fora do ar, substituido em 01 11 2021 (linha 10)
<img class="card-image alt="${name}" src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" />

*/