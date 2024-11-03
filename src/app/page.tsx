import dynamic from 'next/dynamic'

const PokemonList = dynamic(() => import('../components/PokemonList'), { ssr: false })

export default function Home() {
  return (
    <div className="container mt-10 mx-auto mb-10">
      <main>
        <PokemonList />
      </main>
    </div>
  );
}
