const TOKEN_KEY = "student_event_token";
const USER_KEY = "student_event_user";

export const auth = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  setUser: (userJson: string) => localStorage.setItem(USER_KEY, userJson),
  getUser: () => localStorage.getItem(USER_KEY)
};
