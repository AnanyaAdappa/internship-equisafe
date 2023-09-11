import { NavLink } from "react-router-dom";
import NavMobile from "./NavMobile";

const navigations = [
  {
    name: "HOME",
    path: "/",
  },
  {
    name: "CATEGORIES",
    path: "/projects",
  },
  {
    name: "COMPANIES",
    path: "/companies",
  },
];

export default function NavMenu() {
  return (
    <div className="flex justify-between">
      <nav className="hidden md:ml-auto md:mr-auto md:flex md:flex-wrap md:items-center text-base md:justify-center">
        <ul className="md:flex md:gap-x-8">
          {navigations.map((navigation, index) => (
            <li
              key={index}
              className="mr-5 capitalize transition-all items-center hover:text-accent z-50 font-poppins"
            >
              <NavLink
                to={navigation.path}
                className={(navClass) =>
                  navClass.isActive
                    ? "text-accent font-poppins"
                    : "font-poppins"
                }
              >
                {navigation.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="md:hidden bottom-0 max-w-xs transition-all">
        <NavMobile navigations={navigations} />
      </div>
    </div>
  );
}
