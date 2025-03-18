import React, { useEffect, useState } from 'react';

import { Comentario } from './comentario';
import { useParams } from 'react-router-dom';



export const Comentarios = () => {
  const { id } = useParams();

  useEffect(() => {
    const ticketsGuardados = JSON.parse(localStorage.getItem("dades_tiquets"))
    const ticketEntrado = ticketsGuardados.find(ticket => ticket.codigo === id)
    if(ticketEntrado) {
      setComentarios(ticketEntrado.comentarios || [])
    }
  },[id])

  const [comentarios, setComentarios] = useState([]);

  const actualizarComentarios = (nuevoComentario) => {
    const comentariosActualizados = [...comentarios, nuevoComentario]
    setComentarios(comentariosActualizados)
    //-------------------------------------------
   const ticketsGuardados = JSON.parse(localStorage.getItem("dades_tiquets"));
  const ticketEntrado = ticketsGuardados.find(ticket => ticket.codigo === id);
// Actualizar los comentarios del ticket encontrado
ticketEntrado.comentarios = comentariosActualizados;
// Actualizar el ticket en el array sin modificar los demás tickets
const ticketsActualizados = ticketsGuardados.map(ticket => 
  ticket.codigo === id ? { ...ticket, ...ticketEntrado } : ticket
);
// Si necesitas guardar el array actualizado en el localStorage
localStorage.setItem("dades_tiquets", JSON.stringify(ticketsActualizados));
  }

  return (
    <>
      <main className="container mt-5">
        <div className="d-flex">
          <h1>Comentarios</h1><button className="btn btn-link ms-auto"> Volver </button>

        </div>

        <h2 className="my-4">Código ticket: <span>{id}</span></h2>
        <div>
          <Comentario onSubmit={actualizarComentarios}></Comentario>
          <div className="mt-4">
          <h1>Comentarios</h1>
          {comentarios.length > 0 ? (
            comentarios.map((comentario, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <p>{comentario.coment}</p>
                  <p className="small text-end">Fecha: {comentario.fechaActual}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No hay comentarios para este ticket.</p>
          )}
          </div>
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
              <input className="form-control" value="Estee es un comentario sobre esta incidencia" readOnly />
              <p className="small text-end">Autor: <span>Pepe Loco</span></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" className="btn btn-primary">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comentarios;