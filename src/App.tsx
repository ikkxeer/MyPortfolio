import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
// Importamos lo que siempre estará visible
import CustomCursor from './components/All/CustomCursor'
import AuroraBackground from './components/All/AuroraBackground'
import Navbar from './components/Home/Navbar'

import Home from './pages/Home'
import SobreMi from './pages/SobreMi'
import Asignaturas from './pages/Asignaturas'

function App() {
  return (
    <BrowserRouter>

      {/* Esto se ve en todas las páginas */}
      <CustomCursor />
      <AuroraBackground />
      <Navbar />

      {/* Esto cambia según la URL */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-mi" element={<SobreMi />} />
        <Route path="/asignaturas" element={<Asignaturas />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App