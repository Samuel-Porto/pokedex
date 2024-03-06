import { useEffect, useState } from 'react';
import classes from './Card.module.css';
import colorsAlt from '../../utils/colors_and_alt.json';
import axios from 'axios';

function Card( { id, name, url, changeInfo, getInfo, showInfo } ) {
    const [info, setInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(url || 'https://pokeapi.co/api/v2/pokemon/'+(id||name))
        .then(res => {
            let data = res.data;
            setInfo({
                name: data.name,
                id: data.id,
                images: {
                    gif: data.sprites.versions['generation-v']['black-white'].animated.front_default,
                    png: data.sprites.front_default
                },
                types: data.types.map(t => t.type.name),
            });
            setIsLoading(false);
        })
    }, [])
    
    if(isLoading) return ( <div className={classes.container} onClick={() => changeInfo(info.id)}>
    <div className={classes.content}>
        <p className={classes.id}></p>
        <h3 className={classes.name}></h3>
        <ul className={classes.types}>
            <li className={classes.type}></li>
        </ul>
    </div>
</div>
    )

    return ( <div className={`${classes.container} ${getInfo === info.id && showInfo ? classes.current : null}`} onClick={() => changeInfo(info.id)}>
        <img className={classes.image} src={info.images.gif || info.images.png} />
        <div className={classes.content}>
            <p className={classes.id}>#{String(info.id).padStart(3, '0')}</p>
            <h3 className={classes.name}>{info.name}</h3>
            <ul className={classes.types}>
                {
                    info.types.map(t => <li className={classes.type} key={t} style={{ background: colorsAlt.type_colors[t]}}>{t}</li>)
                }
            </ul>
        </div>
    </div> );
}

export default Card;