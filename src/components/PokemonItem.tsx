import React from "react";
import Link from "next/link";

const PokemonItem = ({ pokemonItem }: any) => {
  return (
    <div className="bg-white shadow-md mx-auto rounded-lg p-4 flex flex-col items-center w-[70%] sm:w-[100%]">
      <img
        src={pokemonItem.imageUrl}
        className="w-24 h-24 object-cover mb-4"
        alt={pokemonItem.name}
      />
      <h2 className="text-lg font-semibold text-black">{pokemonItem.name}</h2>
      <p className="text-sm text-gray-500">
        Types: {pokemonItem.types?.join(", ")}
      </p>
      <Link href={`/pokemon/${pokemonItem.name}`} className="text-black hover:underline mt-3 leading-4 flex items-center">about &gt;</Link>
    </div>
  );
};

export default PokemonItem;