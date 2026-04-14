import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import EventCard from "../components/EventCard";
import Toast from "../components/Toast";
import { api, ApiError } from "../services/api";
import { auth } from "../utils/auth";
import type { EventItem, StudentDetails } from "../utils/types";
import ssnLogo from "../assets/ssnlogo.png";

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState({ eventName: "", studentName: "", rollNo: "", location: "", date: "", description: "" });
  const navigate = useNavigate();
  const user = auth.getUser() ? (JSON.parse(auth.getUser() as string) as StudentDetails) : null;

  useEffect(() => {
    const load = async () => {
      try {
        if (!user) {
          navigate("/student/login");
          return;
        }
        const data = user.role === "ADMIN" ? ((await api.getAllEvents()) as EventItem[]) : ((await api.getMyEvents(user.rollNo)) as EventItem[]);
        setEvents(data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 401) {
          auth.clear();
          navigate("/student/login");
          return;
        }
        setError(err instanceof ApiError ? err.message : "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const logout = () => {
    auth.clear();
    navigate("/student/login");
  };

  const createEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventForm.eventName || !eventForm.studentName || !eventForm.rollNo || !eventForm.location || !eventForm.date || !eventForm.description) {
      setError("All event fields are required");
      return;
    }
    try {
      if (editingEventId) {
        const updated = (await api.updateEvent(editingEventId, {
          eventName: eventForm.eventName,
          studentName: eventForm.studentName,
          rollNo: Number(eventForm.rollNo),
          location: eventForm.location,
          date: eventForm.date,
          description: eventForm.description
        })) as EventItem;
        setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        setToast("Event updated successfully");
        setEditingEventId(null);
        setEventForm({ eventName: "", studentName: "", rollNo: "", location: "", date: "", description: "" });
        setError("");
        return;
      }

      const created = (await api.addEvent({
        eventName: eventForm.eventName,
        studentName: eventForm.studentName,
        rollNo: Number(eventForm.rollNo),
        location: eventForm.location,
        date: eventForm.date,
        description: eventForm.description
      })) as EventItem;
      setEvents((prev) => [created, ...prev]);
      setToast("Event created");
      setEventForm({ eventName: "", studentName: "", rollNo: "", location: "", date: "", description: "" });
      setError("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Event save failed");
    }
  };

  const startEdit = (event: EventItem) => {
    if (user?.role !== "ADMIN") {
      return;
    }
    setEditingEventId(event.id);
    setEventForm({
      eventName: event.eventName,
      studentName: event.studentName,
      rollNo: String(event.rollNo),
      location: event.location,
      date: event.date,
      description: event.description
    });
    setToast("Editing mode enabled. Update fields and save.");
    setError("");
  };

  const cancelEdit = () => {
    setEditingEventId(null);
    setEventForm({ eventName: "", studentName: "", rollNo: "", location: "", date: "", description: "" });
    setToast("Edit cancelled");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {toast ? <Toast message={toast} type="success" /> : null}
      
      {/* Professional Header */}
      <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-200">
              <img src={ssnLogo} alt="SSN Logo" className="h-10 w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-[#003087]">Student Event</h1>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Management System</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden text-right md:block">
              <p className="text-sm font-bold text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.role === "ADMIN" ? "Faculty Administrator" : `Roll No: ${user?.rollNo}`}</p>
            </div>
            <button 
              onClick={logout} 
              className="rounded-xl bg-[#003087] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-800 hover:shadow-lg active:scale-95"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Events Dashboard</h2>
            <p className="mt-1 text-slate-500">
              {user?.role === "ADMIN" 
                ? "Manage and monitor all student event registrations." 
                : "View and track your participating event registrations."}
            </p>
          </div>

          {user?.role !== "ADMIN" && user && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Profile Name</p>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Roll Number</p>
                  <p className="font-semibold text-slate-900">{user.rollNo}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</p>
                  <p className="font-semibold text-slate-900">{user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {user?.role === "ADMIN" && (
          <section className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm ring-4 ring-blue-50/50">
              <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                  {editingEventId ? "!" : "+"}
                </span>
                {editingEventId ? "Update Existing Event" : "Create New Event Registration"}
              </h3>
              
              <form onSubmit={createEvent} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Event Name</label>
                  <input className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. Hackathon 2024" value={eventForm.eventName} onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Student Name</label>
                  <input className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="Full name" value={eventForm.studentName} onChange={(e) => setEventForm({ ...eventForm, studentName: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Roll Number</label>
                  <input className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. 210101" value={eventForm.rollNo} onChange={(e) => setEventForm({ ...eventForm, rollNo: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Location</label>
                  <input className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="e.g. Main Auditorium" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Date</label>
                  <input className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="YYYY-MM-DD" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-500">Description</label>
                  <input className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10" placeholder="Short description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
                </div>
                
                <div className="flex gap-3 lg:col-span-3">
                  <button className="flex-1 rounded-xl bg-[#003087] px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-800 hover:shadow-lg active:scale-95">
                    {editingEventId ? "Save Changes" : "Create Event"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition-all hover:bg-slate-50 active:scale-95"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>
          </section>
        )}

        <section>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-slate-900">Active Registrations</h3>
            <p className="text-sm text-slate-500">
              {user?.role === "ADMIN" ? "Manage all registrations across the portal." : "History of events you've registered for."}
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[400px] items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : events.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-slate-900">No events found</p>
              <p className="mt-1 text-slate-500">There are no records matching your account at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  clickable={user?.role === "ADMIN"} 
                  onClick={() => startEdit(event)} 
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
