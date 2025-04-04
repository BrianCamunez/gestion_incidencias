import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/auth';

const NuevoTicket = () => {

    const [users, setUsers] = useState([]); 
    const [alumno, setAlumno] = useState()
    const [fecha, setFecha] = useState()
    const [aula, setAula] = useState()
    const [grupo, setGrupo] = useState()
    const [ordenador, setOrdenador] = useState()
    const [descripcion, setDescripcion] = useState()
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('id_user, nombre'); // Traemos el 'id_user' y 'nombre'

            if (error) {
                setError('Error al obtener los usuarios: ' + error.message);
            } else {
                setUsers(data); // Guardamos los usuarios en el estado
            }
        };

        fetchUsers();
    }, []);

    const mirarRegistro = async (evento) => {

        evento.preventDefault();

        try {
            // Insertar el nuevo tiquet sin usar el 'id_alumno'
            const { data, error } = await supabase
                .from('tiquets')
                .insert([
                    {
                        id_alumno: selectedUser,
                        fecha,
                        aula,
                        grupo,
                        ordenador,
                        descripcion,
                        estado: false,
                    }
                ]);

            if (error) {
                setError('Error al añadir el tiquet: ' + error.message);
            } else {
                // Redirigir al panel si todo va bien
                navigate('/panel');
            }
        } catch (err) {
            setError('Error inesperado: ' + err.message);
        }

    }

    return (
        <>
            <main className="container mt-5">
                <div className="pt-5">
                    <h1 className="w-100 text-center">Nuevo ticket</h1>
                    <form action="" className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '500px' }} onSubmit={mirarRegistro}>
                        <label htmlFor="alumno" className="mt-2 form-label">Alumno: </label>
                        <select className="form-control" value={selectedUser || ''} onChange={(e) => setSelectedUser(e.target.value)}>
                            <option value="">Selecciona un alumno</option>
                            {users.map(user => (
                                <option key={user.id_user} value={user.id_user}>
                                    {user.nombre}
                                </option>
                            ))}
                        </select>
                        <label htmlFor="fecha" className="mt-2 form-label">Fecha: </label>
                        <input type="date" className="form-control w-50" value={fecha} onChange={(evento) => setFecha(evento.target.value)} />
                        <label htmlFor="aula" className="mt-2 form-label">Aula: </label>
                        <input type="text" className="form-control" placeholder="Aula" value={aula} onChange={(evento) => setAula(evento.target.value)} />
                        <label htmlFor="grupo" className="mt-2 form-label">Grupo: </label>
                        <input type="text" className="form-control" placeholder="Grupo" value={grupo} onChange={(evento) => setGrupo(evento.target.value)} />
                        <label htmlFor="text" className="mt-2 form-label">Ordenador: </label>
                        <input type="text" className="form-control" placeholder="Ordenador" value={ordenador} onChange={(evento) => setOrdenador(evento.target.value)} />
                        <label htmlFor="descripcion" className="form-label">Descripcion: </label>
                        <textarea className="form-control" cols="5" placeholder='Descripcion' value={descripcion} onChange={(evento) => setDescripcion(evento.target.value)}></textarea>
                        <input type="submit" className="mt-4 w-100 btn btn-primary" value="Entrar" id="enviar" />
                    </form>
                </div>
            </main>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        </>
    )
}


export default NuevoTicket