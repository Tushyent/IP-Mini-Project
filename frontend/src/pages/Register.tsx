import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api, ApiError } from "../services/api";
import Toast from "../components/Toast";
import campusBg from "../assets/landing_page.jpg";
import ssnLogo from "../assets/ssnlogo.png";

export default function Register() {
  const [form, setForm] = useState({ name: "", rollNo: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.rollNo || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address");
      return;
    }
    try {
      setLoading(true);
      await api.registerStudent({
        name: form.name.trim(),
        rollNo: Number(form.rollNo),
        email: form.email.trim(),
        password: form.password,
      });
      setToast("Registration successful");
      setTimeout(() => navigate("/student/login"), 700);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-10"
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
        <div className="rounded-2xl bg-white/[0.18] backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-8 sm:p-10">

          {/* Header */}
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 inline-block rounded-xl bg-white px-5 py-3 shadow-md">
              <img
                src={ssnLogo}
                alt="SSN Logo"
                className="h-11 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white">Student Registration</h1>
            <p className="mt-1 text-sm text-white/65">Create a new student account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/75 uppercase tracking-wider">
                Full Name
              </label>
              <input
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white
                           placeholder:text-white/40 backdrop-blur-sm transition
                           focus:border-blue-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/75 uppercase tracking-wider">
                Roll No
              </label>
              <input
                className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm text-white
                           placeholder:text-white/40 backdrop-blur-sm transition
                           focus:border-blue-400 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                placeholder="e.g. 2021001"
                value={form.rollNo}
                onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
              />
            </div>
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
                         transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30
                         disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? "Registering…" : "Create Account"}
            </button>
          </form>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-white/55">
            Already have an account?{" "}
            <Link
              to="/student/login"
              className="font-semibold text-blue-300 underline-offset-2 hover:text-blue-200 hover:underline transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
