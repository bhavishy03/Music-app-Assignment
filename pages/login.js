import { useState } from "react";
import { useRouter } from "next/router";
import { Music } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.username || !form.password) {
      setError("⚠ Please enter both username and password");
      return;
    }

    // Fake auth → set flag in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", form.username);
    }

    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Music className="w-7 h-7 text-white" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold mb-2">Welcome to MusicDash</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Sign in to continue</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-md hover:from-purple-600 hover:to-pink-600 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Mock login only – use any username and password
        </p>
      </div>
    </div>
  );
}