// src/context/AuthContext.tsx
import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import {
  createSessionAuth,
  getSessionId,
  removeSessionId,
} from "../utils/auth";
import { showToast } from "../components/global/Toast";

interface AuthContextType {
  sessionId: string | null;
  login: () => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const isLoggedIn = !!sessionId;

  // Check for existing session on initial load
  useEffect(() => {
    const storedSession = getSessionId();
    if (storedSession) {
      setSessionId(storedSession);
    }
  }, []);

  const login = useCallback(async () => {
    try {
      await createSessionAuth();
      const newSessionId = getSessionId();
      setSessionId(newSessionId);
      showToast({ message: "Successfully logged in!", type: "success" });
    } catch (error) {
      showToast({ message: "Login failed. Please try again.", type: "error" });
      throw error;
    }
    const newSession = getSessionId();
    if (newSession) {
      setSessionId(newSession);
    }
  }, []);

  const logout = useCallback(() => {
    removeSessionId();
    setSessionId(null);
    showToast({ message: "Successfully logged out", type: "success" });
  }, []);

  const value = {
    sessionId,
    login,
    logout,
    isLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
