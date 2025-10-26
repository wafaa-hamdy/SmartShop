import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function Signout() {
    localStorage.removeItem("UserToken");
    setUserLogin(null);
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md fixed top-0 right-0 left-0 border-b border-gray-200 z-50 shadow-lg">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl px-6 py-2">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <i className="fa-solid fa-cart-shopping text-white text-2xl"></i>
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              freshCart
            </span>
          </Link>

          <ul className="hidden md:flex gap-2 flex-grow justify-center">
            {["", "cart", "categories", "brands", "products", "wishlist"].map((path, index) => (
              <li key={index}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-2.5 rounded-xl shadow-lg font-semibold transition-all"
                      : "text-gray-700 px-5 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 font-semibold transition-all"
                  }
                  to={path === "" ? "/" : `/${path.toLowerCase()}`}
                >
                  {path === "" ? "Home" : path.charAt(0).toUpperCase() + path.slice(1)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex gap-3 items-center">
            {UserLogin !== null ? (
              <button 
                onClick={Signout} 
                className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Signout
              </button>
            ) : (
              <>
                <Link 
                  to="login" 
                  className="px-6 py-2.5 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-xl transition-all"
                >
                  Login
                </Link>
                <Link 
                  to="register" 
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button 
            className="md:hidden text-2xl text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-all" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className={`fa-solid ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>

        <div className={`md:hidden transition-all duration-300 ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
          <div className="bg-gradient-to-b from-white to-gray-50 py-6 px-4 shadow-inner">
            <ul className="flex flex-col items-center space-y-3 mb-6">
              {["", "cart", "categories", "brands", "products", "wishlist"].map((path, index) => (
                <li key={index} className="w-full">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "block text-center text-white bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 rounded-xl font-semibold shadow-lg"
                        : "block text-center text-gray-700 px-6 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 font-semibold transition-all"
                    }
                    to={path === "" ? "/" : `/${path.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {path === "" ? "Home" : path.charAt(0).toUpperCase() + path.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center space-y-3 mb-6 border-t border-gray-200 pt-6">
              {UserLogin !== null ? (
                <button 
                  onClick={Signout} 
                  className="w-full max-w-xs px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg transition-all"
                >
                  Signout
                </button>
              ) : (
                <>
                  <Link 
                    to="login" 
                    className="w-full max-w-xs text-center px-6 py-3 text-emerald-600 font-semibold border-2 border-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="register" 
                    className="w-full max-w-xs text-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg transition-all"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-center text-gray-500 text-sm mb-4 font-semibold">Follow Us</p>
              <ul className="flex justify-center gap-3">
                {[
                  { name: "facebook", bg: "bg-blue-600", hover: "hover:bg-blue-700" },
                  { name: "instagram", bg: "bg-pink-500", hover: "hover:bg-pink-600" },
                  { name: "youtube", bg: "bg-red-600", hover: "hover:bg-red-700" },
                  { name: "linkedin", bg: "bg-blue-500", hover: "hover:bg-blue-600" },
                  { name: "twitter", bg: "bg-sky-500", hover: "hover:bg-sky-600" },
                  { name: "tiktok", bg: "bg-black", hover: "hover:bg-gray-800" },
                ].map((platform, index) => (
                  <li
                    key={index}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl ${platform.bg} ${platform.hover} text-white text-lg shadow-lg transition-all transform hover:scale-110 cursor-pointer`}
                  >
                    <i className={`fab fa-${platform.name}`}></i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}