import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail"; // NEW
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import StudentLife from "./pages/StudentLife";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Footer from "./components/Footer";
import { FrameColorProvider } from "./context/FrameColorContext"; // NEW

function App() {
  return (
    <FrameColorProvider>
      {" "}
      {/* NEW */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route
          path="/programs/:categoryId/:slug"
          element={<ProgramDetail />}
        />{" "}
        {/* NEW */}
        <Route path="/about" element={<About />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/student-life" element={<StudentLife />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </FrameColorProvider>
  );
}

export default App;
