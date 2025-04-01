import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabase/auth';

const InicioSesion = () => {

  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensajeError, setMensajeError] = useState('')
  const [logeado, setLogeado] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    mirarLogeo()
  }, [])

  const mirarLogeo = () => {
    const logeoConfirmado = localStorage.getItem('logeoConfirmado')
    if (logeoConfirmado) {
      setLogeado(true)
    }
  }

  const comprobarLogin = async (evento) => {

    evento.preventDefault()

    let { data: users, error } = supabase.from('users').select("email").eq('email', email).single()

    const { user } = await supabase.auth.signInWithPassword({
      email,
      password: contrasena,
    });

    if (error) {
      setMensajeError(error.message);
    }

    let { data: rol, eror } = await supabase.from('users').select('rol').eq('email', email).single()

    localStorage.setItem('logeoConfirmado', JSON.stringify({ email, rol: rol.rol }));

    setLogeado(true);
    setMensajeError('');
    navigate('/panel');
  }

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('logeoConfirmado');
    setLogeado(false);
    console.log('logout');
  }


  if (logeado) {
    return (
      <>
        <main className="container mt-5">
          <h1 className="w-100 text-center">Bienvenido!</h1>
          <button className="btn btn-danger" onClick={logout}>Cerrar sesión</button>
        </main>
      </>
    )
  }

  return (
    <>
      <main className="container mt-5">
        <div className="pt-5">
          <h1 className="w-100 text-center">Login</h1>
          <form className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }} onSubmit={comprobarLogin}>
            <label htmlFor="email" className="mt-2 form-label">User: </label>
            <input
              type="text"
              className="form-control"
              placeholder="usuario@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pass" className="mt-2 form-label">Contraseña: </label>
            <input type="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <input
              type="submit"
              className="mt-4 w-100 btn btn-primary"
              value="Entrar"
            />
          </form>
          {mensajeError && <div className="text-danger mt-3">{mensajeError}</div>}
        </div>
      </main>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Observaciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Código incidencia: <span>123546</span></p>
              <label htmlFor="comentario" className="form-label">Comentario:</label>
              <input className="form-control" defaultValue="Este es un comentario sobre esta incidencia" />
              <p className="small text-end">Autor: <span>Pepe Loco</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    </>
  );
};

export default InicioSesion;