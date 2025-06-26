import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          E-Shop
        </Link>
        <nav className="space-x-4 flex items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Cart
          </Link>
          <Link
            to="/checkout"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Checkout
          </Link>
          {user ? (
            <>
              <span className="ml-4 text-gray-700 font-medium">
                {user.name || user.email}
              </span>
              <button
                className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="ml-4 text-blue-600 hover:underline"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="ml-2 text-blue-600 hover:underline"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
