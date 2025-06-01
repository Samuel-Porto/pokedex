import styles from './styles.module.css';

import { FaCrosshairs, FaExplosion } from 'react-icons/fa6';
import { FiTarget } from 'react-icons/fi';
import { GiSpikes, GiYinYang } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import ShowIcon from '../../../ShowIcon';
import TypeCard from '../../../TypeCard';

function MoveCard({move}: {move: {move: {name: string, url: string}, version_group_details: {[key: string]: any}[]}}) {
    const [expand, setExpand] = useState<boolean>(false);
    const [info, setInfo] = useState<any>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [allLearnMethods, setAllLearnMethods] = useState<string[]>([]);
    const [groupDetailsList, setGroupDetailsList] = useState<{name: string, details: {level: number, versions: string[]}[]}[]>([]);

    function handleClick() {
        setExpand(prev => !prev);
        if(!info && !isLoading) {
            setIsLoading(true);
            fetch(move.move.url)
            .then(data => data.json())
            .then(data => {
                setInfo(data);
                setIsLoading(false);
            });
        }
    }

    useEffect(() => {
        let learnMethods: string[] = [];
        move.version_group_details.forEach((detail: any) => {
            !learnMethods.find(method => method === detail.move_learn_method.name) && learnMethods.push(detail.move_learn_method.name);
        });
        setAllLearnMethods(learnMethods);

        let groupDetails: {name: string, details: {level: number, versions: string[]}[]}[] = [];

        learnMethods.forEach(method => {
            move.version_group_details.filter((detail) => detail.move_learn_method.name === method).forEach(detail => {
                let findMethodList = groupDetails.find(g => g.name === method);
                if(findMethodList) {
                    let findSameLevel = findMethodList.details.find(l => l.level === detail.level_learned_at);
                    findSameLevel?
                        findSameLevel.versions.push(detail.version_group.name):
                        findMethodList.details.push({level: detail.level_learned_at, versions: [detail.version_group.name]});
                } else groupDetails.push({name: method, details: [{level: detail.level_learned_at, versions: [detail.version_group.name]}]})
            });
        });
        setGroupDetailsList(groupDetails);
    }, []);

    return ( 
    <div className={`${styles['move_container']} ${expand? styles.expand: styles.hide}`}>
        <div className={styles['name_container']} onClick={() => handleClick()}>
            <span>
            {info && <>
                <TypeCard type={info.type.name} />
                {info.damage_class.name === 'physical' && <ShowIcon Icon={GiSpikes} size={24} />}
                {info.damage_class.name === 'special' && <ShowIcon Icon={FiTarget} size={24} />}
                {info.damage_class.name === 'status' && <ShowIcon Icon={GiYinYang} size={24} />}
            </>}
            </span>
            <p>{move.move.name.replaceAll('-', ' ')}</p>
            <ul>
                {allLearnMethods.map(method => <li key={method}>{method.replaceAll('-', ' ')}</li>)}
            </ul>
        </div>
        {info ?
         <section>
            <div className={styles.texts}>
                <p>Entrie: {info.flavor_text_entries.length? info.flavor_text_entries.find((text: {language: {name: string}}) => text.language.name === 'en').flavor_text: 'No entrie text'}</p>
                <p>Effect: {info.effect_entries.length? info.effect_entries.find((text: {language: {name: string}}) => text.language.name === 'en').effect: 'No effect text'}</p>
            </div>
            <ul className={styles.groups}>
                {groupDetailsList.map(group =>
                <li key={group.name}>
                    <p>{group.name.replaceAll('-', ' ')}</p>
                    <ul className={styles['list-group']}>
                        {group.details.map(detail => 
                        <li key={detail.level}>
                            {detail.level? <p>Level: {detail.level}</p>: ''}
                            <ul className={styles['versions-list']}>
                                {detail.versions.map((version, index) => <li key={index}>{version.replaceAll('-', ' ')}</li>)}
                            </ul>
                        </li>
                        )}
                    </ul>
                </li>
                )}
            </ul>
            <ul className={styles.details}>
                <li>
                    <p>Contest type</p>
                    <span>{info.contest_type? info.contest_type.name.replaceAll('-', ' '): 'No contest type'}</span>
                </li>
                <li>
                    <p>Target</p>
                    <span>{info.target.name.replaceAll('-', ' ')}</span>
                </li>
            </ul>
            <ul className={styles.status}>
                <li>
                    <span><ShowIcon Icon={FaCrosshairs} size={14} /></span>
                    <p>{info.accuracy || '--'}</p>
                </li>
                <li>
                    <span>PP</span>
                    <p>{info.pp || '--'}</p>
                </li>
                <li>
                    <span><ShowIcon Icon={FaExplosion} size={14} /></span>
                    <p>{info.power || '--'}</p>
                </li>
            </ul>
         </section>:
         <section>
            loading...
        </section>
        }

    </div> );
}

export default MoveCard;