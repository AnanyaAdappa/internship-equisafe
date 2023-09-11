import React, { useEffect, useState } from "react";
import Logo from "./navbar/Logo";
import NavMenu from "./navbar/NavMenu";
import UserLogin from "./navbar/UserLogin";

function Header() {
  // Header Sticky
  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(
    () => () => {
      window.addEventListener("scroll", changeBackground);
    },
    []
  );

  return (
    <div className="header bg-white">
      <div className="flex w-full justify-between relative items-center">
        <Logo />
        <div className="flex items-center gap-2">
          <NavMenu />
          <UserLogin />
        </div>
      </div>
    </div>
  );
}

export default Header;
