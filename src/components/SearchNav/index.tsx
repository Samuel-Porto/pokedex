import styles from './styles.module.css';

import { addCheckList } from '../../hooks/getClickOutside';
import { allPokedex, allTypes, searchPokemon } from '../../hooks/api/searchPokemon';
import { FaSearch, FaFire } from "react-icons/fa";
import { IoSunny, IoMoon } from 'react-icons/io5';
import { MdSmartphone } from "react-icons/md";
import { useState } from 'react';
import DropDownButton from '../DropDownButton';
import React, { useEffect, useRef } from 'react';
import ShowIcon from '../ShowIcon';

interface SearchNavProps {returnResult?: Function}

const SearchNav: React.FC<SearchNavProps> = ({returnResult = () => {}}) => {
    const [search, setSearch] = useState<{name: string, types: string[], pokedex: string}>({name: '', types: [], pokedex: ''});
    const [expandSearch, setExpandSearch] = useState<boolean>(true);
    const [theme, setTheme] = useState<boolean>(false);
    const formRef = useRef<any>(null);

    useEffect(() => {addCheckList({element: formRef.current, callback: () => setExpandSearch(false)})}, []);
    useEffect(() => {document.documentElement.classList.toggle('dark')}, [theme]);
    useEffect(() => {
        let results = searchPokemon(search.name, search.types, search.pokedex);
        returnResult(results.map(result => ({name: result.pokemon_species.name, url: result.pokemon_species.url.replaceAll('-species', '')})));
    }, [search]);

    return ( <div className={styles['search_container']}>
        <div className={styles.filters}>
            <DropDownButton
                icon={FaFire}
                list={allTypes.map(type => type.name)}
                selectOption={(types: string[]) => setSearch(prev => ({...prev, types}))}
                amount={2}
                expand={!expandSearch}
            />
            <DropDownButton
                icon={MdSmartphone}
                list={allPokedex.map(pokedex => pokedex.name)}
                preSelect={true}
                selectOption={(pokedex: string[]) => setSearch(prev => ({...prev, pokedex: pokedex[0]}))}
                expand={!expandSearch}
            />
        </div>
        <div className={styles.search} onClick={() => setExpandSearch(true)} ref={formRef} >
            <form
                className={expandSearch? styles.expand: styles.close}
                onSubmit={(e: any) => {e.preventDefault(); setSearch(prev => ({...prev, name: e.target.text.value}))}}
            >
                <input type="text" name='text' autoComplete='off' />
                <span><ShowIcon Icon={FaSearch} size={16} /></span>
            </form>
        </div>
        <div className={styles.theme}>
            <button onClick={() => setTheme(prev => !prev)}><ShowIcon Icon={theme? IoMoon: IoSunny} size={16} /></button>
        </div>
    </div> );
}

export default SearchNav;