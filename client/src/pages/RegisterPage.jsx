
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api/authService";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setMessage("Account created successfully!");

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8F9F7] px-4 py-10">
      <section className="w-full max-w-md rounded-2xl bg-white p-7 shadow-lg sm:p-10">
        {/* Branding */}
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="font-brand text-3xl font-extrabold tracking-tight text-green-800"
          >
            Cookly
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Start creating delicious recipes with what you have.
          </p>
        </div>

        {/* Registration Form */}
        <form noValidate onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            {message && (
              <p className="text-sm text-green-700" role="status">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-700 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
        </form>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-green-700 hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
