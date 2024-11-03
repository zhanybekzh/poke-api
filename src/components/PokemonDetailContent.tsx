"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addFavorite, removeFavorite } from "@/store/features/favoritesSlice";
import Image from "next/image";

const PokemonDetailContent = ({
  name,
  pokemon,
}: {
  name: string;
  pokemon: any;
}) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const isFavorite = favorites.some((pokemon) => pokemon.name === name);

  const handleFavoriteClick = () => {
    const pokemonData = {
      name: pokemon.name,
      imageUrl: pokemon.sprites.front_default,
      types: pokemon.types.map((type: any) => type.type.name),
      abilities: pokemon.abilities.map((ability: any) => ability.ability.name),
    };
    if (isFavorite) {
      dispatch(removeFavorite(pokemon.name));
    } else {
      dispatch(addFavorite(pokemonData));
    }
  };

  return (
    <div className="max-w-[400px] mx-auto">
      <Link href="/" className="text-white hover:underline">
        &lt; back
      </Link>
      <div className="pokemon-detail bg-white text-black mx-auto rounded-lg p-5 gap-2 mt-5 flex flex-col items-start  min-h-[500px] relative">
        <h1 className="mx-auto font-bold text-2xl">{pokemon.name}</h1>
        <div className="w-[50%] aspect-square flex items-center justify-center mx-auto">
          <Image
            src={pokemon.sprites.front_default}
            alt={`$pokemon {pokemon.name} image`}
            width={300}
            height={150}
            className="w-[100%] object-cover"
          ></Image>
        </div>
        <p>
          <b>Weight:</b> {pokemon.weight}
        </p>
        <p>
          <b>Height:</b> {pokemon.height}
        </p>
        <p>
          <b>Abilities:</b>{" "}
          {pokemon.abilities
            .map((ability: any) => ability.ability.name)
            .join(", ")}
        </p>
        <p>
          <b>Types:</b>{" "}
          {pokemon.types.map((type: any) => type.type.name).join(", ")}
        </p>
        <button
          onClick={handleFavoriteClick}
          className="border-none cursor-pointer bg-none absolute"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#FFD700" : "none"}
            stroke="#FFD700"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PokemonDetailContent;
