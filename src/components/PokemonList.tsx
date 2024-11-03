"use client";

import { useEffect, useState } from "react";
import {
  fetchPokemonList,
  fetchPokemonDetails,
  fetchPokemonTypes,
} from "@/services/pokemonApi";
import PokemonItem from "./PokemonItem";

interface Pokemon {
  name: string;
  url: string;
  types?: string[];
  imageUrl?: string;
}
interface PokemonType {
  name: string;
  url: string;
}

const PokemonList: React.FC = () => {
  const [cachedPokemons, setCachedPokemons] = useState<Pokemon[]>(() => {
    const cachedData = localStorage.getItem("cachedPokemons");
    return cachedData ? JSON.parse(cachedData) : [];
  });

  const [pokemonList, setPokemonList] = useState<Pokemon[]>(cachedPokemons);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(() => {
    const cachedOffset = localStorage.getItem("offset");
    return cachedOffset ? parseInt(cachedOffset, 10) : 0;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [types, setTypes] = useState<PokemonType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

  const limit = 20;

  const loadPokemons = async (currentOffset: number) => {
    setIsLoading(true);
    try {
      const data = await fetchPokemonList(currentOffset, limit);
      const detailedPokemons = await Promise.all(
        data?.results.map(async (pokemon: Pokemon) => {
          const details = await fetchPokemonDetails(pokemon.url);
          return {
            ...pokemon,
            types: details?.types.map((typeInfo: any) => typeInfo.type.name),
            imageUrl: details.sprites.front_default,
          };
        })
      );
      const newCachedPokemons = [...cachedPokemons, ...detailedPokemons];
      setCachedPokemons(newCachedPokemons);
      setPokemonList(newCachedPokemons);
    } catch (error) {
      console.error("Error fetching Pokémon list", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadPokemonTypes = async () => {
      try {
        const data = await fetchPokemonTypes();
        setTypes(data.results);
      } catch (error) {
        console.error("Error fetching Pokémon types", error);
      }
    };
    loadPokemonTypes();
  }, []);

  useEffect(() => {
    if (cachedPokemons.length < offset + limit) {
      loadPokemons(offset);
    } else {
      setPokemonList(cachedPokemons);
    }
  }, []);

  useEffect(() => {
    if (cachedPokemons.length < offset + limit) {
      loadPokemons(offset);
    } else {
      setPokemonList(cachedPokemons);
    }
  }, [offset]);

  useEffect(() => {
    localStorage.setItem("cachedPokemons", JSON.stringify(cachedPokemons));
    localStorage.setItem("offset", offset.toString());
  }, [cachedPokemons, offset]);

  const loadMorePokemons = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) => {
    const matchesSearchTerm = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSelectedType =
      selectedType === "" || pokemon.types?.includes(selectedType);
    return matchesSearchTerm && matchesSelectedType;
  });

  return (
    <>
      <div className="flex gap-1 min-[500px]:gap-3 sm:p-0 mb-4 flex-wrap justify-stretch p-2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search pokemon by name"
          className="mb-2 p-2 border border-gray-300 w-[100%] min-[500px]:mb-0 min-[500px]:w-[300px] text-black rounded-lg"
        />
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className="p-2 border text-black w-[100%] min-[500px]:w-[auto] border-gray-300 rounded-lg"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <div className="w-[100%] pokemon-list grid gap-4 item mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-4">
          {filteredPokemonList.map((pokemon: any) => (
            <PokemonItem key={pokemon.name} pokemonItem={pokemon} />
          ))}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 mx-auto text-center"
          onClick={loadMorePokemons}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </>
  );
};

export default PokemonList;
