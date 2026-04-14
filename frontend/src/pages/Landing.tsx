import { Link } from "react-router-dom";
import campusBg from "../assets/landing_page.jpg";
import ssnLogo from "../assets/ssnlogo.png";

export default function Landing() {
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

      {/* Centered card */}
      <div className="relative z-10 w-full max-w-sm mx-4 sm:mx-auto">
        <div className="rounded-2xl bg-white/[0.18] backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-8 sm:p-10 flex flex-col items-center text-center">

          {/* SSN Logo on white pill */}
          <div className="mb-6 rounded-xl bg-white px-5 py-3 shadow-md">
            <img
              src={ssnLogo}
              alt="SSN College Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Title — SSN blue glow */}
          <h1
            className="text-[1.65rem] sm:text-[1.85rem] font-bold text-white leading-snug tracking-tight"
            style={{
              textShadow:
                "0 0 18px rgba(0, 48, 135, 0.95), 0 0 36px rgba(255, 255, 255, 0.55)",
            }}
          >
            Student Event
            <span className="block" style={{ color: "#93c5fd" }}>
              Management System
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-sm text-white/75 leading-relaxed max-w-xs">
            A secure platform to manage student events and registrations
          </p>

          {/* Divider */}
          <div className="my-7 h-px w-full bg-white/20" />

          {/* Buttons — SSN navy (#003087) */}
          <div className="flex flex-col gap-3 w-full">
            <Link
              to="/student/login"
              className="w-full rounded-xl px-6 py-3 text-sm font-semibold text-white text-center
                         shadow-md transition-all duration-200 active:scale-95
                         hover:brightness-110 hover:shadow-lg"
              style={{ backgroundColor: "#003087" }}
            >
              Student Login
            </Link>
            <Link
              to="/faculty/login"
              className="w-full rounded-xl px-6 py-3 text-sm font-semibold text-white text-center
                         shadow-md transition-all duration-200 active:scale-95
                         hover:brightness-110 hover:shadow-lg"
              style={{ backgroundColor: "#003087", opacity: 0.85 }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.85")}
            >
              Faculty Login
            </Link>
            <Link
              to="/features"
              className="w-full rounded-xl px-6 py-3 text-sm font-bold text-[#003087] text-center
                         bg-white border-2 border-[#003087] shadow-sm hover:shadow-md
                         transition-all duration-200 active:scale-95
                         hover:bg-blue-50"
            >
              Explore System Details
            </Link>
          </div>

          {/* Footer — institution name */}
          <p className="mt-7 text-xs text-white/50 tracking-wide">
            SSN College of Engineering (SSNCE)
          </p>
        </div>
      </div>
    </div>
  );
}
