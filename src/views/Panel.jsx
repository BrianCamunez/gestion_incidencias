import React, { use } from 'react';
import { useState, useEffect } from 'react';
// import TiquetsPendents from '../components/TiquetsPendents';
// import TiquetsResolts from '../components/TiquetsResolts';
import { supabase } from '../supabase/auth';
import { Link } from 'react-router-dom'
import TiquetsPendentsSupabase from '../components/TiquetsPendentsSupabase';
import TiquetsResoltsSupabase from '../components/TiquetsResoltsSupabase';

const Panel = () => {

  const [tiquets, setTiquets] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    obtenerTiquets();
  }, []);

  const obtenerTiquets = async () => {
    try {
      let { data, error } = await supabase
        .from('tiquets')
        .select(`
          *,
          users (nombre)`);

      if (error) {
        setError(error.message);
      } else {
        setTiquets(data);
        console.log(data)
      }
    } catch (err) {
      setError('Hubo un problema al obtener los tiquets: ' + err.message);
    }
  };

  const resolverTickets = async (codigo) => {
    try {
      const { data, error } = await supabase
        .from('tiquets')
        .update({ estado: true, fecha_resuelto: new Date() })
        .eq('id', codigo);

      if (error) {
        console.error('Error al resolver el ticket:', error.message);
      } else {
        obtenerTiquets(); 
      }
    } catch (err) {
      console.error('Hubo un problema al resolver el ticket:', err.message);
    }
  }

  const borrarTickets = async (codigo) => {
    try {
      const { data, error } = await supabase
        .from('tiquets')
        .delete()
        .eq('id', codigo);

      if (error) {
        console.error('Error al borrar el ticket:', error.message);
      } else {
        obtenerTiquets();
      }
    } catch (err) {
      console.error('Hubo un problema al borrar el ticket:', err.message);
    }
  }

  return (
    <>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <Link to={`/nuevoTicket`}><button className="btn btn-secondary mt-4" title="Añadir ticket">Añadir ticket</button></Link>
        <h2 className="mt-5">Tickets pendientes</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Aula</th>
              <th>Grupo</th>
              <th>Ordenador</th>
              <th>Descripción</th>
              <th>Alumno</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <TiquetsPendentsSupabase tickets={tiquets} borrarTickets={borrarTickets} resolverTickets={resolverTickets} />
            {/* <tr>
            <td>haaaaaa</td>
          </tr>
            <TiquetsPendents tickets={tickets} borrarTickets={borrarTickets} resolverTickets={resolverTickets} /> */}
          </tbody>
        </table>
        <h2 className="mt-5">Tickets resueltos</h2>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Código</th>
              <th>Fecha</th>
              <th>Fecha resuelto</th>
              <th>Aula</th>
              <th>Grupo</th>
              <th>Ordenador</th>
              <th>Descripción</th>
              <th>Alumno</th>
            </tr>
          </thead>
          <tbody>
            <TiquetsResoltsSupabase tickets={tiquets} borrarTickets={borrarTickets} />
            {/* <tr>
            <td>haaaaaa</td>
          </tr>
            <TiquetsResolts tickets={tickets} borrarTickets={borrarTickets} /> */}
          </tbody>
        </table>
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

export default Panel;