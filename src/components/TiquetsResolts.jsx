const TiquetsResolts = () => {

    const tickets = JSON.parse(localStorage.getItem('dades_tiquets'))

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
                <td><button className="btn btn-info" title="Ver comentarios"><i className="bi bi-chat-left-text"></i></button></td>
                <td><button className="btn btn-danger" title="Eliminar ticket"><i className="bi bi-trash3"></i></button></td>
            </tr>
        ))
    )
}

export default TiquetsResolts