import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/auth'; // Asegúrate que el path es correcto

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  // Obtener los usuarios desde Supabase
  const obtenerUsuarios = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*');

      if (error) {
        console.error('Error al obtener usuarios:', error.message);
        setError('No se pudieron cargar los usuarios.');
      } else {
        setUsuarios(data);
      }
    } catch (err) {
      console.error('Error inesperado:', err.message);
      setError('Error inesperado al cargar usuarios.');
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Cambiar el rol en Supabase
  const cambiarRol = async (idUsuario, rolNuevo) => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ rol: rolNuevo })
        .eq('id_user', idUsuario);

      if (error) {
        console.error('Error al cambiar el rol:', error.message);
        return;
      }

      // Actualizar la lista local
      const usuariosActualizados = usuarios.map(usuario =>
        usuario.id_user === idUsuario ? { ...usuario, rol: rolNuevo } : usuario
      );
      setUsuarios(usuariosActualizados);
    } catch (err) {
      console.error('Error inesperado al cambiar rol:', err.message);
    }
  };

  return (
    <div style={{ justifyContent: "center", display: "flex", marginTop: "50px" }}>
      <table className="table table-bordered" style={{ width: "1300px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_user}>
              <td>{usuario.id_user}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.email}</td>
              <td>
                <select
                  value={usuario.rol}
                  style={{ width: "100%" }}
                  onChange={(e) => cambiarRol(usuario.id_user, e.target.value)}
                >
                  <option value="alumno">Alumno</option>
                  <option value="profesor">Profesor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {error && (
        <div className="alert alert-danger mt-3" style={{ width: '80%' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Usuario;
