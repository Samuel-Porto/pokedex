import styles from './styles.module.css';

function IndicesTab({indices}: {indices: {entry_number: number, pokedex: {name: string, url: string}}[]}) {
    return ( <div className={styles['indices_container']}>
        <ul>
            {indices.map((indice, index) => <li key={indice.pokedex.name}>
                <p>{indice.pokedex.name.replaceAll('-', ' ')}</p>
                <span>{indice.entry_number}</span>
            </li>)}
        </ul>
    </div> );
}

export default IndicesTab;