import { auth } from "../utils/auth";

// Use environment variables with fallbacks for local development
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const STUDENT_API = import.meta.env.VITE_STUDENT_API_URL || BASE_URL || "http://localhost:8082";
const EVENT_API = import.meta.env.VITE_EVENT_API_URL || BASE_URL || "http://localhost:8081";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new ApiError(payload.message ?? "Request failed", response.status);
  }
  return payload as T;
};

/**
 * API Service
 * Handles communication with backend microservices.
 * Uses Authorization header with JWT Bearer token for protected routes.
 */
export const api = {
  registerStudent: async (data: { name: string; rollNo: number; email: string; password: string }) => {
    const res = await fetch(`${STUDENT_API}/student/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  },
  registerFaculty: async (data: { name: string; rollNo: number; email: string; password: string }) => {
    const res = await fetch(`${STUDENT_API}/student/faculty/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  },
  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${STUDENT_API}/student/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  },
  getMyEvents: async (rollNo: number) => {
    const token = auth.getToken();
    if (!token) {
        window.location.href = "/login";
        throw new Error("No token found, redirecting to login");
    }
    const res = await fetch(`${EVENT_API}/events/${rollNo}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return parseResponse(res);
  },
  getAllEvents: async () => {
    const token = auth.getToken();
    if (!token) {
        window.location.href = "/login";
        throw new Error("No token found, redirecting to login");
    }
    const res = await fetch(`${EVENT_API}/events`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return parseResponse(res);
  },
  addEvent: async (data: { eventName: string; studentName: string; rollNo: number; location: string; date: string; description: string }) => {
    const token = auth.getToken();
    if (!token) {
        window.location.href = "/login";
        throw new Error("No token found, redirecting to login");
    }
    const res = await fetch(`${EVENT_API}/events/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  },
  updateEvent: async (id: string, data: { eventName: string; studentName: string; rollNo: number; location: string; date: string; description: string }) => {
    const token = auth.getToken();
    if (!token) {
        window.location.href = "/login";
        throw new Error("No token found, redirecting to login");
    }
    const res = await fetch(`${EVENT_API}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  }
};
