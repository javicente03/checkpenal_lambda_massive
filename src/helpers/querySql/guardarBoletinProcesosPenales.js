'use strict'
const {getConnection} = require('../../database/database');

const guardarBoletinProcesosPenalesResumenDB = async (data) => {
    // const bolPenal = await prisma.Boletin_Procesos_Penales_Resumen.create({
    //     data: data
    // })

    // return bolPenal;

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Boletin_Procesos_Penales_Resumen SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Boletin_Procesos_Penales_Resumen WHERE id_boletin_procesos_penales_resumen = ?', [result.insertId]);
    return result2[0];
}

const guardarBoletinProcesosPenalesResumenYearDB = async (data) => {
    // await prisma.Boletin_Procesos_Penales_Resumen_Years.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Procesos_Penales_Resumen_Years (' + keys.join(',') + ') VALUES ';
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let values = Object.values(element);
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
    await connection.query(search);
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
        
    //     await connection.query('INSERT INTO Boletin_Procesos_Penales_Resumen_Years SET ?', [element]);
    // }
}

const guardarBoletinProcesosPenalesDetalleDB = async (data) => {
    // await prisma.Boletin_Procesos_Penales_Detalle.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })   

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Procesos_Penales_Detalle (' + keys.join(',') + ') VALUES ';
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let values = Object.values(element);
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
    await connection.query(search);
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
        
    //     await connection.query('INSERT INTO Boletin_Procesos_Penales_Detalle SET ?', [element]);
    // }
}

const guardarListaAnosProcesosPenales = async (data) => {
    // await prisma.Boletin_Procesos_Penales_Resumen_Years_List.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Procesos_Penales_Resumen_Years_List (' + keys.join(',') + ') VALUES ';
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let values = Object.values(element);
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
    await connection.query(search);
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
        
    //     await connection.query('INSERT INTO Boletin_Procesos_Penales_Resumen_Years_List SET ?', [element]);
    // }
}

const eliminarBoletinProcesosPenalesResumenDB =async (id) => {
    // await prisma.Boletin_Procesos_Penales_Resumen.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Procesos_Penales_Resumen WHERE data_searchId = ?', [id]);
}

const eliminarListaAnosProcesosPenales = async (id) => {
    // await prisma.Boletin_Procesos_Penales_Resumen_Years_List.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Procesos_Penales_Resumen_Years_List WHERE data_searchId = ?', [id]);
}

const eliminarBoletinProcesosPenalesDetalleDB = async (id) => {
    // await prisma.Boletin_Procesos_Penales_Detalle.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Procesos_Penales_Detalle WHERE data_searchId = ?', [id]);
}

module.exports = {
    guardarBoletinProcesosPenalesResumenDB,
    guardarBoletinProcesosPenalesDetalleDB,
    guardarListaAnosProcesosPenales,
    guardarBoletinProcesosPenalesResumenYearDB,
    eliminarBoletinProcesosPenalesDetalleDB,
    eliminarBoletinProcesosPenalesResumenDB,
    eliminarListaAnosProcesosPenales
}