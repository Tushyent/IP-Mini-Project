import { Link } from "react-router-dom";
import landingPageImage from "../assets/landing-page-image.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100">
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-2 lg:items-center">
        <div className="rounded-2xl bg-white/85 p-6 shadow-xl ring-1 ring-blue-100">
          <p className="mb-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold tracking-wide text-blue-800">
            Student Event Registration and Management System
          </p>
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Student Event Registration and Management System
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            A secure, modern portal for colleges to register participants, manage campus events, and streamline faculty administration.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link to="/student/login" className="rounded-lg bg-blue-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-950">
              Student Login
            </Link>
            <Link to="/faculty/login" className="rounded-lg bg-blue-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-950">
              Faculty (Admin) Login
            </Link>
            <Link to="/student/register" className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-center text-sm font-semibold text-blue-800 transition hover:bg-blue-50">
              Student Registration
            </Link>
            <Link to="/faculty/register" className="rounded-lg border border-blue-200 bg-white px-4 py-3 text-center text-sm font-semibold text-blue-800 transition hover:bg-blue-50">
              Faculty Registration
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-blue-100">
          <img
            src={landingPageImage}
            alt="College students in front of campus building"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}
