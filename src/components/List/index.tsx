import styles from './styles.module.css';

import { useEffect, useState } from "react";
import Card from "../Card";
import SearchNav from '../SearchNav';

function List() {
    const [pokemonList, setPokemonList] = useState<{name: string, url: string}[]>([]);
    const [limit, setLimit] = useState(60);

    useEffect(() => setLimit(60), [pokemonList]);
    
    return ( <div className={styles['list-container']}>
      <nav className={styles.navigation}>
        <SearchNav returnResult={(results: {name: string, url: string}[]) => {setPokemonList(results)}} />
      </nav>
      <ul className={styles.list}>
          {pokemonList.map((pokemon, index) => index < limit && <li key={pokemon.name}><Card pokemon={pokemon} /></li>)}
      </ul>
      {limit < pokemonList.length && 
        <div className={styles['load-button_container']}>
          <button className={styles['load-button']} onClick={() => setLimit(prev => prev + 60)}>Load more</button>
        </div>
      }
    </div>
    );
}

export default List;