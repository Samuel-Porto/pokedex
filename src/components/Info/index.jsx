import axios from 'axios';
import classes from './Info.module.css';
import { useEffect, useState } from 'react';
import colorsAlt from '../../utils/colors_and_alt.json';

let pokemonInfo;

function Info({ id, name, url, changeInfo }) {
    const [isLoading, setIsLoading] = useState(true);
    const [info, setInfo] = useState(null);

    useEffect(() => {
        let sound;
        setIsLoading(true);
        if (id || name|| url) axios.get(url || 'https://pokeapi.co/api/v2/pokemon/'+(id||name))
        .then(res => {
            let data = res.data;
            pokemonInfo = {
                name: data.name,
                id: data.id,
                types: data.types.map(t => t.type.name),
                height: data.height,
                weight: data.weight,
                abilities: data.abilities.map(a => a.ability.name),
                stats: data.stats.map(s => {return {stat: s.stat.name, value: s.base_stat}}),
                images: {
                    gif: data.sprites.versions['generation-v']['black-white'].animated.front_default,
                    png: data.sprites.front_default
                }
            };
            sound = new Audio(data.cries.latest);
            sound.volume = .1;
            return data.species.url;
        })
        .then(speciesUrl => 
            axios.get(speciesUrl)
            .then(species => {
                let data = species.data;
                pokemonInfo = {
                    ...pokemonInfo,
                    description: data.flavor_text_entries.length ? data.flavor_text_entries.find(f => f.language.name === 'en').flavor_text : 'No description'
                };
                return data.evolution_chain.url;
            })
            .then(evolUrl => 
                axios.get(evolUrl)
                .then(res => {
                    let chain = res.data.chain;
                    let evolChain = [chain.species.url];

                    while(chain.evolves_to.length) {
                        chain = chain.evolves_to[0];
                        evolChain.push(chain.species.url);
                    }
                    pokemonInfo = {
                        ...pokemonInfo,
                        evolution_chain: evolChain
                    }
                })
                .finally(() => {
                    let count = 0;
                    pokemonInfo.evolution_chain.forEach((link, index, obj) => {
                        axios.get(link.replace('-species', ''))
                        .then(res => pokemonInfo.evolution_chain[index] = {image: res.data.sprites.front_default, id: res.data.id})
                        .finally(() => {
                            count++;
                            if(count === obj.length) {
                                try {
                                    sound.play();
                                } catch(e) {
                                    console.log('bl')
                                }
                                setIsLoading(false);
                                setInfo(pokemonInfo);
                            }
                        });
                    });
                })
            )
        );
    }, [id, name, url]);

    return ( <div className={`${classes.container} ${isLoading ? classes.loading : null}`}>
        {!isLoading ?
        <>
            <img className={classes.image} src={info.images.gif || info.images.png} alt="" />
            <div className={classes.info}>
                <div>
                    <span className={classes.id}>#{String(info.id).padStart(3, '0')}</span>
                    <h3 className={classes.name}>{info.name}</h3>
                    <ul className={classes.types}>
                        {info.types.map(t => <li style={{background: colorsAlt.type_colors[t]}} key={t}>{t}</li>)}
                    </ul>
                    <div className={classes['body-info_container']}>
                        <div className={classes['body-info_top']}>
                            <p>{(info.height*.1).toFixed(1)}m</p>
                            <p>{(info.weight*.1).toFixed(1)}kG</p>
                        </div>
                        <div className={classes['body-info_bottom']}>
                            {info.abilities.map((a, index) => index < 2 && <p key={index}>{a}</p>)}
                        </div>
                    </div>
                    <h4 className={classes.title}>Description</h4>
                    <p className={classes.description}>{info.description.replace(/[^a-zA-Zà-úÀ-Ú0-9.,]/g, ' ')}</p>
                </div>
                <div>
                    <ul className={classes.evolutions}>
                        {info.evolution_chain.map(e => <li className={e.id === info.id ? classes.current : null} key={e.id} onClick={() => changeInfo(e.id)}><img src={e.image} /></li>)}
                    </ul>
                    <ul className={classes.stats}>
                        {info.stats.map(s => <li key={s.stat}>
                            <div style={{height: s.value > 150 ? 150 : s.value, background: colorsAlt.stats_colors[s.stat]}}><span>{s.value}</span></div>
                            <p>{colorsAlt.alt[s.stat]}</p>
                        </li>)}
                    </ul>
                </div>
            </div>
        </>
            :
            <div></div>
        }
    </div> );
}

export default Info;