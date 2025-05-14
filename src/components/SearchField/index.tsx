import { useEffect, useRef, useState } from 'react';
import styles from './SearchField.module.css';
import { searchPokemon } from '../../hooks/api/searchPokemon';
import TypeCard from '../TypeCard';
import { useDispatch } from 'react-redux';
import { changeCurrent } from '../../features/currentPokemon';

function SearchField() {
    const [showList, setShowList] = useState<boolean>(false);
    const [list, setList] = useState<any[]>([]);
    const listRef = useRef<any>(null);

    const dispatch = useDispatch();

    function handleClickPokemon(url: string) {
        setShowList(false);
        dispatch(changeCurrent(url));
    }

    useEffect(() => {
        window.addEventListener('click', e => {
            if(!listRef.current.contains(e.target)) setShowList(false);
        });
    }, []);

    return ( <div className={styles['search-field']}>
        <div ref={listRef}>
            <input type="text" onClick={() => setShowList(true)} onInput={(e) => setList(searchPokemon(e.currentTarget.value.toLowerCase()))} />
            <span style={{display: showList? 'block': 'none'}}>
                <ul className={styles.results}>
                    {list.map((search: {[key: string]: any}, index) => 
                    {if(index < 10) return <li key={search.name} onClick={() => handleClickPokemon(search.url)}>
                        <p>{search.name.replaceAll('-', ' ')}</p>
                        <ul>
                            {search.types.map((type: string) => 
                            <li key={type}><TypeCard type={type} /></li>)
                            }
                        </ul>
                    </li>})
                    }
                </ul>
            </span>
        </div>
    </div> );
}

export default SearchField;