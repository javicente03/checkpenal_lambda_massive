'use strict'
const config = require('../../config');
const {getConnection} = require('../../database/database');

const guardarParticipacionesSociedadesDB = async (data) => {
    // await prisma.Participaciones_Sociedades.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Participaciones_Sociedades (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Participaciones_Sociedades SET ?', [element]);
    // }
}

const guardarSociedadesDB = async (data) => {
    const connection = await getConnection();
    const create = await connection.query('INSERT INTO Participaciones_Sociedades SET ?', [data]);
    return create.insertId;
}

const guardarSociosDB = async (data) => {
    if (data.length === 0) {
        return;
    }

    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO socios (' + keys.join(',') + ') VALUES ';
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
}

const guardarRelacionesDB = async (data) => {
    // await prisma.Relaciones.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Relaciones (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Relaciones SET ?', [element]);
    // }
}

const eliminarParticipacionesSociedadesDB = async (id) => {
    // await prisma.Participaciones_Sociedades.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Participaciones_Sociedades WHERE data_searchId = ?', [id]);
}

const eliminarRelacionesDB = async (id) => {
    // await prisma.Relaciones.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Relaciones WHERE data_searchId = ?', [id]);
}

const ObtenerParticipacionesSociedadesDB = async (rut) => {
    const connection = await getConnection();
    const rows = await connection.query(
        `SELECT *, PS.rut as rut_socio FROM Participaciones_Sociedades PS 
        LEFT JOIN Data_Search DS ON PS.data_searchId = DS.id_data_search 
        WHERE DS.rut = ?
        GROUP BY rut_socio`, [rut]
    );
    return rows;
}

const ObtenerMallaSocietaria = async (id) => {
    const connection = await getConnection();
    const rows = await connection.query(
        `SELECT * FROM Malla_Societaria WHERE data_search_userId = ?`, [id]
    );

    return rows[0];
}

const ObtenerDetallesMallaSocietaria = async (id) => {
    const connection = await getConnection();
    const rows = await connection.query(
        `SELECT * FROM Malla_Societaria_Detalle WHERE malla_societariaId = ?`, [id]
    );

    return rows;
}

const ObtenerSocios = async (id, rut_inicial) => {
    const connection = await getConnection();
    // y excluye a los rut_inicial
    const rows = await connection.query(
        `SELECT *, S.tipo AS tipo_socio, S.rut AS rut_socio FROM Socios AS S 
        LEFT JOIN Participaciones_Sociedades AS PS ON S.participaciones_sociedadesId = PS.id_participaciones_sociedades 
        LEFT JOIN Malla_Societaria_Detalle AS MSD ON PS.id_participaciones_sociedades = MSD.participacion_sociedadId 
        WHERE PS.id_participaciones_sociedades = ? 
        AND S.rut != ?
        GROUP BY S.rut`, [id, rut_inicial]
    );

    return rows;
}

const updateLinkMallaSocietaria = async (id) => {
    const connection = await getConnection();
    await connection.query(
        `UPDATE Malla_Societaria SET link = ? WHERE id_malla_societaria = ?`, [`${config.DOMAIN_FRONT}/malla-societaria/${id}`, id]
    );
}

const updateLinkMallaDetalle = async (id, link) => {
    const connection = await getConnection();
    await connection.query(
        `UPDATE Malla_Societaria_Detalle SET link = ? WHERE id_malla_societaria_detalle = ?`, [link, id]
    );
}

module.exports = {
    guardarParticipacionesSociedadesDB,
    guardarRelacionesDB,
    eliminarParticipacionesSociedadesDB,
    eliminarRelacionesDB,
    ObtenerParticipacionesSociedadesDB,
    ObtenerMallaSocietaria,
    guardarSociedadesDB,
    guardarSociosDB,
    ObtenerDetallesMallaSocietaria,
    ObtenerSocios,
    updateLinkMallaSocietaria,
    updateLinkMallaDetalle
}