import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "../features/currentPokemon";

export default configureStore({
    reducer: {
        currentPokemon: pokemonSlice
    }
})