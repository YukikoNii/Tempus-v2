import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import CreditsPage from "./pages/CreditPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactFormPage from "./pages/ContactFormPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import Home from "./pages/Home";
import Calendar from "./pages/CalendarPage";
import TodoPage from "./pages/TodoPage";
import Time from "./pages/TimePage";
import SettingsPage from "./pages/SettingsPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactFormPage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stopwatch" element={<Time />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
