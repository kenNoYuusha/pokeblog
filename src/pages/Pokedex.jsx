import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllPokemon } from "../api/pokemon";
import { NetworkError } from "../errors/customErrors";
// import { pokemons } from "../js/arrayPokemon";
const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getAllPokemon()
      .then((data) => {
        setPokemons(data.results);
        //console.log(data);
      })
      .catch(handleErrors);
  }, []);

  const handleErrors = (err) => {
    if (err instanceof NetworkError) {
      console.log(err);
    } else {
      console.log(err);
    }
  };

  return (
    <div
      className="grid grid-cols-[1fr_4fr] grid-rows-1  gap-x-4 p-4
                    text-3xl font-bold text-slate-900 bg-slate-100"
    >
      {/* NAVIGATION */}
      <ul className="flex flex-col gap-4 p-4 text-xl bg-slate-300 rounded-lg overflow-y-auto">
        {pokemons.map((pokemon) => (
          <li key={pokemon.name} className="w-full text-center">
            <NavLink
              to={`/pokedex/${pokemon.name}`}
              className={({ isActive }) =>
                isActive
                  ? "block w-full py-2 bg-slate-400"
                  : "block w-full py-2 bg-slate-300"
              }
            >
              {pokemon.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};
export { Pokedex };
