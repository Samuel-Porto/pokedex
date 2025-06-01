import './App.css';

import { changeCurrent } from './features/currentPokemon';
import { setListOfSearchFields } from './hooks/api/searchPokemon';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BottomCard from './components/BottomCard';
import List from './components/List';
import PokemonFullInfo from './components/PokemonFullInfo';

function App() {
  const [allReady, setAllReady] = useState<boolean>(false);

  const currentPokemon = useSelector((state: any) => state.currentPokemon.value);
  const dispatch = useDispatch();

  useEffect(() => {setListOfSearchFields().then(() => setAllReady(true))}, []);

  if(!allReady) return (
  <div className='downloading-info'>
    <img src="./assets/loading/loading.png" alt="" />
    <p>This loading will only happen once...</p>
  </div>)
  return (
    <div className="App">
      <div className='main-container'>
        <main>
          <List />
        </main>
        <aside className={`${currentPokemon? 'show': 'hide'}`}>
          <span onClick={() => dispatch(changeCurrent(null))}></span>
          <div>
            <BottomCard>
              <PokemonFullInfo />
            </BottomCard>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
