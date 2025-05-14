import styles from './EvolutionCard.module.css';

import { useEffect, useState } from 'react';
import { getBasicPokemonInfo } from '../../hooks/api/pokemonApi';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrent } from '../../features/currentPokemon';
import { TbArrowBigUpFilled, TbArrowsExchange } from 'react-icons/tb';
import FetchedImage from '../FetchedImage';
import { isUndefined } from 'node:util';

function EvolutionCard({data}: {data: {[key: string]: any}}) {
    const currentPokemon = useSelector((state: any) => state.currentPokemon.value);
    const dispatch = useDispatch();

    const [info, setInfo] = useState<{[key: string]: any}| null>(null);
    const [itemImage, setItemImage] = useState<string|null>(null);

    function setEvolutionDetails() {
        let detailHTML = <></>;
        switch (data.details.trigger.name) {
            case 'level-up':
                detailHTML =
                <> 
                    {// @ts-ignore
                    <TbArrowBigUpFilled />
                    }
                    <p>{data.details.min_level || 'Other'}</p>
                </>
                break;
            case 'use-item':
                getItem(data.details.item);
                detailHTML = 
                <>
                    <img src={itemImage || undefined} alt="" />
                    <p>{data.details.item.name.replaceAll('-', ' ')}</p>
                </>
                break;
            case 'trade':
                detailHTML = 
                <>
                    {// @ts-ignore
                    <TbArrowsExchange />
                    }
                    <p>Trade</p>
                </>
                break;
            default:
                detailHTML =
                <p>{data.details.trigger.name.replaceAll('-', ' ')}</p>
        return detailHTML;
        }

        function getItem(item: {name: string, url: string}) {
            fetch(item.url).then(data => data.json())
            .then(data => setItemImage(data.sprites.default));
        }

        return detailHTML;
    }

    useEffect(() => {
        getBasicPokemonInfo(data.url.replace('-species', ''))
        .then(res => setInfo(res));
    }, []);

    if (!info) return (<div>

    </div>)
    else return ( 
    <div 
        onClick={() => dispatch(changeCurrent(data.url.replace('-species', '')))}
        className={`${styles['evolution-card']} ${currentPokemon === data.url.replace('-species', '')? styles.current: ''}`}
    >
        {data.details && 
        <span className={styles['evolution-details']}>
        {
            setEvolutionDetails()
        }
        </span>}
        <div className={styles.image}>
            <FetchedImage url={info.images.px || info.images.hd} pixelated={info.images.px? true: false}/>
        </div>
    </div> );
}

export default EvolutionCard;