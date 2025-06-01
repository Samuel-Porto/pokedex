import styles from './styles.module.css';

import { getFullPokemonInfo } from '../../hooks/api/pokemonApi';
import { GiWeight, GiBodyHeight } from 'react-icons/gi';
import { IoMdMale, IoMdFemale } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EvolutionTab from './EvolutionTab';
import FetchedImage from '../FetchedImage';
import IndicesTab from './IndicesTab';
import MovesTab from './MovesTab';
import pokemonCalc from '../../hooks/api/pokemonCalc';
import ShowIcon from '../ShowIcon';
import TypeCard from '../TypeCard';

const statsName: {[key: string]: any} = {hp: 'HP', attack: 'ATK', defense: 'DEF', 'special-attack': 'sATK', 'special-defense': 'sDEF', speed: 'SPD'};

function PokemonFullInfo() {
    const [data, setData] = useState<{[key: string]: any} | null>(null);
    const [damages, setDamages] = useState<{[key: string]: number}>({});
    const [currentTab, setCurrentTab] = useState<string>('evolutions');
    const currentPokemon = useSelector((state: any) => state.currentPokemon.value);

    useEffect(() => {
        if(currentPokemon)
            getFullPokemonInfo(currentPokemon)
            .then(data => {
                setData(data);
                setDamages(pokemonCalc(data.types));
                console.log(data.genderRate)
            });
    }, [currentPokemon]);

    if(!data) return ( <div></div> );
    
    else return ( <>
            <div className={styles.image}>
                <FetchedImage url={data.images.gif || data.images.px || data.images.hd} pixelated={data.images.gif || data.images.px? true: false} />
            </div>
            <div className={styles['main-container']}>
                <div className={styles.main}>
                    <h3 className={styles.name}>{data.name.replaceAll('-', ' ')}</h3>
                    <ul className={styles['special-titles']}>
                        {data.isLegendary && <li className={styles.legendary}>Legendary</li>}
                        {data.isMythical && <li className={styles.mythical}>Mythical</li>}
                    </ul>
                    <span className={styles.id}>{String(data.id).padStart(3, '0')}</span>
                    <div className={styles.generation}>
                        <p>{data.generation.replace('generation-', 'Generation ')}</p>
                    </div>
                    <p className={styles.genera}>{data.genera}</p>
                    <span className={styles.gender}>
                        {data.genderRate < 0?
                            'No gender':
                            <>
                            <p>
                                <ShowIcon Icon={IoMdFemale} size={16} /> {data.genderRate * (100/8)}%
                            </p>
                            <p>
                                <ShowIcon Icon={IoMdMale} size={16} /> {(8 - data.genderRate) * (100/8)}%
                            </p>
                            </>
                        }</span>
                    <ul className={styles.types}>
                        {data.types.map((type: string) => <li key={type}><TypeCard type={type} /></li>)}
                    </ul>
                    <p className={styles.description}>{data.description.replaceAll(/[^a-zA-Z1-9éÉ., ]/g, ' ')}</p>
                    <ul className={styles['body-description']}>
                        <li>
                            <p>{(data.height*.1).toFixed(1)}M</p>
                            <ShowIcon Icon={GiBodyHeight} size={20} />
                        </li>
                        <li>
                            <p>{(data.weight*.1).toFixed(1)}kG</p>
                            <ShowIcon Icon={GiWeight} size={20} />
                        </li>
                    </ul>
                    <ul className={styles.abilities}>
                        {data.abilities.map((abilitie: {name: string, url: string}) => 
                        <li key={abilitie.name}>{abilitie.name.replaceAll('-', ' ')}</li>
                        )}
                    </ul>
                    <ul className={styles.charts}>
                        <li>
                            <p style={{background: `color-mix(in srgb, ${data.color}, gray)`}}>BH</p>
                            <div>
                                <span style={{width: `${data.baseHappiness/255*100}%`, backgroundColor: `color-mix(in srgb, ${data.color}, gray)`}}></span>
                                <p>{data.baseHappiness}</p>
                            </div>
                        </li>
                        <li>
                            <p style={{background: `color-mix(in srgb, ${data.color}, gray)`}}>CR</p>
                            <div>
                                <span style={{width: `${data.captureRate/255*100}%`, backgroundColor: `color-mix(in srgb, ${data.color}, gray)`}}></span>
                                <p>{data.captureRate}</p>
                            </div>
                        </li>
                        {data.stats.map((stat: {name: string, stat: number}) => <li key={stat.name}>
                            <p style={{background: `color-mix(in srgb, ${data.color}, gray)`}}>{statsName[stat.name]}</p>
                            <div>
                                <span style={{width: `${stat.stat/255*100}%`, backgroundColor: `color-mix(in srgb, ${data.color}, gray)`}}></span>
                                <p>{stat.stat}</p>
                            </div>
                        </li>)}
                    </ul>
                    <ul className={styles.damages}>
                        {Object.keys(damages).map(damageName => damages[damageName] === 4 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                        {Object.keys(damages).map(damageName => damages[damageName] === 2 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                        {Object.keys(damages).map(damageName => damages[damageName] === 1 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                        {Object.keys(damages).map(damageName => damages[damageName] === .5 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                        {Object.keys(damages).map(damageName => damages[damageName] === .25 && <li key={damageName}><TypeCard type={damageName} damage={damages[damageName]} /></li>)}
                    </ul>
                    <ul className={styles.tabs}>
                        <li className={`${currentTab === 'evolutions'? styles.current: ''}`} onClick={() => setCurrentTab('evolutions')}>Evolutions</li>
                        <li className={`${currentTab === 'indices'? styles.current: ''}`} onClick={() => setCurrentTab('indices')}>Indices</li>
                        <li className={`${currentTab === 'moves'? styles.current: ''}`} onClick={() => setCurrentTab('moves')}>Moves</li>
                    </ul>
                    <section>
                        {currentTab === 'evolutions' && <EvolutionTab chain={data.evolutions} />}
                        {currentTab === 'indices' && <IndicesTab indices={data.indices} />}
                        {currentTab === 'moves' && <MovesTab moves={data.moves} />}
                    </section>
                </div>
            </div> 
        </> );
}

export default PokemonFullInfo;