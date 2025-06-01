import styles from './styles.module.css';

import { addCheckList } from '../../hooks/getClickOutside';
import { useEffect, useRef, useState } from 'react';
import ShowIcon from '../ShowIcon';

interface DropDownButtonProps {icon?: any, list: string[], preSelect?: boolean, selectOption: Function, amount?: number, expand?: boolean};

const DropDownButton: React.FC<DropDownButtonProps> = ({icon, list, preSelect = false, selectOption, amount = 1, expand = true}) => {
    const [current, setCurrent] = useState<string[]>(preSelect? [list[0]]: []);
    const [showChoices, setShowChoices] = useState<boolean>(false);
    const dropDownRef = useRef<any>(null);

    function handleClick(item: string) {
        if(!current.includes(item)){
            if(current.length < amount) {
                setCurrent(prev => [...prev, item]);
            } else {
                setCurrent(prev => [...prev.slice(prev.length - amount +1), item])
            }
        }
    }

    useEffect(() => {selectOption(current)}, [current]);
    
    useEffect(() => {
        addCheckList({element: dropDownRef.current, callback: () => setShowChoices(false)});
    }, []);
    
    return ( 
    <div
        className={`${styles['drop-down']} ${expand? styles.expand: styles.close}`}
        ref={dropDownRef}
        onClick={() => setShowChoices(prev => !prev)}
    >
        {icon && <span onClick={() => setShowChoices(false)}><ShowIcon Icon={icon} size={16} /></span>}
        {current && expand && current.map(cur => <p key={cur}>{cur.replaceAll('-', ' ')}</p>)}
        {expand && <ul className={showChoices? styles.show: styles.hide}>
            {list.map((item, index) =>
                <li 
                    style={{transform: showChoices? '': `translateY(-${34 * (index + 1)}px)`}}
                    key={item} 
                    onClick={() => handleClick(item)}>
                        {item.replaceAll('-', ' ')}
                </li>
            )}
            {!preSelect && <li className={styles.reset} onClick={() => setCurrent([])}>Reset</li>}
        </ul>}
    </div> )
}

export default DropDownButton;