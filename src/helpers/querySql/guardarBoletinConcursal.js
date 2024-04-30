'use strict'
const {getConnection} = require('../../database/database');

const GuardarBoletinConcursal = async (data) => {
    // const result = await prisma.Boletin_Concursal.create({
    //     data: data,
    // })

    // return result;
    
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Boletin_Concursal SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Boletin_Concursal WHERE id_boletin_concursal  = ?', [result.insertId]);
    return result2[0];
}

const GuardarPublicacionesBoletinConcursal = async (data) => {
    // await prisma.Boletin_Concursal_Publicaciones.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Concursal_Publicaciones (' + keys.join(', ') + ') VALUES ';
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        // obten la key y el valor de cada elemento del array
        const values = Object.values(element);
        // arma la consulta
        for (let i = 0; i < values.length; i++) {
            // elimina las comillas simples y dobles de los valores solo si es un string
            if (typeof values[i] === 'string') {
                values[i] = "'" + values[i].replace(/'/g, '').replace(/"/g, '') + "'";
            } else {
                values[i] = "'" + values[i] + "'";
            }
        }
        search += `(${values.join(', ')}),`;
    }
    search = search.slice(0, -1);
    // ejecuta la consulta
    await connection.query(search);
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
        
    //     await connection.query('INSERT INTO Boletin_Concursal_Publicaciones SET ?', [element]);
    // }
}

const eliminarBoletinConcursal = async (id) => {
    // await prisma.Boletin_Concursal.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Concursal WHERE data_searchId = ?', [id]);
}

module.exports = {
    GuardarBoletinConcursal,
    GuardarPublicacionesBoletinConcursal,
    eliminarBoletinConcursal
}