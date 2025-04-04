import React from 'react';

import { Link } from 'react-router-dom'

const TiquetsPendentsSupabase = ({tickets, resolverTickets, borrarTickets}) => {

    return (
        tickets.filter(ticket => ticket.estado === false).map((ticket) => (
            <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.fecha}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grupo}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.users.nombre}</td>
                <td><button className="btn btn-success" title="Resolver ticket" onClick={ ()=>{resolverTickets(ticket.id)}}>Resolver</button></td>
                <td><button className="btn btn-warning" title="Añadir comentario"><i className="bi bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></button></td>
                <td> <Link to={`/comentarios/${ticket.id}`}><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></Link></td>
                <td><button className="btn btn-danger" title="Eliminar ticket" onClick={ ()=>{borrarTickets(ticket.id)}}><i className="bi bi-trash3"></i></button></td>
            </tr>
        ))
    )
}

export default TiquetsPendentsSupabase