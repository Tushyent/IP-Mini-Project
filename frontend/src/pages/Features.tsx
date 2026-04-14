import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Cloud, 
  Users, 
  Lock, 
  Zap, 
  Layout, 
  CheckCircle, 
  ArrowRight,
  Server,
  Code2,
  Globe,
  Star,
  Layers,
  Search,
  Key,
  HardDrive
} from "lucide-react";
import ssnLogo from "../assets/ssnlogo.png";

const Features = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 italic-selection">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={ssnLogo} alt="SSN Logo" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-700">
                  Student Event Management System
                </span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-slate-600 hover:text-blue-700 font-medium transition-colors">Home</Link>
              <Link to="/features" className="text-blue-700 font-bold border-b-2 border-blue-700 pb-1">Features</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 bg-gradient-to-br from-[#003087] to-blue-600 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Student Event Registration and Management System
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            A secure and scalable platform to manage student participation and events efficiently. Built with modern microservices architecture.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Project Overview & Problem Statement - Scannability Overhaul */}
        <section className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2 bg-gradient-to-br from-blue-900 to-[#003087] p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Layers size={200} /></div>
            <div className="relative z-10 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full mb-6 border border-white/20">
                <ShieldCheck size={14} className="text-blue-300" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-200">System Overview</span>
              </div>
              <h2 className="text-3xl font-black mb-4 tracking-tight">Full-Stack Microservices Architecture</h2>
              <p className="text-blue-100/90 leading-relaxed text-lg mb-6 max-w-2xl">
                A highly cohesive, loosely coupled digital platform designed to completely automate and secure institutional event registrations. It effectively replaces manual tracking with <strong>role-based digital workflows</strong>.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10 shadow-sm flex items-center gap-2"><Lock size={14}/> Stateless Auth</span>
                <span className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10 shadow-sm flex items-center gap-2"><Globe size={14}/> Cross-Origin Ready</span>
                <span className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold border border-white/10 shadow-sm flex items-center gap-2"><Users size={14}/> Role-Based Access</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col gap-6 justify-center">
            <div>
              <h3 className="flex items-center gap-2 font-black text-rose-600 mb-2 uppercase tracking-wide text-xs">
                <Search size={14} /> The Problem
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                Manual campus registration systems are fragmented, inherently error-prone, and lack centralized data tracking, leading to administrative overhead.
              </p>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
            <div>
              <h3 className="flex items-center gap-2 font-black text-emerald-600 mb-2 uppercase tracking-wide text-xs">
                <CheckCircle size={14} /> The Solution
              </h3>
              <p className="text-sm text-slate-600 font-medium">
                This distributed microservices ecosystem provides a unified, error-free platform. It isolates services (Student, Event, Faculty) to guarantee system reliability and scale.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core System Features</h2>
            <p className="text-slate-500">Everything you need for seamless campus event management.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, title: "Student Auth", desc: "Easy registration & secure login for students." },
              { icon: ShieldCheck, title: "Faculty Access", desc: "Dedicated portal for event organizers." },
              { icon: Lock, title: "JWT Security", desc: "Secure token-based authentication (Stateless)." },
              { icon: Key, title: "RBAC", desc: "Fine-grained Role-Based Access Control." },
              { icon: Zap, title: "Event Creation", desc: "Faculty can create events with dynamic fields." },
              { icon: CheckCircle, title: "Registration", desc: "One-click event registration for students." },
              { icon: Globe, title: "REST APIs", desc: "Scalable communication via Spring Boot APIs." },
              { icon: Layout, title: "Responsive UI", desc: "Optimized for Mobile, Tablet, and Desktop." },
            ].map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all group flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <f.icon size={24} />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Microservices */}
        <section className="bg-blue-900 rounded-[3rem] p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
            <Cpu size={200} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Why Microservices?</h2>
              <div className="grid gap-4">
                {[
                  { t: "Independent Services", d: "Student, Event, and Faculty modules run as separate processes." },
                  { t: "Better Scalability", d: "Each service can be scaled independently based on workload." },
                  { t: "Easier Maintenance", d: "Codebase is modular, making it easier to update and debug." },
                  { t: "Fault Isolation", d: "Failure in one service doesn't crash the entire system." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                    <div className="text-blue-300"><CheckCircle size={20} /></div>
                    <div>
                      <h4 className="font-bold">{item.t}</h4>
                      <p className="text-sm text-blue-100">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 text-center md:text-left space-y-6">
              <p className="text-lg text-blue-100 italic">
                "Modern systems require agility. Microservices architecture allows us to deploy faster and manage complexity more effectively."
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="px-4 py-2 bg-white/20 rounded-full text-xs font-bold ring-1 ring-white/30">STUDENT-SERVICE</span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-xs font-bold ring-1 ring-white/30">EVENT-SERVICE</span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-xs font-bold ring-1 ring-white/30">FACULTY-SERVICE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Technology Stack</h2>
            <p className="text-slate-500">The industry-standard tools powering this platform.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Frontend", color: "blue", list: ["React 19", "TypeScript", "Tailwind CSS", "React Router 7", "Fetch API"], icon: Code2 },
              { title: "Backend", color: "green", list: ["Java 17", "Spring Boot", "Spring Security", "JWT Auth", "Maven"], icon: Server },
              { title: "Database", color: "amber", list: ["MongoDB Atlas", "Collection: students", "Collection: events", "Collection: faculty"], icon: Database },
              { title: "Deployment", color: "indigo", list: ["Vercel (Frontend)", "Render (Backend)", "Dockerized Env", "CI/CD Ready"], icon: Cloud },
            ].map((stack, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className={`p-6 bg-${stack.color}-50 flex items-center gap-3`}>
                  <div className={`p-2 bg-white rounded-xl text-${stack.color}-700 shadow-sm`}><stack.icon size={20} /></div>
                  <h3 className={`font-bold text-${stack.color}-900`}>{stack.title}</h3>
                </div>
                <ul className="p-6 space-y-3">
                  {stack.list.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${stack.color}-400`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative shadow-2xl overflow-hidden border border-slate-800">
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
          
          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">System Architecture Visualized</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">A modern, secure flow from the user client down to the distributed microservices and database layer.</p>
            </div>

            {/* Architecture Diagram */}
            <div className="w-full bg-slate-950/50 rounded-3xl border border-slate-800 p-8 backdrop-blur-sm shadow-inner mb-24">
              
              {/* Row 1: Client */}
              <div className="flex justify-center mb-8">
                <div className="bg-blue-600 rounded-2xl p-6 flex items-center gap-4 shadow-[0_0_30px_rgba(37,99,235,0.3)] min-w-[250px] justify-center relative">
                  <Layout size={32} className="text-white" />
                  <div>
                    <h3 className="font-bold text-lg">React Client</h3>
                    <p className="text-xs text-blue-200 font-mono">browser / mobile</p>
                  </div>
                  {/* Arrow pointing down */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-0.5 h-8 bg-blue-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                </div>
              </div>

              {/* Row 2: API Gateway / Routing */}
              <div className="flex justify-center mb-12">
                <div className="border border-emerald-500/30 bg-emerald-950/30 rounded-full px-8 py-3 flex items-center gap-3 relative">
                  <ShieldCheck size={20} className="text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-300 tracking-widest uppercase">Stateless JWT Authentication</span>
                  {/* Arrows pointing out */}
                  <div className="absolute -bottom-8 left-1/4 w-0.5 h-6 bg-slate-700 hidden md:block"></div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-slate-700"></div>
                  <div className="absolute -bottom-8 right-1/4 w-0.5 h-6 bg-slate-700 hidden md:block"></div>
                </div>
              </div>

              {/* Row 3: Microservices */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-t border-b border-dashed border-slate-800 py-8">
                
                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 relative group hover:border-blue-500 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Users size={48} /></div>
                  <div className="w-10 h-10 rounded-xl bg-blue-900/50 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/30"><Server size={20} /></div>
                  <h4 className="font-black text-slate-200 mb-1">Student Service</h4>
                  <p className="text-xs text-slate-500 font-mono">Port: 8080</p>
                  {/* Connection line */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-700"></div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 relative group hover:border-amber-500 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={48} /></div>
                  <div className="w-10 h-10 rounded-xl bg-amber-900/50 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/30"><Server size={20} /></div>
                  <h4 className="font-black text-slate-200 mb-1">Event Service</h4>
                  <p className="text-xs text-slate-500 font-mono">Port: 8081</p>
                  {/* Connection line */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-700"></div>
                </div>

                <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 relative group hover:border-purple-500 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Lock size={48} /></div>
                  <div className="w-10 h-10 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-400 mb-4 border border-purple-500/30"><Server size={20} /></div>
                  <h4 className="font-black text-slate-200 mb-1">Faculty Service</h4>
                  <p className="text-xs text-slate-500 font-mono">Port: 8082</p>
                  {/* Connection line */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-700"></div>
                </div>

              </div>

              {/* Row 4: Database */}
              <div className="flex justify-center">
                <div className="bg-slate-900 border-2 border-emerald-900/50 rounded-2xl min-w-[300px] p-6 text-center relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
                  <Database size={40} className="text-emerald-500 mx-auto mb-3" />
                  <h3 className="font-black text-lg text-emerald-50">MongoDB Atlas Cluster</h3>
                  <div className="flex gap-2 justify-center mt-3">
                    <span className="px-2 py-1 bg-slate-950 rounded text-[10px] font-mono text-emerald-400 border border-emerald-900">students_db</span>
                    <span className="px-2 py-1 bg-slate-950 rounded text-[10px] font-mono text-emerald-400 border border-emerald-900">events_db</span>
                    <span className="px-2 py-1 bg-slate-950 rounded text-[10px] font-mono text-emerald-400 border border-emerald-900">faculty_db</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Data Flow */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { s: "01", t: "Client Request", d: "User submits credentials or event data via the React frontend. Data is encapsulated in a secure HTTP POST." },
                { s: "02", t: "Filter Intercept", d: "Spring Security's filter chain intercepts the request. Extracting the 'Bearer' token from headers if present." },
                { s: "03", t: "JWT Verification", d: "The backend validates the token's cryptographic signature against its internal HS256 secret key." },
                { s: "04", t: "Controller Routing", d: "Once authenticated, request is passed to the specific Microservice controller (Event/Student/Faculty)." },
                { s: "05", t: "Service Logic", d: "Business rules are applied. E.g., Verifying if a student is already registered for a specific hackathon." },
                { s: "06", t: "NoSQL Storage", d: "Data is serialized and transmitted to MongoDB Atlas. A JSON payload is returned to the client to update UI state." }
              ].map((flow, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-black text-xs border border-blue-500/30">
                      {flow.s}
                    </div>
                    <h4 className="font-bold text-slate-200">{flow.t}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed drop-shadow-sm">{flow.d}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Real World Use & Impact */}
        <section className="bg-gradient-to-br from-indigo-900 via-[#003087] to-blue-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="p-3 bg-white/10 w-fit rounded-2xl text-blue-300 backdrop-blur-md border border-white/10 shadow-sm mb-6">
                <Globe size={32} />
              </div>
              <h2 className="text-4xl font-black mb-6 tracking-tight">Real-World Institutional Impact</h2>
              <p className="text-blue-100 text-lg leading-relaxed mb-8 font-medium">
                This system is engineered for the complex needs of modern educational institutions. It bridge the gap between manual administrative overhead and seamless digital execution.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { t: 'Automated Tracking', d: 'Eliminates paper-based logs.' },
                  { t: 'Instant Validation', d: 'Prevents double registrations.' },
                  { t: 'Faculty Oversight', d: 'Real-time dashboard for HODs.' },
                  { t: 'Scalable Growth', d: 'Handles thousands of students.' }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <h4 className="text-blue-300 font-bold text-sm mb-1">{item.t}</h4>
                    <p className="text-xs text-blue-100/70">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/10 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-md">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Star size={20} className="text-yellow-400 fill-yellow-400" />
                University Use Cases
              </h3>
              <ul className="space-y-4">
                {[
                  { t: 'Technical symposiums', d: 'Manage registrations for multiple parallel workshops.' },
                  { t: 'Campus Hackathons', d: 'Secure student verification and participation tracking.' },
                  { t: 'Cultural Festivals', d: 'Coordinated event scheduling and faculty supervision.' },
                  { t: 'Guest Lectures', d: 'Automated attendance and student engagement logging.' }
                ].map((use, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold">✓</div>
                    <div>
                      <h4 className="font-bold text-sm">{use.t}</h4>
                      <p className="text-xs text-blue-200">{use.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* Deployment Section */}
      <section className="bg-slate-100 border-t border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Production Infrastructure</h2>
          <p className="text-slate-600 text-lg mb-16 font-medium">Our microservices are distributed across enterprise-grade cloud providers.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Database, color: "text-green-600", bg: "bg-green-50", title: "MongoDB Atlas", desc: "Clustered Cloud Database with automatic failover.", detail: "Storage Layer" },
              { icon: HardDrive, color: "text-slate-900", bg: "bg-slate-200", title: "Render Cloud", desc: "Headless backend orchestration for Spring Boot.", detail: "Business Logic Layer" },
              { icon: Globe, color: "text-blue-600", bg: "bg-blue-50", title: "Vercel Edge", desc: "Blazing fast global CDN with automated CI/CD.", detail: "Presentation Layer" }
            ].map((infra, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className={`p-8 ${infra.bg} rounded-[2.5rem] shadow-sm border border-slate-200 mb-6 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2`}>
                  <infra.icon className={infra.color} size={48} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{infra.title}</h3>
                <p className="text-sm text-slate-500 max-w-xs mb-4 font-medium">{infra.desc}</p>
                <span className="text-[10px] px-3 py-1 bg-slate-200 rounded-full uppercase tracking-widest font-black text-slate-600">{infra.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#002060] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/50 rounded-2xl mb-8 border border-white/10">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase">Institutional Project</span>
              </div>
              <h3 className="text-3xl font-black mb-8 flex items-center gap-3">
                <span className="bg-white text-blue-900 px-3 py-1 rounded-xl">Team</span> Blastorz
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Tushyent N P", id: "3122 24 5001 189" },
                  { name: "Vignesh Raaj S", id: "3122 24 5001 198" },
                  { name: "Vino SR Harison", id: "3122 24 5001 199" }
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-blue-300 group-hover:bg-blue-500 group-hover:text-white transition-all">0{i+1}</div>
                    <div>
                      <p className="font-black text-lg text-white leading-tight">{m.name}</p>
                      <p className="text-xs text-blue-300 font-bold font-mono uppercase tracking-tighter">Reg No: {m.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 backdrop-blur-sm md:text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-400 font-extrabold mb-4">Academic Submission</p>
              <h4 className="text-2xl font-black mb-2 text-white italic">Internet Programming Lab</h4>
              <p className="text-blue-200 font-bold mb-10 leading-relaxed">SSN College of Engineering<br />Dept of Computer Science & Engineering</p>
              <div className="">
                <Link to="/" className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-blue-900 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all hover:scale-105 active:scale-95">
                  Back to Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-white/5 text-center">
            <p className="text-blue-400/60 text-[10px] tracking-[0.4em] uppercase font-black">
              &copy; 2026 Blastorz &bull; All Technical Rights Reserved &bull; SSNCE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Features;
