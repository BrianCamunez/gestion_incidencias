import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useParams } from 'react-router-dom';



export const Comentarios = () => {
  const { id } = useParams();
  return (
    <>
      <Header />
      <main className="container mt-5">
        <div className="d-flex">
          <h1>Comentarios</h1><button className="btn btn-link ms-auto"> Volver </button>

        </div>

        <h2 className="my-4">Código ticket: <span>{id}</span></h2>
        <div>
          <form action="" className="form card p-3 shadow">
            <label htmlFor="comentario" className="form-label">Comentario: </label>
            <textarea className="form-control" cols="3"></textarea>
            <label htmlFor="fecha" className="form-label me-2 mt-3">Fecha: </label>
            <div className="d-flex align-items-center">
              <input type="datetime-local" className="form-control w-25" />
              <button className="btn btn-success ms-auto">Añadir comentario</button>
            </div>
          </form>

          <div className="mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-3 mt-2">
                <h5 className="text-end">Autor: <span>Javier Caraculo</span><span className="ms-4">12/10/2022</span></h5>
                <p>Este es un comentario Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit amet dignissimos laudantium blanditiis fuga recusandae sed culpa, earum pariatur repellat esse provident eaque totam quo sint iste, inventore deleniti quis.</p>
              </div>
            ))}
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