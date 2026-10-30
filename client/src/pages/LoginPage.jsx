import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api/authService";


function LoginPage() {

  const { login } = useAuth();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim() || !password) {
      setError("Please enter both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: email.trim(),
        password,
      });

      login(data.token,data.user);

      navigate("/ingredients");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-7 shadow-lg sm:p-10">

        {/* Brand */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="font-brand text-3xl font-extrabold text-green-900"
          >
            Cookly
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-gray-900">
            Welcome back!
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to continue discovering delicious recipes.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
                onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
                onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-green-700 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-green-800 hover:text-green-900"
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {message && (
            <p className="text-sm text-green-700">{message}</p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-800 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-7 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-green-800 hover:text-green-900"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;