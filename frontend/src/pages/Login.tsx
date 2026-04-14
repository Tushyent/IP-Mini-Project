import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { auth } from "../utils/auth";
import type { LoginResponse } from "../utils/types";
import Toast from "../components/Toast";
import campusBg from "../assets/landing_page.jpg";
import ssnLogo from "../assets/ssnlogo.png";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = (await api.login(form)) as LoginResponse;
      auth.setToken(data.token);
      auth.setUser(JSON.stringify(data.studentDetails));
      setToast("Login successful");
      navigate("/events");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        backgroundImage: `url(${campusBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" />

      {toast ? <Toast message={toast} type="success" /> : null}

      {/* Back to home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 z-20 flex items-center gap-1.5 rounded-lg border border-white/30
                   bg-white/15 px-3 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm
                   transition hover:bg-white/25"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Home
      </button>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4 sm:mx-auto">
        <div className="rounded-2xl bg-white/[0.18] backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.45)] p-8 sm:p-10">

          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 inline-block rounded-xl bg-white px-5 py-3 shadow-md">
              <img
                src={ssnLogo}
                alt="SSN Logo"
                className="h-11 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Student Login</h1>
            <p className="mt-1 text-sm text-white/65">Enter your account credentials</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/75 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white
                           placeholder:text-white/40 backdrop-blur-sm transition
                           focus:border-blue-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/75 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white
                           placeholder:text-white/40 backdrop-blur-sm transition
                           focus:border-blue-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/20 border border-red-400/30 px-4 py-2.5 text-sm font-medium text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md
                         transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-500/30 hover:shadow-lg
                         disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>

          {/* Signup link */}
          <p className="mt-6 text-center text-sm text-white/55">
            Not a user?{" "}
            <Link
              to="/student/register"
              className="font-semibold text-blue-300 underline-offset-2 hover:text-blue-200 hover:underline transition"
            >
              Create your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
