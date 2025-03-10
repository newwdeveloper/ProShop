import { useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar bg-black shadow-sm px-4">
      <div className="flex-1">
        <Link
          to="/"
          className="inline-block text-4xl text-white hover:bg-black 
          px-4 py-2 rounded-md hover:scale-105 
          transform transition duration-300"
        >
          ProShop.com
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="btn btn-ghost text-white"
        >
          {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </button>
      </div>

      {/* Desktop & Mobile Navigation */}
      <div
        className={`lg:flex ${
          menuOpen ? "block" : "hidden"
        } absolute lg:static top-16 left-0 w-full lg:w-auto bg-black lg:bg-transparent shadow-lg lg:shadow-none z-50 p-5 lg:p-0`}
      >
        <ul className="menu menu-vertical lg:menu-horizontal lg:flex-row w-full lg:w-auto text-lg space-y-4 lg:space-y-0 text-white">
          <li>
            <a className="flex items-center gap-2 text-white">
              <FaShoppingCart /> Cart
            </a>
          </li>
          <li>
            <a className="flex items-center gap-2 text-white">
              <FaUser /> SignIn
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
