const pokemonTypes = ['normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];
const allPokemonList: any[] = [];

export function searchPokemon(search: string) {
    let searchResults: any[] = [];
    let allKeys = search.split(' ');
    allKeys.forEach((key, index) => {
        if(key && index === 0) {
            searchResults = allPokemonList.filter(pokemon => pokemon.name.includes(key) || pokemon.types.findIndex((type: string) => type.includes(key)) !== -1);
        } else if(key) {
            searchResults = searchResults.filter(pokemon => pokemon.name.includes(key) || pokemon.types.findIndex((type: string) => type.includes(key)) !== -1);
        }
    });

    return searchResults;
}

async function getPokemonList() {
    pokemonTypes.forEach((type: string) => {
        fetch(`https://pokeapi.co/api/v2/type/${type}/`)
        .then(response => response.json())
        .then((data: {[key: string]: any}) => {
            data.pokemon.forEach((pokemon: {[key: string]: any}) => {
                const pokemonIndex: number = allPokemonList.findIndex(pokemonOnList => pokemonOnList.name === pokemon.pokemon.name);
                if(pokemonIndex === -1) {
                    allPokemonList.push({name: pokemon.pokemon.name, url: pokemon.pokemon.url, types: [type]});
                } else {
                    allPokemonList[pokemonIndex].types.push(type);
                }
            })
        })
    });
}

getPokemonList();