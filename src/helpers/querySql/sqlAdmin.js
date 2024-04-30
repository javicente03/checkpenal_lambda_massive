'use strict'
const {getConnection} = require('../../database/database');

const returnUserDB = async (id) => {
    const connection = await getConnection();
    const user = await connection.query('SELECT * FROM user WHERE id = ?', [id]);
    return user[0];
}

const ExistProcessMassivePending = async (id= null) => {
    
    const connection = await getConnection();
    let process = null;
    if (id === null) {
        process = await connection.query(`
            SELECT * FROM Data_Search_Massive_User
            WHERE status = 'pending'
            ORDER BY id_data_search_massive_user ASC
            LIMIT 1
        `)
    } else {
        // si el status es pending o error y el id es el mismo
        process = await connection.query(`
            SELECT * FROM Data_Search_Massive_User
            WHERE (status = 'pending' OR status = 'error')
            AND id_data_search_massive_user = ?
            ORDER BY id_data_search_massive_user ASC
            LIMIT 1
        `, [id])
    }
    return process[0];
}

const GetRutsProcessMassive = async (id) => {
    const connection = await getConnection();
    const ruts = await connection.query(`
        SELECT rut FROM Ruts_Data_Massive
        WHERE data_search_massive_userId = ?
    `, [id])
    return ruts;
}

// exportar las funciones

module.exports = {
    returnUserDB,
    ExistProcessMassivePending,
    GetRutsProcessMassive
}