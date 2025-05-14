import styles from './ToggleTheme.module.css';
import { useState } from 'react';

function ToggleTheme() {
    const [isDark, setIsDark] = useState<boolean>(false);

    const toggleCurrentTheme = () => {
        document.documentElement.classList.toggle('dark');
        document.documentElement.classList.contains('dark')? setIsDark(true): setIsDark(false);
    }

    return ( <div className={styles.toggle} onClick={toggleCurrentTheme}>
        <span className={isDark? styles.on: styles.off}></span>
    </div> );
}

export default ToggleTheme;