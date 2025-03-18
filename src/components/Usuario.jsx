const Usuario = () => {

    const datosUsuarios = JSON.parse(localStorage.getItem("dades_usuaris"))

    console.log(datosUsuarios)

    return (
       <div style={{justifyContent: "center", display: "flex", marginTop: "50px"}}>
         <table className="table table-bordered" style={{width: "1300px"}}>
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contraseña</th>
                    <th scope="col">Rol</th>
                </tr>
            </thead>
            <tbody>
            {datosUsuarios && datosUsuarios.map((usuario, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.password}</td>
                            <td>{usuario.rol}</td>
                        </tr>
                    ))}
            </tbody>
        </table>
       </div>
    )
}

export default Usuario