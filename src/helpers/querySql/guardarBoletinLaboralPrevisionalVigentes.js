'use strict'
const {getConnection} = require('../../database/database');

const guardarBoletinLaboralPrevisionalVigentesResumenDB = async (data) => {
    // const bolvig = await prisma.Boletin_Laboral_Previsional_Vigente_Resumen.create({
    //     data: data
    // })

    // return bolvig;

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Boletin_Laboral_Previsional_Vigente_Resumen SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Boletin_Laboral_Previsional_Vigente_Resumen WHERE id_boletin_laboral_previsional_vigente_resumen = ?', [result.insertId]);
    return result2[0];
}

const guardarBoletinLaboralPrevisionalVigentesResumenYearDB = async (data) => {
    
    // await prisma.Boletin_Laboral_Previsional_Vigente_Resumen_Years.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Laboral_Previsional_Vigente_Resumen_Years (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Boletin_Laboral_Previsional_Vigente_Resumen_Years SET ?', [element]);
    // }
}

const guardarBoletinLaboralPrevisionalVigentesDetalleDB = async (data) => {
    // await prisma.Boletin_Laboral_Previsional_Vigente_Detalle.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Laboral_Previsional_Vigente_Detalle (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Boletin_Laboral_Previsional_Vigente_Detalle SET ?', [element]);
    // }
}

const guardarListaAnos = async (data) => {
    // await prisma.Boletin_Laboral_Previsional_Vigente_Resumen_Years_List.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Boletin_Laboral_Previsional_Vigente_Resumen_Years_List (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Boletin_Laboral_Previsional_Vigente_Resumen_Years_List SET ?', [element]);
    // }
}

const eliminarBoletinLaboralPrevisionalVigentesResumenDB =async (id) => {
    // await prisma.Boletin_Laboral_Previsional_Vigente_Resumen.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Laboral_Previsional_Vigente_Resumen WHERE data_searchId = ?', [id]);
}

const eliminarListaAnosLaboralPrevisionalVigentes = async (id) => {
    // await prisma.Boletin_Laboral_Previsional_Vigente_Resumen_Years_List.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Laboral_Previsional_Vigente_Resumen_Years_List WHERE data_searchId = ?', [id]);
}

const eliminarBoletinLaboralPrevisionalVigentesDetalleDB = async (id) => {
    // await prisma.Boletin_Laboral_Previsional_Vigente_Detalle.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Boletin_Laboral_Previsional_Vigente_Detalle WHERE data_searchId = ?', [id]);
}

module.exports = {
    guardarBoletinLaboralPrevisionalVigentesResumenDB,
    guardarBoletinLaboralPrevisionalVigentesResumenYearDB,
    guardarListaAnos,
    guardarBoletinLaboralPrevisionalVigentesDetalleDB,
    eliminarBoletinLaboralPrevisionalVigentesResumenDB,
    eliminarListaAnosLaboralPrevisionalVigentes,
    eliminarBoletinLaboralPrevisionalVigentesDetalleDB
}