import { useContext } from "react";
import LoaderContext from "../context/LoaderContext";

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) throw new Error("useLoader must be used within LoaderProvider");
  return context;
};
