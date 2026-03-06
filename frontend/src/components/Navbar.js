
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StarBorder from './StarBorder';
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (path) =>
    location.pathname === path ? "text-yellow-400 font-semibold" : "text-white";

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        className="p-5 bg-black text-white flex justify-between items-center shadow-lg fixed w-full top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <StarBorder
          as="button"
          className="custom-class h-12"
          color="cyan"
          speed="5s"
        >
          <Link to="/" className="text-2xl font-bold flex items-center">
          <motion.span className="text-yellow-400" whileHover={{ scale: 1.05 }}>
            CryptoTracker
          </motion.span>
        </Link>
        </StarBorder>
        

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8">
          {["/home", "/portfolio", "/watchlist"].map((path, index) => (
            <Link
              key={index}
              to={path}
              className={`${isActiveLink(path)} hover:text-yellow-400 transition-colors duration-200`}
            >
              {path === "/home" ? "Home" : path.substring(1)}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl p-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {menuOpen ? "✖" : "☰"}
        </motion.button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-[72px] left-0 right-0 bg-black md:hidden z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col p-5 gap-4">
              {["/", "/portfolio", "/watchlist"].map((path, index) => (
                <Link
                  key={index}
                  to={path}
                  className={`${isActiveLink(path)} hover:text-yellow-400 transition-colors duration-200 text-lg`}
                  onClick={() => setMenuOpen(false)}
                >
                  {path === "/" ? "Home" : path.substring(1)}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-[72px]"></div>
    </>
  );
};

export default Navbar;
