'use strict'
const {getConnection} = require('../../database/database');

const guardarNotificacion = async (data) => {
    // const notification = await prisma.Notifications.create({
    //     data: data
    // });
    // return notification;

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Notifications SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Notifications WHERE id_notification = ?', [result.insertId]);
    return result2[0];
}

module.exports = {
    guardarNotificacion
}