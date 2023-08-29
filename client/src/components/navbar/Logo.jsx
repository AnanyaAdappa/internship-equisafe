import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img
        alt="Logo"
        className="block cursor-pointer"
        height={100}
        width={100}
        src="/logo.jpg"
      />
    </Link>
  );
}
