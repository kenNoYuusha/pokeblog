import { HashRouter, Routes, Route } from "react-router-dom";
//PAGES
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { Pokedex } from "./pages/Pokedex";
//COMPONENTS
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <HashRouter>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pokedex" element={<Pokedex />} />
        <Route path="/pokedex/:pokemonName" element={<Pokedex />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </HashRouter>
  );
};
export default App;
