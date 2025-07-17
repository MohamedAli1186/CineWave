import { createSession } from "../services/tmdb";
import { showToast } from "../components/global/Toast";

export const createSessionAuth = async (token: string) => {
  try {
    const data = await createSession(token);
    if (data.success) {
      const sessionId = data.session_id;
      console.log(sessionId);
      localStorage.setItem("session_id", sessionId);
      showToast({ message: "Session created successfully" });
    } else {
      console.error("Session creation failed:", data.success);
      showToast({ message: "Session creation failed", type: "error" });
    }
  } catch (err) {
    console.error("API error (session/new):", err);
    showToast({ message: "API error (session/new)", type: "error" });
  }
};

export const getSessionId = () => {
  const sessionId = localStorage.getItem("session_id");
  return sessionId;
};

export const removeSessionId = () => {
  localStorage.removeItem("session_id");
  localStorage.removeItem("request_token");
  showToast({ message: "Session removed successfully" });
};
