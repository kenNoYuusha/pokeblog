import { HashRouter, Routes, Route } from "react-router-dom";
//PAGES
import { Layer } from "./pages/Layer";
import { Home } from "./pages/Home";
import { Pokemon } from "./pages/Pokemon";
import { PokeInfo } from "./pages/PokeInfo";
import { NotFound } from "./pages/NotFound";
//COMPONENTS

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layer />}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<Pokemon />}>
            <Route path=":pokemonName" element={<PokeInfo />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
export default App;
