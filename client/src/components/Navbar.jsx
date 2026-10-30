
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  if (isAuthPage) return null;

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/");
  };

  return (
    <header className="relative z-10 w-full border-b border-gray-100 bg-neutral-50 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          to="/"
          className="font-brand text-3xl font-extrabold tracking-tight text-green-800"
        >
          Cookly
        </Link>

        {/* Navigation */}
        {!isAuthenticated ? (
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-800 transition hover:text-green-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-green-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-900"
            >
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="relative">

            {/* Profile Button */}
            <button
              type="button"
              aria-label="User profile"
              aria-expanded={isProfileOpen}
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 transition hover:bg-green-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">

                <div className="border-b border-gray-100 px-3 py-2">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user?.name || "User"}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {user?.email}
                  </p>
                </div>

                <Link
                  to="/saved"
                  onClick={() => setIsProfileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-green-50 hover:text-green-800"
                >
                  Saved Recipes
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>

              </div>
            )}
          </div>
        )}

      </nav>
    </header>
  );
}

export default Navbar;
