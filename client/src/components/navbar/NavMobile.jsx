import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgMenuRight, CgClose } from "react-icons/cg";

export default function NavMobile({ navigations }) {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative text-left">
        <button
          tabIndex={0}
          type="button"
          className="flex justify-center text-3xl font-medium text-gray-700 hover:text-gray-900 transition"
          id="menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setMobileNav(!mobileNav)}
        >
          {mobileNav ? <CgClose /> : <CgMenuRight />}
        </button>
        {mobileNav && (
          <div
            className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 z-50 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <ul className="py-1">
              {navigations.map((navigation, index) => (
                // Include index as the second argument
                <li key={index}>
                  <Link
                    to={navigation.path}
                    className="mobile-item"
                    onClick={() => setMobileNav(!mobileNav)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        setMobileNav(!mobileNav);
                      }
                    }}
                  >
                    {navigation.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
