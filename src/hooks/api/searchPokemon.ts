export let allPokemon: {name: string, url: string}[] = [];
export let allTypes: {name: string, pokemon: {pokemon: {name: string, url: string}, slot: number}[]}[] = [];
export let allPokedex: {name: string, pokemon_entries: {entry_number: number, pokemon_species: {name: string, url: string}}[]}[] = [];

export async function setListOfSearchFields(forceUpdate: boolean = false) {
    if(!localStorage.getItem('allPokemon') || forceUpdate) {
        let response = await fetch('https://pokeapi.co/api/v2/pokemon');
        let data = await response.json();
        
        response = await fetch('https://pokeapi.co/api/v2/pokemon?limit='+data.count);
        data = await response.json();
        allPokemon = data.results;
        localStorage.setItem('allPokemon', JSON.stringify(allPokemon));
    } else allPokemon = JSON.parse(localStorage.getItem('allPokemon') || '');

    if(!localStorage.getItem('allTypes') || forceUpdate) {
        let pokemonTypes = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'];

        for(let i = 0; i < pokemonTypes.length; i++) {
            let typeResponse = await fetch('https://pokeapi.co/api/v2/type/'+pokemonTypes[i]);
            let typeData = await typeResponse.json();
            allTypes.push({name: typeData.name, pokemon: typeData.pokemon});
        }

        localStorage.setItem('allTypes', JSON.stringify(allTypes));
    } else allTypes = JSON.parse(localStorage.getItem('allTypes') || '');

    if(!localStorage.getItem('allPokedex') || forceUpdate) {
        let response = await fetch('https://pokeapi.co/api/v2/pokedex');
        let data = await response.json();

        for(let i = 0; i < data.results.length; i++) {
            let pokedexResponse = await fetch(data.results[i].url);
            let pokedexData = await pokedexResponse.json();

            allPokedex.push({name: pokedexData.name, pokemon_entries: pokedexData.pokemon_entries});
        }

        localStorage.setItem('allPokedex', JSON.stringify(allPokedex));
    } else allPokedex = JSON.parse(localStorage.getItem('allPokedex') || '');

    return;
}

export function searchPokemon(name: string = '', types: string[] = [], pokedex: string = 'national') {
    let currentPokedex = allPokedex.find(poke => poke.name === pokedex) || {name: '', pokemon_entries: []};

    let finalResult: {entry_number: number, pokemon_species: {name: string, url: string}}[] = currentPokedex.pokemon_entries;

    if(name) finalResult = finalResult.filter(p => p.pokemon_species.name.includes(name.toLowerCase()));
    if(types.length) {
        let allPokemonWithThisTypes = allTypes.find(type => type.name === types[0])?.pokemon.map(pokemon => pokemon.pokemon.url);
        if(types[1]) {
            allPokemonWithThisTypes = allPokemonWithThisTypes?.filter(typeURL => allTypes.find(t => t.name === types[1])?.pokemon.map(t => t.pokemon.url).includes(typeURL));
        }
        finalResult = finalResult.filter(pokemon => allPokemonWithThisTypes?.includes(pokemon.pokemon_species.url.replaceAll('-species', '')));
    }

    return finalResult;
}