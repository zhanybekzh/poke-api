// services/pokemonApi.ts

const BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (offset: number = 0, limit: number = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPokemonDetails = async (url: string) => {
  try {
    const response = await fetch(`${url}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchPokemonTypes = async () => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/type?limit=50');
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon types');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
