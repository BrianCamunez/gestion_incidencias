import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Panel from './views/panel';
import Registro from './components/Registro';
import InicioSesion from './components/InicioSesion';
import Comentarios from './components/Comentarios';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/comentarios/:id" element={<Comentarios />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
