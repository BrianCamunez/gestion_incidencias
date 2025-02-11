export const inicializacionLocalStorage = () => {
    const datos_tiquets = [
        { codigo: '123459', fecha: '18/04/2023', fechaResuelto: 'NULL', aula: 'T6', grupo: 'DAW1', ordenador: 'PC3', descripcion: 'Error de impresora', alumno: 'Ana Martínez', estado: 'false' },
        { codigo: '123460', fecha: '19/04/2023', fechaResuelto: '23/04/2023', aula: 'T8', grupo: 'DAW2', ordenador: 'PC4', descripcion: 'Problema de acceso a archivos', alumno: 'Pedro Gómez', estado: 'true' },
        { codigo: '123461', fecha: '20/04/2023', fechaResuelto: 'NULL', aula: 'T6', grupo: 'DAW1', ordenador: 'PC1', descripcion: 'Aplicación se cierra inesperadamente', alumno: 'Sofía Fernández', estado: 'false' },
        { codigo: '123462', fecha: '21/04/2023', fechaResuelto: '25/04/2023', aula: 'T7', grupo: 'DAW2', ordenador: 'PC2', descripcion: 'Problema de conexión a la red', alumno: 'Luis Torres', estado: 'true' },
        { codigo: '123463', fecha: '22/04/2023', fechaResuelto: 'NULL', aula: 'T8', grupo: 'DAW1', ordenador: 'PC3', descripcion: 'Archivos corruptos', alumno: 'Carolina Ramírez', estado: 'false' },
        { codigo: '123464', fecha: '23/04/2023', fechaResuelto: 'NULL', aula: 'T6', grupo: 'DAW1', ordenador: 'PC4', descripcion: 'Pantalla en blanco', alumno: 'Juan Rodríguez', estado: 'false' },
        { codigo: '123465', fecha: '24/04/2023', fechaResuelto: 'NULL', aula: 'T7', grupo: 'DAW2', ordenador: 'PC5', descripcion: 'Teclado no funciona', alumno: 'Laura Martínez', estado: 'false' }
    ];

    if (!localStorage.getItem('dades_tiquets')) {
        localStorage.setItem('dades_tiquets', JSON.stringify(datos_tiquets));
    }


    const datos_usuarios = [
        { usuario: 'Ana', apellido: 'Martínez', password: '123456', rol: 'alumno', email: 'anamartinez@gmail.com' },
        { usuario: 'Pedro', apellido: 'Gómez', password: '123456', rol: 'alumno', email: 'pedrogomez@gmail.com' },
        { usuario: 'Sofía', apellido: 'Fernández', password: '123456', rol: 'alumno', email: 'sofiafernandez@gmail.com' },
        { usuario: 'Luis', apellido: 'Torres', password: '123456', rol: 'alumno', email: 'luistorres@gmail.com' },
        { usuario: 'Carolina', apellido: 'Ramírez', password: '123456', rol: 'alumno', email: 'carolinaramirez@gmail.com' },
        { usuario: 'Juan', apellido: 'Rodríguez', password: '123456', rol: 'alumno', email: 'juanrodriguez@gmail.com' },
        { usuario: 'Laura', apellido: 'Martínez', password: '123456', rol: 'alumno', email: 'lauramartinez@gmail.com' },
        { usuario: 'Carlos', apellido: 'Arrebola', password: '123456', rol: 'profesor', email: 'carlosarrebola@gmail.com' },
        { usuario: 'Brian', apellido: 'Camuñez', password: '123456', rol: 'admin', email: 'briancamunez@gmail.com' }
    ];

    if (!localStorage.getItem('dades_usuaris')) {
        localStorage.setItem('dades_usuaris', JSON.stringify(datos_usuarios));
    }

}