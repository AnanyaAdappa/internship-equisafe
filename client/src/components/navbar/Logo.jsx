import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <h1 class=" text-sky-700 text-center text-4xl md:text-3xl font-semibold font-merriweather">EQUISAFE</h1>
    </Link>
  );
}
