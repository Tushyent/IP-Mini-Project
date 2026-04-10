import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, ApiError } from "../services/api";
import Toast from "../components/Toast";

export default function FacultyRegister() {
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
    try {
      setLoading(true);
      await api.registerFaculty({ name: form.name.trim(), rollNo: Number(form.rollNo), email: form.email.trim(), password: form.password });
      setToast("Faculty registration successful");
      setTimeout(() => navigate("/faculty/login"), 700);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Registration failed");
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
      <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Faculty Registration</h1>
        <p className="mb-6 text-sm text-slate-500">Create Faculty (Admin) account</p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Faculty Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Faculty Id (numeric)" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} />
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="w-full rounded-lg border border-slate-200 px-3 py-2" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          <button disabled={loading} className="w-full rounded-lg bg-blue-900 p-2 font-semibold text-white transition hover:bg-blue-950 disabled:opacity-60">
            {loading ? "Registering..." : "Register Faculty"}
          </button>
        </form>
        <button onClick={() => navigate("/faculty/login")} className="mt-4 w-full rounded-lg border border-slate-200 p-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
          Go to Faculty Login
        </button>
      </div>
    </div>
  );
}
