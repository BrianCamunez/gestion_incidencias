import React from 'react';
import { useState, useEffect } from 'react';

const NuevoTicket = () => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')

    const [mensajeError, setMensajeError] = useState('');

    const navigate = useNavigate();

    const mirarRegistro = (evento) => {

        evento.preventDefault()

        const usuariosGuardados = JSON.parse(localStorage.getItem('dades_usuaris'))

        const usuariosExistentes = usuariosGuardados.some(usuario => usuario.email === email)

        if (usuariosExistentes) {
            setMensajeError('El correo ya esta registrado');
            return;
        }

        const nuevoUsuario = { usuario: nombre, apellido: apellido, password: contrasena, rol: 'alumno', email: email }

        usuariosGuardados.push(nuevoUsuario)

        localStorage.setItem('dades_usuaris', JSON.stringify(usuariosGuardados))

        localStorage.setItem('logeoConfirmado', JSON.stringify({ email: nuevoUsuario.email, rol: nuevoUsuario.rol }))

        navigate('/panel')

        return (
            <>
                <main className="container mt-5">
                    <div className="pt-5">
                        <h1 className="w-100 text-center">Registro</h1>
                        <form action="" className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '400px' }} onSubmit={mirarRegistro}>
                            <label htmlFor="nombre" className="mt-2 form-label">Nombre: </label>
                            <input type="text" className="form-control" placeholder="Tu nombre" value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
                            <label htmlFor="apellido" className="mt-2 form-label">Apellido: </label>
                            <input type="text" className="form-control" placeholder="Tu apellido" value={apellido} onChange={(evento) => setApellido(evento.target.value)} />
                            <label htmlFor="email" className="mt-2 form-label">User: </label>
                            <input type="email" className="form-control" placeholder="usuario@mail.com" value={email} onChange={(evento) => setEmail(evento.target.value)} />
                            <label htmlFor="pass" className="mt-2 form-label">Contraseña: </label>
                            <input type="password" className="form-control" value={contrasena} onChange={(evento) => setContrasena(evento.target.value)} />
                            <input type="submit" className="mt-4 w-100 btn btn-primary" value="Entrar" id="enviar" />
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
        )
    }
}
    export default NuevoTicket