import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";
import "./globals.css";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/global/Loader";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AppRoutes />
      <Loader />
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
