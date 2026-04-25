import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from './components/NavBar';
import Footer from './components/Footer';
import Labios from './pages/labios';
import Rostro from './pages/rostro';
import Solar from './pages/solar';
import Combos from './pages/combos';
import Inicio from './pages/inicio';
import Cuerpo from "./pages/cuerpo";
import Contacto from "./pages/contacto";
import './index.css';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/labios" element={<Labios />} />
        <Route path="/rostro" element={<Rostro />} />
        <Route path="/solar" element={<Solar />} />
        <Route path="/combos" element={<Combos />} />
        <Route path="/cuerpo" element={<Cuerpo />} />
       <Route path="/contacto" element={<Contacto />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;