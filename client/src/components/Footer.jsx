
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-brand text-2xl font-extrabold tracking-tight text-green-800"
            >
              Cookly
            </Link>

            <p className="mt-2 max-w-xs text-sm text-gray-500">
              Turn your everyday ingredients into something delicious.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <Link
              to="/"
              className="text-gray-600 transition hover:text-green-700"
            >
              Home
            </Link>

            <Link
              to="/ingredients"
              className="text-gray-600 transition hover:text-green-700"
            >
              Create Recipe
            </Link>

            <Link
              to="/saved"
              className="text-gray-600 transition hover:text-green-700"
            >
              Saved Recipes
            </Link>
          </nav>

        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-100 pt-5 text-center sm:text-left">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Cookly. Made with care for food lovers.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
