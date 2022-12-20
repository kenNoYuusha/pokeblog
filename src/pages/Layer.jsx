import { Outlet } from "react-router-dom";
import { PokeNav } from "../components/PokeNav";
import { useEffect, useState } from "react";

const Layer = () => {
  const [isOffline, setIsOffline] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const setOnline = () => {
    setIsOffline(false);
  };
  const setOffline = () => {
    setIsOffline(true);
  };

  useEffect(() => {
    window.addEventListener("offline", setOffline);
    window.addEventListener("online", setOnline);

    return () => {
      window.removeEventListener("offline", setOffline);
      window.removeEventListener("online", setOnline);
    };
  }, []);

  return (
    <div className={`block ${darkMode && "dark"}`}>
      <div className="bg-slate-200 dark:bg-slate-700">
        <PokeNav darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="relative w-full h-auto flex flex-col items-center">
          {isOffline && <Offline />}

          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Offline = () => {
  return (
    <div className="absolute left-1/2 bottom-20 text-3xl p-4 bg-black text-white animate-bounce">
      You're Offline
    </div>
  );
};

export { Layer };
