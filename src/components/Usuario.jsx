import React, { useState } from 'react';

const Usuario = () => {

    const [usuarios, setUsuarios] = useState(JSON.parse(localStorage.getItem("dades_usuaris")))


    const cambiarRol = (idUsuario, rolNuevo) =>{

        const datosGuardados = [...usuarios]
        const usuariosActualizados = datosGuardados.map(usuario =>{
            if(usuario.id == idUsuario){
                usuario.rol = rolNuevo
            }
            return usuario
        })
        localStorage.setItem("dades_usuaris", JSON.stringify(usuariosActualizados))
        setUsuarios(usuariosActualizados)

    }


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
            {usuarios && usuarios.map((usuario, index) => (
                        <tr key={index}>
                            <th scope="row">{usuario.id}</th>
                            <td>{usuario.usuario}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.password}</td>
                            <td>
                                <select value={usuario.rol} style={{width: "100%"}} onChange={(evento) => cambiarRol(usuario.id, evento.target.value)}>
                                    <option value="alumno">Alumno</option>
                                    <option value="profesor">Profesor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
       </div>
    )
}

export default Usuario