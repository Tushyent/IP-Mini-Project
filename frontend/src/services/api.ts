import { auth } from "../utils/auth";

// Environment variables (NO trailing slash required)
const STUDENT_API = import.meta.env.VITE_STUDENT_API_URL || "http://localhost:8082";
const EVENT_API = import.meta.env.VITE_EVENT_API_URL || "http://localhost:8081";

const buildUrl = (base: string, path: string) =>
  `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

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

// 🔐 Auth wrapper
async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = auth.getToken();

  if (!token) {
    window.location.href = "/login";
    throw new Error("No authorization token found");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };

  try {
    const res = await fetch(url, { ...options, headers });
    return await parseResponse<T>(res);
  } catch (err) {
    console.error(`API Call failed to ${url}:`, err);
    throw err;
  }
}

export const api = {
  registerStudent: async (data: any) => {
    const res = await fetch(buildUrl(STUDENT_API, "/student/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  },

  registerFaculty: async (data: any) => {
    const res = await fetch(buildUrl(STUDENT_API, "/student/faculty/register"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  },

  login: async (data: any) => {
    const res = await fetch(buildUrl(STUDENT_API, "/student/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return parseResponse(res);
  },

  getMyEvents: (rollNo: number) =>
    fetchWithAuth(buildUrl(EVENT_API, `/events/${rollNo}`)),

  getAllEvents: () =>
    fetchWithAuth(buildUrl(EVENT_API, "/events")),

  addEvent: (data: any) =>
    fetchWithAuth(buildUrl(EVENT_API, "/events/add"), {
      method: "POST",
      body: JSON.stringify(data)
    }),

  updateEvent: (id: string, data: any) =>
    fetchWithAuth(buildUrl(EVENT_API, `/events/${id}`), {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  deleteEvent: (id: string) =>
    fetchWithAuth(buildUrl(EVENT_API, `/events/${id}`), {
      method: "DELETE"
    })
};