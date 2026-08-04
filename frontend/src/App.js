import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import AnalysisDetail from "./pages/AnalysisDetail";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import ProductDetail, { WorkNotFound } from "./pages/ProductDetail";
import Terminal from "./pages/Terminal";
import Work from "./pages/Work";
import { getLegacyWorkPath } from "./data/portfolio";
import "./App.css";

const LegacyProjectRedirect = () => {
  const { id } = useParams();
  return <Navigate replace to={getLegacyWorkPath(id)} />;
};

const SiteLayout = () => (
  <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <Header />
    <main id="main-content" className="site-main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/products/:slug" element={<ProductDetail />} />
        <Route path="/work/analysis/:slug" element={<AnalysisDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Navigate replace to="/work" />} />
        <Route path="/projects/:id" element={<LegacyProjectRedirect />} />
        <Route path="*" element={<WorkNotFound kind="page" />} />
      </Routes>
    </main>
    <Footer />
  </>
);

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/*" element={<SiteLayout />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
