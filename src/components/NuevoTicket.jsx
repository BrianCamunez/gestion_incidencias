import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NuevoTicket = () => {

    const [alumno, setAlumno] = useState()
    const[fecha, setFecha] = useState()
    const [aula, setAula] = useState()
    const [grupo, setGrupo] = useState()
    const [ordenador, setOrdenador] = useState()
    const [descripcion, setDescripcion] = useState()

    const navigate = useNavigate();

    const mirarRegistro = (evento) => {

        evento.preventDefault()

        const tiquetsGuardados = JSON.parse(localStorage.getItem('dades_tiquets'))

        const ticketNuevo = {codigo: String(tiquetsGuardados.length + 1), fecha:  fecha, fechaResuelto: null, aula: aula, grupo: grupo, ordenador: ordenador, descripcion: descripcion, alumno: alumno, estado: "false", comentarios: []}

        tiquetsGuardados.push(ticketNuevo)

        localStorage.setItem("dades_tiquets", JSON.stringify(tiquetsGuardados))

        navigate('/panel')

    }

    return (
        <>
            <main className="container mt-5">
                <div className="pt-5">
                    <h1 className="w-100 text-center">Nuevo ticket</h1>
                    <form action="" className="form p-4 border shadow bordered mt-5 mx-auto" style={{ width: '500px' }} onSubmit={mirarRegistro}>
                        <label htmlFor="alumno" className="mt-2 form-label">Alumno: </label>
                        <input type="text" className="form-control" placeholder='Nombre del alumno' value={alumno} onChange={(evento) => setAlumno(evento.target.value)} />
                        <label htmlFor="fecha" className="mt-2 form-label">Fecha: </label>
                        <input type="date" className="form-control w-50" value={fecha} onChange={(evento) => setFecha(evento.target.value)}/>
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