import styles from './styles.module.css';

function EvolutionDetailsList({list}: {list: any}) {
    return ( <div className={styles.list}>
        <ul>
        {list.map((method: {
            gender: number | null,
            held_item: {name: string} | null,
            item: {name: string} | null,
            known_move: {name: string} | null,
            known_move_type: {name: string} | null,
            location: {name: string} | null,
            min_affection: number | null,
            min_beauty: number | null,
            min_happiness: number | null,
            min_level: number | null, 
            needs_overworld_rain: boolean,
            party_species: {name: string},
            party_type: {name: string} | null,
            relative_physical_stats: number | null,
            time_of_day: string,
            trade_species: {name: string} | null,
            trigger: {name: string} | null,
            turn_upside_down: boolean
        }, index: number) => <li key={index}>
            {method.trigger? <p className={styles.trigger}>{method.trigger.name.replaceAll('-', ' ')}</p>: ''}
            <ul className={styles.requirements}>
                {method.gender? 
                    <li>
                        <p>Gender</p>
                        <span>{method.gender === 1? 'Female': 'Male'}</span>
                    </li>: ''}
                {method.held_item?
                    <li>
                        <p>Held item</p>
                        <span>{method.held_item.name.replaceAll('-', ' ')}</span>
                    </li>: ''}
                {method.item?
                    <li>
                        <p>Item</p>
                        <span>{method.item.name.replaceAll('-', ' ')}</span>
                    </li>: ''}
                {method.known_move?
                    <li>
                        <p>Known move</p>
                        <span>{method.known_move.name.replaceAll('-', ' ')}</span>
                    </li>: ''}
                {method.known_move_type?
                    <li>
                        <p>Known move type</p>
                        <span>{method.known_move_type.name}</span>
                    </li>: ''}
                {method.location?
                    <li>
                        <p>Location</p>
                        <span>{method.location.name.replaceAll('-', ' ')}</span>
                    </li>: ''}
                {method.min_affection?
                    <li>
                        <p>Min affection</p>
                        <span>{method.min_affection}</span>
                    </li>: ''}
                {method.min_beauty?
                    <li>
                        <p>Min beauty</p>
                        <span>{method.min_beauty}</span>
                    </li>: ''}
                {method.min_happiness?
                    <li>
                        <p>Min happiness</p>
                        <span>{method.min_happiness}</span>
                    </li>: ''}
                {method.min_level?
                    <li>
                        <p>Min level</p>
                        <span>{method.min_level}</span>
                    </li>: ''}
                {method.needs_overworld_rain?
                    <li>
                        <p>Needs rain</p>
                    </li>: ''}
                {method.party_species?
                    <li>
                        <p>Pokemon on party</p>
                        <span>{method.party_species.name.replaceAll('-', ' ')}</span>
                    </li>: ''}
                {method.party_type?
                    <li>
                        <p>Type on party</p>
                        <span>{method.party_type.name}</span>
                    </li>: ''}
                {method.relative_physical_stats !== null?
                    <li>
                        <p>
                            {method.relative_physical_stats < 0 && 'attack < defense'}
                            {method.relative_physical_stats === 0 && 'attack = defense'}
                            {method.relative_physical_stats > 0 && 'attack > defense'}
                        </p>
                    </li>: ''}
                {method.time_of_day?
                    <li>
                        <p>Day time</p>
                        <span>{method.time_of_day.replaceAll('-', ' ')}</span>
                    </li>: ''}
                {method.trade_species?
                    <li>
                        <p>Trade with</p>
                        <span>{method.trade_species.name.replaceAll('-', ' ')}</span>
                    </li>: ''}
                {method.turn_upside_down?
                    <li>
                        <p>Turn upside down</p>
                    </li>: ''}
            </ul>
        </li>)}
        </ul>
    </div> );
}

export default EvolutionDetailsList;