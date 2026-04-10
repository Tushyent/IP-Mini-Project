export type UserRole = "USER" | "ADMIN";

export interface StudentDetails {
  id: string;
  name: string;
  rollNo: number;
  email: string;
  role: UserRole;
}

export interface EventItem {
  id: string;
  eventName: string;
  studentName: string;
  rollNo: number;
  location: string;
  date: string;
  description: string;
}

export interface LoginResponse {
  token: string;
  studentDetails: StudentDetails;
  events: EventItem[];
}
