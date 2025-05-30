import { Link } from 'react-router-dom'

const TiquetsResolts = ({tickets, borrarTickets}) => {

    return(
        tickets.filter(ticket => ticket.estado === 'true').map((ticket) => (
            <tr key={ticket.codigo}>
                <td>{ticket.codigo}</td>
                <td>{ticket.fecha}</td>
                <td>{ticket.fechaResuelto}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grupo}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.alumno}</td>
                <td> <Link to={`/comentarios/${ticket.codigo}`}><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></Link></td>
                <td><button className="btn btn-danger" title="Eliminar ticket" onClick={ ()=>{borrarTickets(ticket.codigo)}}><i className="bi bi-trash3"></i></button></td>
            </tr>
        ))
    )
}

export default TiquetsResolts