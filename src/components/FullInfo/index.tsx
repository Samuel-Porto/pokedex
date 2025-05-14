import { useEffect, useState } from 'react';
import styles from './FullInfo.module.css';
import { useSelector } from 'react-redux';
import { getFullPokemonInfo } from '../../hooks/api/pokemonApi';
import EvolutionCard from '../EvolutionCard';
import TypeCard from '../TypeCard';
import pokemonCalc from '../../hooks/api/pokemonCalc';
import FetchedImage from '../FetchedImage';

const statsName: {[key: string]: any} = {hp: 'HP', attack: 'ATK', defense: 'DEF', 'special-attack': 'sATK', 'special-defense': 'sDEF', speed: 'SPD'}

function FullInfo() {
    const currentPokemon = useSelector((state: any) => state.currentPokemon.value);
    const [data, setData] = useState<{[key: string]: any} | null>(null);
    const [damages, setDamages] = useState<{[key: string]: number}>({});
    useEffect(() => {
        if(currentPokemon)
            getFullPokemonInfo(currentPokemon)
            .then(data => {
                setData(data);
                setDamages(pokemonCalc(data.types));
            });
    }, [currentPokemon])

    if(!data) return ( <div></div> );
    
    else return ( <div className={`${styles.container} ${currentPokemon? styles.show: styles.hide}`}>
        <section className={styles.main} onClick={e => e.stopPropagation()}>
            <div className={styles['pokemon-image']}>
                <FetchedImage url={data.images.gif || data.images.px || data.images.hd} pixelated={data.images.gif || data.images.px? true: false} />
            </div>
            <div className={styles['main-container']}>
                <h3 className={styles.name}>{data.name.replaceAll('-', ' ')}</h3>
                <span className={styles.id}>{String(data.id).padStart(3, '0')}</span>
                <div className={styles.generation}>
                    <p>{data.generation.replace('generation-', 'Generation ')}</p>
                </div>
                <p className={styles.genera}>{data.genera}</p>
                <ul className={styles.types}>
                    {data.types.map((type: string) => <li key={type}><TypeCard type={type} /></li>)}
                </ul>
                <p className={styles.description}>{data.description.replaceAll(/[^a-zA-Z1-9éÉ., ]/g, ' ')}</p>
                <ul className={styles['body-description']}>
                    <li>{(data.height*.1).toFixed(1)}cM</li>
                    <li>{(data.weight*.1).toFixed(1)}kG</li>
                </ul>
                <ul className={styles.abilities}>
                    {data.abilities.map((abilitie: {name: string, url: string}) => 
                    <li key={abilitie.name}>{abilitie.name.replaceAll('-', ' ')}</li>
                    )}
                </ul>
                <ul className={styles.charts}>
                    <li>
                        <p style={{background: `color-mix(in srgb, ${data.color}, gray)`}}>BH</p>
                        <div><span style={{width: `${data.baseHappiness/255*100}%`, backgroundColor: `color-mix(in srgb, ${data.color}, gray)`}}></span></div>
                    </li>
                    <li>
                        <p style={{background: `color-mix(in srgb, ${data.color}, gray)`}}>CR</p>
                        <div><span style={{width: `${data.captureRate/255*100}%`, backgroundColor: `color-mix(in srgb, ${data.color}, gray)`}}></span></div>
                    </li>
                    {data.stats.map((stat: {name: string, stat: number}) => <li key={stat.name}>
                        <p style={{background: `color-mix(in srgb, ${data.color}, gray)`}}>{statsName[stat.name]}</p>
                        <div><span style={{width: `${stat.stat/255*100}%`, backgroundColor: `color-mix(in srgb, ${data.color}, gray)`}}></span></div>
                    </li>)}
                </ul>
                <ul className={styles.damages}>
                    {Object.keys(damages).map(damageName => damages[damageName] === 4 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                    {Object.keys(damages).map(damageName => damages[damageName] === 2 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                    {Object.keys(damages).map(damageName => damages[damageName] === 1 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                    {Object.keys(damages).map(damageName => damages[damageName] === .5 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                    {Object.keys(damages).map(damageName => damages[damageName] === .25 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                </ul>
                <div className={styles.evolutions}>
                    {data.evolutions.map((evolutionList: {url: string}[], index: number) => 
                    <ul key={index}>
                        {evolutionList.map(evolution => <li key={evolution.url}><EvolutionCard data={evolution} /></li>)}
                    </ul>)}
                </div>
            </div>
        </section>
    </div> );
}

export default FullInfo;