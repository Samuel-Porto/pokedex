import { createSlice } from "@reduxjs/toolkit";

export const currentPokemon = createSlice({
    name: 'currentPokemon',
    initialState: {
        value: ''
    },
    reducers: {
        changeCurrent: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { changeCurrent } = currentPokemon.actions;
export default currentPokemon.reducer;