'use strict'
const {getConnection} = require('../../database/database');

const guardarBoletinAlertasResumenDB = async (data) => {
    // const bolvig = await prisma.Boletin_Alertas_Resumen.create({
    //     data: data
    // })

    // return bolvig;
    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Boletin_Alertas_Resumen SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Boletin_Alertas_Resumen WHERE id_boletin_alertas_resumen = ?', [result.insertId]);
    return result2[0];
}

const guardarBoletinAlertasResumenYearDB = async (data) => {
    
    // await prisma.Boletin_Alertas_Resumen_Years.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })
    const connection = await getConnection();
    // keys
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Alertas_Resumen_Years (' + keys.join(', ') + ') VALUES ';
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
    await connection.query(search);
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
        
    //     await connection.query('INSERT INTO Boletin_Alertas_Resumen_Years SET ?', [element]);
    // }
}

const guardarBoletinAlertasDetalleDB = async (data) => {
    // await prisma.Boletin_Alertas_Detalle.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Alertas_Detalle (' + keys.join(', ') + ') VALUES ';
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
    await connection.query(search);
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
        
    //     await connection.query('INSERT INTO Boletin_Alertas_Detalle SET ?', [element]);
    // }
}

const guardarListaAnos = async (data) => {
    // await prisma.Boletin_Alertas_Resumen_Years_List.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Alertas_Resumen_Years_List (' + keys.join(', ') + ') VALUES ';
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
    await connection.query(search);
        // obtener 
    // for (let index = 0; index < data.length; index++) {
    //     const element = data[index];
        
    //     await connection.query('INSERT INTO Boletin_Alertas_Resumen_Years_List SET ?', [element]);
    // }
}

const eliminarBoletinAlertasResumenDB =async (id) => {
    // await prisma.Boletin_Alertas_Resumen.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Alertas_Resumen WHERE data_searchId = ?', [id]);
}

const eliminarListaAnosAlertas = async (id) => {
    // await prisma.Boletin_Alertas_Resumen_Years_List.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Alertas_Resumen_Years_List WHERE data_searchId = ?', [id]);
}

const eliminarBoletinAlertasDetalleDB = async (id) => {
    // await prisma.Boletin_Alertas_Detalle.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Alertas_Detalle WHERE data_searchId = ?', [id]);
}

module.exports = {
    guardarBoletinAlertasResumenDB,
    guardarBoletinAlertasResumenYearDB,
    guardarListaAnos,
    guardarBoletinAlertasDetalleDB,
    eliminarBoletinAlertasResumenDB,
    eliminarListaAnosAlertas,
    eliminarBoletinAlertasDetalleDB
}