import { NavLink } from "react-router-dom";
import { routes } from "../js/arrayRoutes";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs"
export const PokeNav = ({darkMode, setDarkMode}) => {

  const darkModeHandler = () => {
    setDarkMode(dark => !dark)
  }

  return (
    <div className="hidden h-14 justify-between items-center p-4 bg-slate-50 shadow-md text-slate-900
                    dark:bg-zinc-900 dark:text-slate-50          
                    lg:flex"
    >
      <ul
        className="flex gap-x-4"
      >
        {routes.map((route) => (
          <li key={route.to}>
            <NavLink
              to={route.to}
              className={({ isActive }) =>
                isActive ? "py-1 border-b-2 border-slate-900 dark:border-slate-50" : "py-1"
              }
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <button className="text-xl" onClick={darkModeHandler}>{darkMode ? <BsMoonStarsFill /> : <BsSunFill />}</button>
    </div>
  );
};
