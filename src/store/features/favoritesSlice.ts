import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Pokemon {
  name: string;
  imageUrl: string;
  types: string[];
  abilities: string[];
}

interface FavoritesState {
  favorites: Pokemon[];
}
const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Pokemon>) => {
      if (!state.favorites.find((pokemon) => pokemon.name === action.payload.name)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter((pokemon) => pokemon.name !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
