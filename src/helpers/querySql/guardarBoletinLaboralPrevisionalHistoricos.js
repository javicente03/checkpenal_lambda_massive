'use strict'
const {getConnection} = require('../../database/database');

const guardarBoletinLaboralPrevisionalHistoricosResumenDB = async (data) => {
    // const bolvig = await prisma.Boletin_Laboral_Previsional_Historico_Resumen.create({
    //     data: data
    // })

    // return bolvig;

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Boletin_Laboral_Previsional_Historico_Resumen SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Boletin_Laboral_Previsional_Historico_Resumen WHERE id_boletin_laboral_previsional_historico_resumen = ?', [result.insertId]);
    return result2[0];
}

const guardarBoletinLaboralPrevisionalHistoricosResumenYearDB = async (data) => {
    
    // await prisma.Boletin_Laboral_Previsional_Historico_Resumen_Years.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Laboral_Previsional_Historico_Resumen_Years (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Boletin_Laboral_Previsional_Historico_Resumen_Years SET ?', [element]);
    // }
}

const guardarBoletinLaboralPrevisionalHistoricosDetalleDB = async (data) => {
    // await prisma.Boletin_Laboral_Previsional_Historico_Detalle.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Laboral_Previsional_Historico_Detalle (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Boletin_Laboral_Previsional_Historico_Detalle SET ?', [element]);
    // }
}

const guardarListaAnos = async (data) => {
    // await prisma.Boletin_Laboral_Previsional_Historico_Resumen_Years_List.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Laboral_Previsional_Historico_Resumen_Years_List (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Boletin_Laboral_Previsional_Historico_Resumen_Years_List SET ?', [element]);
    // }
}

const eliminarBoletinLaboralPrevisionalHistoricosResumenDB =async (id) => {
    // await prisma.Boletin_Laboral_Previsional_Historico_Resumen.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Laboral_Previsional_Historico_Resumen WHERE data_searchId = ?', [id]);
}

const eliminarListaAnosLaboralPrevisionalHistoricos = async (id) => {
    // await prisma.Boletin_Laboral_Previsional_Historico_Resumen_Years_List.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Laboral_Previsional_Historico_Resumen_Years_List WHERE data_searchId = ?', [id]);
}

const eliminarBoletinLaboralPrevisionalHistoricosDetalleDB = async (id) => {
    // await prisma.Boletin_Laboral_Previsional_Historico_Detalle.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Laboral_Previsional_Historico_Detalle WHERE data_searchId = ?', [id]);
}

module.exports = {
    guardarBoletinLaboralPrevisionalHistoricosResumenDB,
    guardarBoletinLaboralPrevisionalHistoricosResumenYearDB,
    guardarListaAnos,
    guardarBoletinLaboralPrevisionalHistoricosDetalleDB,
    eliminarBoletinLaboralPrevisionalHistoricosResumenDB,
    eliminarListaAnosLaboralPrevisionalHistoricos,
    eliminarBoletinLaboralPrevisionalHistoricosDetalleDB
}