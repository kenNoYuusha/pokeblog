import { useParams, Link ,useNavigate} from "react-router-dom";
import { pokemons } from "../js/arrayPokemon";
const Pokedex = () => {
  const { pokemonName } = useParams();
  const pokeInfo = pokemons.find((pokemon) => pokemon.slug === pokemonName) || {
    slug: pokemonName,
    name: "notFound",
    img: "notFound",
  };

  return (
    <div className="relative w-full h-[85vh] grid place-items-center bg-slate-400 text-slate-900 font-bold text-3xl">
      {/* NAVIGATION */}
      <ul className="absolute top-6 left-6 flex gap-4 text-lg">
        {pokemons.map((pokemon) => (
          <li key={pokemon.slug}>
            <Link to={`/pokedex/${pokemon.slug}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      {!pokemonName && <h2>Bienvenido a la pokedex</h2>}
      {!!pokemonName && pokeInfo.name === "notFound" && (
        <h2>No tenemos a {pokeInfo.slug} en nuestra base de datos</h2>
      )}
      {!!pokemonName && pokeInfo.name !== "notFound" && (
        <PokeInfo pokeInfo={pokeInfo} />
      )}
    </div>
  );
};

const PokeInfo = ({ pokeInfo: { name, type, img } }) => {
  const navigate = useNavigate();
  const getBack = () => {
     navigate('/pokedex');
  }  

  return (
    <div className="w-full h-full flex flex-col items-center gap-8 justify-center">
      <h3>{name}</h3>
      <p>{type}</p>
      <figure className="w-[500px] h-[500px]">
        <img className="w-full h-full object-contain" src={img} alt={name} />
      </figure>
      <button
        className="px-4 py-2 text-xl text-slate-50 bg-orange-700 rounded-md shadow-lg 
                       hover:bg-orange-800 
                       active:bg-orange-900"
        onClick={getBack}
      >
        Get back
      </button>
    </div>
  );
};
export { Pokedex };
