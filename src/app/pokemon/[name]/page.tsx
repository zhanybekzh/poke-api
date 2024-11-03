import { fetchPokemonDetails } from "@/services/pokemonApi";
import { notFound } from "next/navigation";
import PokemonDetailContent from "@/components/PokemonDetailContent";

interface PokemonDetailProps {
  params: { name: string };
}

const PokemonDetailPage = async ({ params }: PokemonDetailProps) => {
  const { name } = params;
  try {
    const pokemon = await fetchPokemonDetails(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return <PokemonDetailContent name={name} pokemon={pokemon} />;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    notFound();
  }
};

export default PokemonDetailPage;


