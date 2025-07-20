// src/context/LoaderContext.tsx
import { createContext, useState, type ReactNode } from "react";

interface LoaderContextType {
  loading: boolean;
  setLoading: (value: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <LoaderContext.Provider
      value={{ loading, setLoading, startLoading, stopLoading }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export default LoaderContext;
