import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Ticker from "./components/Ticker.jsx";
import Schedule from "./components/Schedule.jsx";
import Registration from "./components/Registration.jsx";
import StudentPortal from "./components/StudentPortal.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import AdminPortal from "./components/AdminPortal.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Footer from "./components/Footer.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <Schedule />
      <Registration />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route
            path="/student-portal/dashboard"
            element={<StudentDashboard />}
          />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
