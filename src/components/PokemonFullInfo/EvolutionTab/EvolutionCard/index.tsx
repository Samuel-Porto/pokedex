import styles from './styles.module.css';

import { changeCurrent } from '../../../../features/currentPokemon';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { getBasicPokemonInfo } from '../../../../hooks/api/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import EvolutionDetailsList from './EvolutionDetailsList';
import FetchedImage from '../../../FetchedImage';
import ShowIcon from '../../../ShowIcon';

function EvolutionCard({data}: {data: {[key: string]: any}}) {
    const [info, setInfo] = useState<{[key: string]: any}| null>(null);
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const currentPokemon = useSelector((state: any) => state.currentPokemon.value);
    const dispatch = useDispatch();

    useEffect(() => {
        getBasicPokemonInfo(data.url.replace('-species', ''))
        .then(res => setInfo(res));
    }, []);

    if (!info) return (<div>
    </div>)
    else return ( 
    <div 
        className={`
            ${styles['evolution-card']}
            ${currentPokemon === data.url.replace('-species', '')? styles.current: ''}
            ${showInfo? styles.show: styles.hide}
        `}
    >
        <div className={styles.container}>
            <div className={styles.image} onClick={() => dispatch(changeCurrent(data.url.replace('-species', '')))}>
                <FetchedImage url={info.images.px || info.images.hd} pixelated={info.images.px? true: false}/>
            </div>
            { data.details &&
            <div className={styles.list}>
                <EvolutionDetailsList list={data.details} />
            </div>
            }
        </div>
        {data.details && <span onClick={() => setShowInfo(prev => !prev)}><ShowIcon Icon={showInfo? FaAngleLeft: FaAngleRight} /></span>}
    </div> );
}

export default EvolutionCard;