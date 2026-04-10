import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "../services/api";
import { auth } from "../utils/auth";
import type { LoginResponse } from "../utils/types";
import Toast from "../components/Toast";

export default function FacultyLogin() {
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
      if (data.studentDetails.role !== "ADMIN") {
        setError("This account is not a Faculty (Admin) account");
        return;
      }
      auth.setToken(data.token);
      auth.setUser(JSON.stringify(data.studentDetails));
      setToast("Faculty login successful");
      navigate("/events");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 p-6">
      {toast ? <Toast message={toast} type="success" /> : null}
      <button onClick={() => navigate("/")} className="mb-6 rounded-lg border border-blue-300 bg-white/80 px-3 py-2 text-sm font-semibold text-blue-900 transition hover:bg-white">
        {"← Home"}
      </button>
      <div className="mx-auto mt-14 max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Faculty Login</h1>
        <p className="mb-6 text-sm text-slate-500">Use Faculty (Admin) credentials</p>
        <form onSubmit={handleLogin} className="space-y-3">
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <button disabled={loading} className="w-full rounded-lg bg-blue-900 p-2 font-semibold text-white transition hover:bg-blue-950 disabled:opacity-60">
            {loading ? "Logging in..." : "Faculty Login"}
          </button>
        </form>
        <button onClick={() => navigate("/faculty/register")} className="mt-4 w-full rounded-lg border border-slate-200 p-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
          Go to Faculty Registration
        </button>
      </div>
    </div>
  );
}
