import styles from './styles.module.css';

import { useEffect, useState } from 'react';
import MoveCard from './MoveCard';

function MovesTab({moves}: {moves: {move: {name: string, url: string}, version_group_details: {[key: string]: any}[]}[]}) {
    
    const [moveList, setMoveList] = useState<typeof moves>(moves);
    const [currentFilter, setCurrentFilter] = useState<string>('');
    const allMethods: string[] = ['level-up', 'egg', 'tutor', 'machine', 'stadium-surfing-pikachu', 'light-ball-egg', 'colosseum-purification', 'xd-shadow', 'xd-purification', 'form-change', 'zygarde-cube'];

    function filterListByMethod(method: string) {
        let filter = method? 
            moves.filter(move => move.version_group_details.find(version => version.move_learn_method.name === method)):
            moves;
        setMoveList(filter);
    }

    useEffect(() => filterListByMethod(currentFilter), [currentFilter]);
    useEffect(() => {
        setMoveList(moves);
        setCurrentFilter('');
    }, [moves]);

    return ( 
        <div>
            <ul className={styles['filter-list']}>
                {allMethods.map(method => 
                <li
                    key={method}
                    onClick={() => setCurrentFilter(method === currentFilter? '': method)}
                    className={currentFilter === method? styles.current: ''}
                >
                    {method.replaceAll('-', ' ')}
                </li>)}
            </ul>
            <ul>
                {moveList.map(move => <li key={move.move.name}><MoveCard move={move} /></li>)}
            </ul>
        </div>
     );
}

export default MovesTab;