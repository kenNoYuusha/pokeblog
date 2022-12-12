import { Outlet } from "react-router-dom";
import { Menu } from "../components/Menu";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";

const Layer = () => {
  const [isOffline, setIsOffline] = useState(false);

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
    <main className="relative w-full h-screen p-4 grid grid-rows-[8%_85%_7%] grid-cols-1 bg-emerald-500">
      {isOffline && <Offline />}
      <Menu />
      <Outlet />
      <Footer />
    </main>
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
