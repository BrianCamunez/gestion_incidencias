import { Link } from 'react-router-dom'

const TiquetsResoltsSupabase = ({tickets, borrarTickets}) => {

    return(
        tickets.filter(ticket => ticket.estado === true).map((ticket) => (
            <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.fecha}</td>
                <td>{ticket.fechaResuelto}</td>
                <td>{ticket.aula}</td>
                <td>{ticket.grupo}</td>
                <td>{ticket.ordenador}</td>
                <td>{ticket.descripcion}</td>
                <td>{ticket.users.nombre}</td>
                <td> <Link to={`/comentarios/${ticket.id}`}><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></Link></td>
                <td><button className="btn btn-danger" title="Eliminar ticket" onClick={ ()=>{borrarTickets(ticket.id)}}><i className="bi bi-trash3"></i></button></td>
            </tr>
        ))
    )
}

export default TiquetsResoltsSupabase