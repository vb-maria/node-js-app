import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <div className="container flex items-center justify-between">
        <Link to="/">
          <h1 className="text-[20px] lg:text-[50px] capitalize text-white">MyWardrobe</h1>
        </Link>
        <Link to="/new" className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-teal-300">
        Add New Item
      </Link>
      </div>
    </nav>
  );
}
