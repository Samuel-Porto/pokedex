import styles from './styles.module.css';

import typeColors from './typeColors.json';
import React from 'react';

interface typeCardProps {type: string; damage?: null|number}

const TypeCard: React.FC<typeCardProps> = ({type, damage}) => {
    let colors: {[key: string]: any} = typeColors;

    return ( <div style={{backgroundColor: colors[type]}} className={styles.card}>
        <img src={`assets/typesImage/${type}.png`} />
        <p>{type}</p>
        {damage && <span>{damage}×</span>}
        </div> );
}

export default TypeCard;