import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AppProvider, useApp } from "./context/AppContext";
import LandingPage from "./pages/LandingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FeaturesPage from "./pages/FeaturesPage";
import AlgorithmPage from "./pages/AlgorithmPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CategoryManager from "./pages/CategoryManager";
import JudgeInterface from "./pages/JudgeInterface";
import ResultsPage from "./pages/ResultsPage";
import { useContext } from "react";

function Header() {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useApp();
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <header style={{ padding: "10px", background: themeName === "dark" ? "#333" : "#eee", display: "flex", justifyContent: "space-between" }}>
      <h1>Score App</h1>
      <div>
        <button onClick={() => toggleTheme("light")}>Light</button>
        <button onClick={() => toggleTheme("dark")}>Dark</button>
        <button onClick={() => toggleTheme("event")}>Event</button>
        {user && <button onClick={logout}>Logout</button>}
      </div>
    </header>
  );
}

function AppContent() {
  const { user } = useApp();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/algorithm" element={<AlgorithmPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/categories"
          element={user?.role === "admin" ? <CategoryManager /> : <Navigate to="/login" />}
        />
        <Route
          path="/judge"
          element={user?.role === "judge" ? <JudgeInterface /> : <Navigate to="/login" />}
        />
        <Route
          path="/results"
          element={user ? <ResultsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;
