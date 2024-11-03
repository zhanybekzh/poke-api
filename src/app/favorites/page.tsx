"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import PokemonItem from "@/components/PokemonItem";

const FavoritesPage = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto">
        <p>No favorite Pokémon yet. Add some!</p>
      </div>
    );
  }

  return (
    <div className="favorites-page container mx-auto">
      <h1 className="text-3xl mt-10 mb-5">Favorite Pokemons</h1>
      <div className="w-[100%] pokemon-list grid gap-4 item mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-4">
        {favorites.map((pokemon) => (
          <PokemonItem key={pokemon.name} pokemonItem={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
