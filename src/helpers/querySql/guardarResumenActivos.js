'use strict'
const {getConnection} = require('../../database/database');

const guardarResumenActivosDB = async (data) => {
    
    // await prisma.Asset_Summary.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Asset_Summary (' + keys.join(',') + ') VALUES ';
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let values = Object.values(element);
        // separar los valores por comas y entre comillas simples
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
        
    //     await connection.query('INSERT INTO Asset_Summary SET ?', [element]);
    // }
}

const guardarPropiedadesVigentesDB = async (data) => {
    // await prisma.Current_Properties.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })
    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Current_Properties (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Current_Properties SET ?', [element]);
    // }
}

const guardarVehiculosVigentesDB = async (data) => {
    // await prisma.Current_Vehicles.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = 'INSERT INTO Current_Vehicles (' + keys.join(',') + ') VALUES ';
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
        
    //     await connection.query('INSERT INTO Current_Vehicles SET ?', [element]);
    // }
}

const eliminarResumenActivosDB = async (id) => {
    // await prisma.Asset_Summary.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Asset_Summary WHERE data_searchId = ?', [id]);
}

const eliminarPropiedadesVigentesDB = async (id) => {
    // await prisma.Current_Properties.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Current_Properties WHERE data_searchId = ?', [id]);
}

const eliminarVehiculosVigentesDB = async (id) => {
    // await prisma.Current_Vehicles.deleteMany({
    //     where: {
    //         data_searchId: id
    //     }
    // })

    const connection = await getConnection();
    await connection.query('DELETE FROM Current_Vehicles WHERE data_searchId = ?', [id]);
}

module.exports = {
    guardarResumenActivosDB,
    guardarPropiedadesVigentesDB,
    guardarVehiculosVigentesDB,
    eliminarResumenActivosDB,
    eliminarPropiedadesVigentesDB,
    eliminarVehiculosVigentesDB
}