import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/auth';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [loading, setLoading] = useState(false);

  console.log(nombre);

  const navigate = useNavigate();

  const manejarRegistro = async (evento) => {
    evento.preventDefault();
    setMensajeError('');
    setLoading(true);

    try {
      // Usamos Supabase Auth para registrar al usuario (sin hacer hash de la contraseña)
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: contrasena, // Usamos la contraseña tal cual (Supabase se encarga de hashearla internamente para la autenticación)
      });

      if (error) {
        setMensajeError(error.message);
      } else {
        // Insertamos los datos adicionales del usuario en la tabla "users" (incluyendo la contraseña sin hacerle hash)
        const { data, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              nombre: nombre,
              apellido: apellido,
              email: email,
              password: contrasena, 
            },
          ]);

        console.log(user);
        console.log(data);

        if (insertError) {
          setMensajeError('Hubo un problema al guardar los datos adicionales.' + JSON.stringify(insertError));
        } else {
          console.log('Usuario registrado y datos guardados:', data);
          alert('¡Registro exitoso! Te hemos enviado un correo de verificación.');
          navigate('/panel');  // Redirige al usuario al panel
        }
      }
    } catch (error) {
      setMensajeError('Hubo un problema con el registro.');
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <main className="container mt-5">
      <div className="pt-5">
        <h1 className="w-100 text-center">Registro</h1>
        <form className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }} onSubmit={manejarRegistro}>
          <label htmlFor="nombre" className="mt-2 form-label">Nombre: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
          />
          <label htmlFor="apellido" className="mt-2 form-label">Apellido: </label>
          <input
            type="text"
            className="form-control"
            placeholder="Tu apellido"
            value={apellido}
            onChange={(evento) => setApellido(evento.target.value)}
          />
          <label htmlFor="email" className="mt-2 form-label">Email: </label>
          <input
            type="email"
            className="form-control"
            placeholder="usuario@mail.com"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
          />
          <label htmlFor="pass" className="mt-2 form-label">Contraseña: </label>
          <input
            type="password"
            className="form-control"
            value={contrasena}
            onChange={(evento) => setContrasena(evento.target.value)}
          />
          <input
            type="submit"
            className="mt-4 w-100 btn btn-primary"
            value={loading ? 'Registrando...' : 'Registrar'}
            disabled={loading}
          />
        </form>
        {mensajeError && <div className="text-danger mt-3">{mensajeError}</div>}
      </div>
    </main>
  );
};

export default Registro;