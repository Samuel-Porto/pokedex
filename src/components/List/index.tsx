import styles from './List.module.css';

import { loadPokemonList } from "../../hooks/api/pokemonApi";
import { useState, useEffect } from "react";

import Card from "../Card";

function List() {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    function loadList(offset: number, limit: number) {
      setIsLoading(true);
      loadPokemonList(offset, offset + limit > 1025? 1025 - offset: limit)
      .then(data => addPokemonToList(data));
    }

    async function addPokemonToList(list: any[]) {
      for (let i = 0; i < list.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setPokemonList(prev => [...prev, list[i]]);
      }
      setIsLoading(false);
    }

    useEffect(() => loadList(0, 60), []);

    return ( <div>
      <ul className={styles.list}>
          {pokemonList.map(pokemon => <li key={pokemon.name}><Card pokemon={pokemon} /></li>)}
      </ul>
      <div className={styles['button-container']}>
        {!isLoading && <button className={styles['button-load']} onClick={() => loadList(pokemonList.length, 60)}>Load more</button>}
      </div>
    </div>
    );
}

export default List;