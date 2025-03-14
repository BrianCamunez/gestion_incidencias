import React, { useEffect, useState } from 'react';


export const Comentario = ({ onSubmit }) => {

    const [coment, setComentario] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        const fechaActual = new Date().toGMTString();
        const nuevoComentario = {
            coment,
            fechaActual
        }
        onSubmit(nuevoComentario);
        
    }

    return (
        <form onSubmit={handleSubmit} className="form card p-3 shadow">
            <label htmlFor="comentario" className="form-label">Comentario: </label>
            <textarea className="form-control" cols="3" value={coment} onChange={(e) => setComentario(e.target.value)}></textarea>
            <div className="d-flex align-items-center mt-3">
                <button className="btn btn-success ms-auto">Añadir comentario</button>
            </div>
        </form>
    )
}