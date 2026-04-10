import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import EventCard from "../components/EventCard";
import Toast from "../components/Toast";
import { api, ApiError } from "../services/api";
import { auth } from "../utils/auth";
import type { EventItem, StudentDetails } from "../utils/types";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-100 px-4 py-8">
      {toast ? <Toast message={toast} type="success" /> : null}
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-900">Events Dashboard</h1>
            <button onClick={logout} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Logout
            </button>
          </div>
          {user?.role === "ADMIN" ? <p className="mt-1 text-sm text-slate-600">Faculty (Admin)</p> : null}
          {user?.role !== "ADMIN" && user ? (
            <div className="mt-3 w-full rounded-[2rem] border-2 border-blue-200 bg-white/95 p-4 shadow-sm">
              <p className="mb-3 inline-block rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-900">Student Details</p>
              <div className="grid overflow-hidden rounded-lg border-2 border-blue-200 text-sm text-slate-800 sm:grid-cols-3">
                <div className="border-b border-blue-200 p-3 sm:border-b-0 sm:border-r">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
                  <p className="mt-1 font-semibold text-slate-900">{user.name}</p>
                </div>
                <div className="border-b border-blue-200 p-3 sm:border-b-0 sm:border-r">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Roll No</p>
                  <p className="mt-1 font-semibold text-slate-900">{user.rollNo}</p>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
                  <p className="mt-1 break-all font-semibold text-slate-900">{user.email}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        {error ? <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600">{error}</p> : null}
        {user?.role === "ADMIN" ? (
          <form onSubmit={createEvent} className="mb-6 grid grid-cols-1 gap-3 rounded-2xl bg-white/90 p-4 shadow md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Event Name</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Enter event name" value={eventForm.eventName} onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Student Name</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Enter student name" value={eventForm.studentName} onChange={(e) => setEventForm({ ...eventForm, studentName: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Roll Number</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Enter roll number" value={eventForm.rollNo} onChange={(e) => setEventForm({ ...eventForm, rollNo: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Location</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Enter location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Date</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="YYYY-MM-DD" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2" placeholder="Enter description" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
            </div>
            <button className="rounded-lg bg-blue-700 px-3 py-2 font-semibold text-white transition hover:bg-blue-800 md:col-span-1">
              {editingEventId ? "Update Event" : "Add Event"}
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-50 md:col-span-1"
            >
              Clear
            </button>
          </form>
        ) : null}
        {!loading ? (
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-slate-900">Events</h2>
            <p className="text-sm text-slate-600">
              {user?.role === "ADMIN" ? "Click a card to modify the event details." : "Browse your registered event details below."}
            </p>
          </div>
        ) : null}
        {loading ? <LoadingSpinner /> : null}
        {!loading && events.length === 0 ? (
          <div className="rounded-2xl bg-white/85 p-8 text-center text-slate-600 shadow">No events available yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} clickable={user?.role === "ADMIN"} onClick={() => startEdit(event)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
