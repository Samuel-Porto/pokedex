import styles from './styles.module.css';

import EvolutionCard from './EvolutionCard';

function EvolutionTab({chain}: {chain: []}) {
    return ( <div>
        <div className={styles.evolutions}>
            {chain.map((evolutionList: {url: string}[], index: number) => 
            <ul key={index}>
                {evolutionList.map(evolution => <li key={evolution.url}><EvolutionCard data={evolution} /></li>)}
            </ul>)}
        </div>
    </div> );
}

export default EvolutionTab;