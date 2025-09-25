// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import Navbar from "./components/navbar";
import ReportPage from "./pages/ReportPage";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import SampleReportPage from "./pages/SampleReportPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LegalNoticePage from "./pages/LegalNoticePage";
import AboutUsPage from "./pages/AboutUsPage";
import SessionCleanup from "./components/SessionCleanup";

function App() {
  return (
    <>
    <SessionCleanup />
    <Router>
      <div className="print:hidden">
        <Navbar />
      </div>
      <div className="p-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/producto" element={<ProductPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/descargar-ejemplo" element={<SampleReportPage />} />
          <Route path="/privacidad" element={<PrivacyPolicyPage />} />
          <Route path="/aviso-legal" element={<LegalNoticePage />} />
          <Route path="/sobre-nosotros" element={<AboutUsPage />} />
          <Route
            path="/buscar"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/informe"
            element={
              <ProtectedRoute>
                <ReportPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </Router>
    </>
  );
}

export default App;
