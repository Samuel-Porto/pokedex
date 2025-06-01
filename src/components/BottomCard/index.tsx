import styles from './styles.module.css';

import React from 'react';

interface BottomCardProps {icon?: string, children?: React.ReactNode};

const BottomCard: React.FC<BottomCardProps> = ({icon, children}) => {
    return ( <div className={styles['bottom-card']}>
        {children}
    </div> );
}

export default BottomCard;