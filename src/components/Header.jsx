import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  const sacarDatos = JSON.parse(localStorage.getItem('logeoConfirmado'))

  let emailRegistrado = 'No has iniciado sesión'
  let cerrarSesion = false
  let rolUsuario = ""

  if(sacarDatos){
    emailRegistrado = sacarDatos.email
    cerrarSesion = true
    rolUsuario = sacarDatos.rol
  }

  const logout = () => {
    localStorage.removeItem('logeoConfirmado');
    navigate('/');  // Redirige al usuario al inicio de sesión después de cerrar sesión
  }

    return (
        <header>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">Gestión de incidencias FPLLEFIA</a>
          <div>
            <Link to="/panel" className="btn btn-secondary ms-2">PANEL</Link>
            {/* Si el usuario no está logueado, mostrar los enlaces de Login y Registro */}
            {!cerrarSesion ? (
              <>
                <Link to="/" className="btn btn-secondary ms-2">LOGIN</Link>
                <Link to="/registro" className="btn btn-secondary ms-2">REGISTRO</Link>
              </>
            ) : (
              // Si está logueado, mostrar el botón de cerrar sesión
              <>
                <button className="btn btn-danger ms-2" onClick={logout}>Cerrar sesión</button>
              </>
            )}
            {rolUsuario == "admin" ? (
                <>
                  <Link to="/Usuario" className="btn btn-secondary ms-2">Panel Usuarios</Link>
                </>
            ) : (
              ''
            )}
          </div>
          <div>
          {emailRegistrado}
          </div>
        </div>
      </nav>
    </header>
    )
}

export default Header;