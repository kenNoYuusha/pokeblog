import { HashRouter, Routes, Route } from "react-router-dom";
//PAGES
import { Layer } from "./pages/Layer";
import { Home } from "./pages/Home";
import { Pokemon } from "./pages/Pokemon";
import { PokemonDetails } from "./pages/PokemonDetails";
import { NotFound } from "./pages/NotFound";
//COMPONENTS

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layer />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Pokemon />}>
            <Route path=":pokemonName" element={<PokemonDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
export default App;
