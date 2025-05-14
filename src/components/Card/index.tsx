import { MouseEventHandler, useEffect, useState } from 'react';
import styles from './Card.module.css';
import { getBasicPokemonInfo } from '../../hooks/api/pokemonApi';
import TypeCard from '../TypeCard';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrent } from '../../features/currentPokemon';
import FetchedImage from '../FetchedImage';

function Card({pokemon}: {pokemon: {name: string, url: string}}) {
    const [info, setInfo] = useState<{[key: string]: any} | null>(null);
    const currentPokemon = useSelector((state: any) => state.currentPokemon.value);
    const dispatch = useDispatch();

    useEffect(() => {getBasicPokemonInfo(pokemon.url).then(data => setInfo(data))}, []);

    if (!info) return (
        <div className={styles['loading-card']}>
        </div>
    )
    else return ( <div className={`${styles.card} ${currentPokemon === pokemon.url? styles.current: ''}`} onClick={() => dispatch(changeCurrent(pokemon.url))}> 
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