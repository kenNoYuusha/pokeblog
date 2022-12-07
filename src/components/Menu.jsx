import { NavLink } from "react-router-dom";
import { routes } from "../js/arrayRoutes";
const Menu = () => {
  return (
    <ul
      className="w-full h-[8vh] flex items-center justify-start gap-8 px-8 font-bold text-xl text-slate-50
               bg-slate-800 border-b-2 border-slate-50"
    >
      {routes.map((route) => (
        <li key={route.to}>
          <NavLink
            to={route.to}
            className={({ isActive }) =>
              isActive ? "py-1 border-b-2 border-slate-50" : "py-1"
            }
          >
            {route.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export { Menu };
