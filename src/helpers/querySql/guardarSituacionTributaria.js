'use strict'
const {getConnection} = require('../../database/database');

const guardarSituacionTributariaDB =async (data) => {
    // await prisma.Situacion_Tributaria.create({
    //     data: data
    // })

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Situacion_Tributaria SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Situacion_Tributaria WHERE id_situacion_tributaria = ?', [result.insertId]);
    return result2[0];
}

const eliminarSituacionTributariaDB =async (id) => {
    // await prisma.Situacion_Tributaria.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Situacion_Tributaria WHERE data_searchId = ?', [id]);
}

module.exports = {
    guardarSituacionTributariaDB,
    eliminarSituacionTributariaDB
}