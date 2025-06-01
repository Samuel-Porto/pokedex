import styles from './styles.module.css';

import { changeCurrent } from '../../features/currentPokemon';
import { getBasicPokemonInfo } from '../../hooks/api/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import FetchedImage from '../FetchedImage';
import TypeCard from '../TypeCard';

function Card({pokemon}: {pokemon: {name: string, url: string}}) {
    const [info, setInfo] = useState<{[key: string]: any} | null>(null);
    const currentPokemon = useSelector((state: any) => state.currentPokemon.value);
    const dispatch = useDispatch();

    useEffect(() => {getBasicPokemonInfo(pokemon.url.replaceAll('-species', '')).then(data => setInfo(data))}, []);

    if (!info) return (
        <div className={styles['loading-card']}>
        </div>
    )
    else return ( 
    <div
        className={`${styles.card} ${currentPokemon === pokemon.url? styles.current: ''}`}
        onClick={() => dispatch(changeCurrent(pokemon.url.replaceAll('-species', '')))}
    > 
        <div className={styles.image}>
            <FetchedImage url={info.images.px || info.images.hd} pixelated={info.images.px? true: false} />
        </div>
        <span>{String(info.id).padStart(3, '0')}</span>
        <p>{info.name.replaceAll('-', ' ')}</p>
        <ul>
            {info.types.map((type: string) => <li key={type}><TypeCard type={type} /></li>)}
        </ul>
    </div> );
}

export default Card;