import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Card from './components/Card';
import Info from './components/Info';

let pokemonList;

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentId, setCurrentId] = useState(0);
  const [searchInfo, setSearchInfo] = useState('');
  const [cardsLimit, setCardsLimit] = useState(20);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1025')
    .then(res => pokemonList = res.data.results)
    .catch(e => console.log(e))
    .finally(() => setIsLoading(false))
  }, []);

  useEffect(() => {
    if(currentId) setShowInfo(true);
  }, [currentId]);

  function changeInfo(id) {
    setCurrentId(id);
    setShowInfo(true);
  }
  
  if(isLoading) return <div></div>

  return (
    <div className="App">
      <input type='text' className='search-bar' placeholder='Search pokemon by name' onChange={e => setSearchInfo(e.target.value)}/>
      <ul className='cards-list' onScroll={e => {if(e.target.scrollTop === (e.target.scrollHeight - e.target.offsetHeight)) setCardsLimit(cardsLimit + 20)}}>
        {pokemonList.filter(i => i.name.includes(searchInfo.toLowerCase()))
        .map((pokemon, index) => index < cardsLimit && 
          <li key={pokemon.name}>
            <Card changeInfo={changeInfo} url={pokemon.url} getInfo={currentId} showInfo={showInfo} />
          </li>
          )
        }
      </ul>
      <div className={`info ${showInfo ? '' : 'hide'}`}>
        <span className={`info-bg ${showInfo ? '' : 'hide'}`} onClick={() => setShowInfo(false)}></span>
        <Info id={currentId} changeInfo={setCurrentId}/>
      </div>
    </div>
  );
}

export default App;
