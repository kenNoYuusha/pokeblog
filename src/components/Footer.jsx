import { NavLink } from "react-router-dom";
import { routes } from "../js/arrayRoutes";

const Footer = () => {
  return (
    <footer
      className="flex justify-between items-center px-6 
                     bg-slate-800 text-neutral-50 font-bold text-xl border-t-2 border-neutral-50 rounded-b-lg"
    >
      <p>Copyright Inc.</p>
      <ul className="flex gap-4">
        {routes.map((route) => (
          <li key={route.to}>
            <NavLink
              to={route.to}
              className={({ isActive }) =>
                isActive ? "border-t-2 border-slate-50" : "border-none"
              }
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </footer>
  );
};
export { Footer };
