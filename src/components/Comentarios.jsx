import React, { useEffect, useState } from 'react';

import { Comentario } from './Comentario';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../supabase/auth';



export const Comentarios = () => {
  const { id } = useParams();
  const [error, setError] = useState(null);


  useEffect(() => {
    const obtenerComentarios = async () => {
      try {
        const { data, error } = await supabase
          .from('comentarios')
          .select('*')
          .eq('id_tiquet', id); // Suponiendo que 'id_ticket' es el campo que vincula con el ticket

        if (error) {
          setError('Error al obtener los comentarios: ' + error.message);
        } else {
          setComentarios(data); // Establecer los comentarios en el estado
        }
      } catch (err) {
        setError('Hubo un problema al obtener los comentarios: ' + err.message);
      }
    };

    obtenerComentarios();
  }, [id]);

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

    //-------------------------------------------
    const correoUser = JSON.parse(localStorage.getItem("logeoConfirmado")).email;

const sacarIdUser = async () => {
  try {
    // Obtener el id_user del usuario basado en su correo
    let { data: users, error } = await supabase
      .from('users')
      .select('id_user')
      .eq('email', correoUser);

    if (error) {
      console.error('Error al obtener el ID del usuario:', error.message);
      return null; // Devolver null si hay un error
    } else {
      console.log('ID del usuario:', users[0].id_user);
      return users[0].id_user; // Retornar el id del usuario
    }
  } catch (err) {
    console.error('Error al obtener el ID del usuario:', err.message);
    return null; // Devolver null si ocurre un error inesperado
  }
};

const crearComentario = async (nuevoComentario, id) => {
  try {
    // Obtener el id del usuario
    const idUser = await sacarIdUser();
    
    if (idUser === null) {
      console.error('No se pudo obtener el ID del usuario');
      return; // Detener la función si no se pudo obtener el ID
    }
    
    // Crear el comentario para insertar en Supabase
    const nuevoComentarioSupabase = {
      created_at: nuevoComentario.fechaActual,
      comentario: nuevoComentario.comentario,
      id_user: idUser, // Usamos el idUser obtenido
      id_tiquet: id,   // El id del ticket proporcionado
    };

    // Insertar el comentario en Supabase
    const { data, error } = await supabase
      .from('comentarios')  // Asumimos que la tabla se llama 'comentarios'
      .insert([nuevoComentarioSupabase]);

    if (error) {
      console.error('Error al agregar el comentario:', error.message);
    } else {
      console.log('Comentario agregado con éxito:', data);
    }
  } catch (err) {
    console.error('Hubo un error al crear el comentario:', err.message);
  }
};
  }
  

  return (
    <>
      <main className="container mt-5">
        <div className="d-flex">
          <h1>Comentarios</h1><Link to="/panel" className="btn btn-primary ms-auto align-content-center">Volver</Link>

        </div>

        <h2 className="my-4">Código ticket: <span>{id}</span></h2>
        <div>
          <Comentario onSubmit={actualizarComentarios}></Comentario>
          <div className="mt-4">
            <h1>Comentarios</h1>
            {console.log(comentarios)}
            {comentarios.length > 0 ? (
              comentarios.map((comentario) => (
                <div key={comentario.id} className="card mb-3">
                  <div className="card-body">
                    <p>{comentario.comentario}</p>
                    <p className="small text-end">Fecha: {new Date(comentario.created_at).toLocaleString()}</p>
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