import { HashRouter, Routes, Route } from "react-router-dom";
//PAGES
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Pokedex } from "./pages/Pokedex";
import { Pokemon } from "./pages/Pokemon";
//COMPONENTS

import { PokeDetails } from "./components/PokeDetails";
import { Layer } from "./pages/Layer";
import { PokeInfo } from "./pages/PokeInfo";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layer />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pokemon" element={<Pokemon />}>
            <Route path=":pokemonName" element={<PokeInfo />} />
          </Route>
          <Route path="/pokedex" element={<Pokedex />}>
            <Route path=":pokemonName" element={<PokeDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
export default App;
