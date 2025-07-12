import Navbar from "./components/NavBar";
import "./globals.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
