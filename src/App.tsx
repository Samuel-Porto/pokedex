import './App.css';
import List from './components/List';
import SearchField from './components/SearchField';
import { useSelector, useDispatch } from 'react-redux';
import { changeCurrent } from './features/currentPokemon';
import FullInfo from './components/FullInfo';
import ToggleTheme from './components/ToggleTheme';
import pokemonCalc from './hooks/api/pokemonCalc';

pokemonCalc(['electric', 'fire']);

function App() {
  const currentPokemon = useSelector((state: any) => state.currentPokemon.value);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <div className='main-container'>
        <nav>
          <SearchField />
          <ToggleTheme />
        </nav>
        <main>
          <List />
        </main>
        <aside
          className={`${currentPokemon? 'show': 'hide'}`}
          onClick={() => dispatch(changeCurrent(null))}>
          <FullInfo />
        </aside>
      </div>
    </div>
  );
}

export default App;
