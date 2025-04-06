import React, { useEffect, useState } from 'react';
import { Comentario } from './Comentario';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../supabase/auth';

export const Comentarios = () => {
  const { id } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState(null);

  // Obtener comentarios al cargar componente o cuando cambia el ID del ticket
  const obtenerComentarios = async () => {
    try {
      const { data, error } = await supabase
        .from('comentarios')
        .select('*')
        .eq('id_tiquet', id)
        .order('created_at', { ascending: true });

      if (error) {
        setError('Error al obtener los comentarios: ' + error.message);
      } else {
        setComentarios(data);
      }
    } catch (err) {
      setError('Hubo un problema al obtener los comentarios: ' + err.message);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, [id]);

  // Obtener el ID del usuario logueado por correo (lo ideal sería tener esto del auth directamente)
  const sacarIdUser = async () => {
    const correoUser = JSON.parse(localStorage.getItem("logeoConfirmado"))?.email;
    if (!correoUser) return null;

    const { data: users, error } = await supabase
      .from('users')
      .select('id_user')
      .eq('email', correoUser);

    if (error || !users?.length) {
      console.error('Error al obtener el ID del usuario:', error?.message);
      return null;
    }

    return users[0].id_user;
  };

  // Insertar un nuevo comentario y actualizar la lista
  const actualizarComentarios = async (nuevoComentario) => {
    try {
      const idUser = await sacarIdUser();
      if (!idUser) return;

      const nuevoComentarioSupabase = {
        created_at: nuevoComentario.fechaActual,
        comentario: nuevoComentario.coment,
        id_user: idUser,
        id_tiquet: id,
      };

      const { error } = await supabase
        .from('comentarios')
        .insert([nuevoComentarioSupabase]);

      if (error) {
        console.error('Error al insertar comentario:', error.message);
      } else {
        // Vuelve a cargar los comentarios desde la base de datos
        obtenerComentarios();
      }
    } catch (err) {
      console.error('Error inesperado al insertar comentario:', err.message);
    }
  };

  return (
    <main className="container mt-5">
      <div className="d-flex">
        <h1>Comentarios</h1>
        <Link to="/panel" className="btn btn-primary ms-auto align-content-center">Volver</Link>
      </div>

      <h2 className="my-4">Código ticket: <span>{id}</span></h2>

      <Comentario onSubmit={actualizarComentarios} />

      <div className="mt-4">
        <h1>Comentarios</h1>
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
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </main>
  );
};

export default Comentarios;
