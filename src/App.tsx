import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";
import "./globals.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AppRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#40292B",
            color: "#fff",
            borderRadius: "8px",
          },
        }}
      />
    </div>
  );
}

export default App;
