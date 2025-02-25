import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import TiquetsPendents from '../components/TiquetsPendents';
import { inicializacionLocalStorage } from '../lib/funciones';
import TiquetsResolts from '../components/TiquetsResolts';

inicializacionLocalStorage();

const Panel = () => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const storedTickets = localStorage.getItem('dades_tiquets');
        if (storedTickets) {
          setTickets(JSON.parse(storedTickets));
        }
      }, []);

    console.log(tickets);

  return (
    <>
        <Header/>
      <main className="container mt-5">
        <h1>Administración de incidencias</h1>
        <button className="btn btn-secondary mt-4" title="Añadir ticket">Añadir ticket</button>
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
            <TiquetsPendents/>
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
          <TiquetsResolts/>
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