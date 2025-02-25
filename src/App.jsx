import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Panel from './views/panel';
import Registro from './components/Registro';
import InicioSesion from './components/InicioSesion';


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InicioSesion />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
