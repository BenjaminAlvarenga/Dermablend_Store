import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import Dashcard from "./components/Dashcard";

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <>
      <Router>
        <Nav />
        <div className="flex">
          <div className="sidebar">
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
          </div>
          <Routes className="w-auto">
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
