import damages from './typesDamage.json';

const defaultDamage = {normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1};

export default function pokemonCalc(types: string[]) {
    var newDamages: {[key: string]: any} = {...defaultDamage};

    types.forEach((type) => {
        damages[type as keyof typeof damages].double_damage_from.forEach((damage: string) => newDamages[damage] *= 2);
        damages[type as keyof typeof damages].half_damage_from.forEach((damage: string) => newDamages[damage] *= .5);
        damages[type as keyof typeof damages].no_damage_from.forEach((damage: string) => newDamages[damage] *= 0);
    });

    return newDamages;
}