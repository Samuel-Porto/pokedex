export async function getBasicPokemonInfo(pokemon: string | number, getSpeciesUrl: boolean = false) {
    let info: {[key: string]: any} = {};

    let request = await fetch(String(pokemon).includes('pokeapi.co')? String(pokemon): `https://pokeapi.co/api/v2/pokemon/${String(pokemon)}`);
    let data = await request.json();

    info.name = data.name;
    info.id = data.id;
    info.height = data.height;
    info.weight = data.weight;
    info.abilities = data.abilities.map((ability: {[key: string]: any}) => ability.ability);
    info.types = data.types.map((type: {[key: string]: any}) => type.type.name);
    info.images = {
        hd: data.sprites.other['official-artwork'].front_default,
        px: data.sprites.front_default,
        gif: data.sprites.versions['generation-v']['black-white'].animated.front_default,
    };
    info.stats = data.stats.map((stat: {[key: string]: any}) => ({name: stat.stat.name, stat: stat.base_stat}));

    return getSpeciesUrl? {info, url: data.species.url}: info;
}

export async function getFullPokemonInfo(pokemon: string| number) {
    function getEvolutions(chain: {[key: string]: any}) {
        let species: any[] = [[{url: chain.species.url}]]
        let evolutions: any[] = chain.evolves_to.map((evol: {[key: string]: any}) => evol);
        let depth: number = 1;

        while (evolutions.length) {
            let newEvolutions: any[] = [];
            evolutions.forEach((evol: {[key: string]: any}) => {
                species[depth]?
                species[depth].push({
                    url: evol.species.url,
                    details: evol.evolution_details[0]
                }):
                species[depth] = [{
                    url: evol.species.url,
                    details: evol.evolution_details[0]
                }];
                evol.evolves_to.forEach((nextEvol: {[key: string]: any}) => newEvolutions.push(nextEvol));
            });
            depth++;
            evolutions = newEvolutions;
        }

        return species;
    }

    let {info, url} = await getBasicPokemonInfo(pokemon, true);

    let request = await fetch(url);
    let data = await request.json();
    
    info.baseHappiness = data.base_happiness;
    info.captureRate = data.capture_rate;
    info.color = data.color.name;
    info.description = data.flavor_text_entries.find((text: {[key: string]: any}) => text.language.name === 'en').flavor_text;
    info.genera = data.genera.length? data.genera.find((genera: {[key: string]: any}) => genera.language.name === 'en').genus: 'No genera';
    info.generation = data.generation.name;
    info.isLegendary = data.is_legendary;
    info.isMythical = data.is_mythical;
    
    request = await fetch(data.evolution_chain.url);
    data = await request.json();

    info.evolutions = getEvolutions(data.chain);

    return info;
}

export async function loadPokemonList(offset: number, limit: number) {
    let request = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    let data = await request.json();
    return data.results;
}