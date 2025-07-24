import { createSession } from "../services/tmdb";
import { showToast } from "../components/global/Toast";
import { deleteCookie, getCookie } from "./cookies";

export const createSessionAuth = async () => {
  const token = getCookie("request_token");

  if (!token) {
    showToast({ message: "Login expired. Please try again.", type: "error" });
    return;
  }

  try {
    const data = await createSession(token);
    if (data.success) {
      const sessionId = data.session_id;
      localStorage.setItem("session_id", sessionId);
      showToast({ message: "Session created successfully" });
    } else {
      deleteCookie("request_token");
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
  deleteCookie("request_token");
  showToast({ message: "Session removed successfully" });
};
