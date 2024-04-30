'use strict'
const {getConnection} = require('../../database/database');

const ListProductsDB = async () => {
    // const products = await prisma.products.findMany({
    //     where: {
    //         active: true
    //     }
    // })

    // return products;

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM Products WHERE active = true');
    return result;
}

const ReadProductDB = async (id) => {
    // const product = await prisma.products.findUnique({
    //     where: {
    //         id_product: id
    //     }
    // })

    // return product;

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM Products WHERE id_product = ?', [id]);
    return result;
}

const FindProductDB = async (code) => {
    // const product = await prisma.products.findFirst({
    //     where: {
    //         code: code
    //     }
    // })
    
    // return product;

    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM Products WHERE code = ?', [code]);
    return result;
}

const saveDataSearch = async (data) => {
    // const search = await prisma.data_Search_User.create({
    //     data: data
    // })

    // return search;

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Data_Search_User SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Data_Search_User WHERE id_data_search_user = ?', [result.insertId]);
    return result2[0];
}

const updateFinishSearch = async (search, link, result) => {
    if (search === undefined) {
        return false;
    }
    // await prisma.data_Search_User.update({
    //     where: {
    //         id_data_search_user: search
    //     },
    //     data: {
    //         link: link,
    //         status: result
    //     }
    // })

    const connection = await getConnection();
    await connection.query('UPDATE Data_Search_User SET link = ?, status = ? WHERE id_data_search_user = ?', [link, result, search]);
}

const saveDataSearchMassive = async (data) => {
    // const search = await prisma.Data_Search_Massive_User.create({
    //     data: data
    // });

    // return search;

    const connection = await getConnection();
    const result = await connection.query('INSERT INTO Data_Search_Massive_User SET ?', [data]);

    const result2 = await connection.query('SELECT * FROM Data_Search_Massive_User WHERE id_data_search_massive_user = ?', [result.insertId]);
    return result2[0];
}

const updateFinishSearchMassive = async (search, data) => {
    if (search === undefined) {
        return false;
    }
    // const updateSearch = await prisma.Data_Search_Massive_User.update({
    //     where: {
    //         id_data_search_massive_user: search
    //     },
    //     data: data
    // })

    // return updateSearch;

    const connection = await getConnection();
    const result = await connection.query('UPDATE Data_Search_Massive_User SET ? WHERE id_data_search_massive_user = ?', [data, search]);
    return result;
}

const modifyStatusSearchMassive = async (search, status, link = '') => {
    // await prisma.Data_Search_Massive_User.update({
    //     where: {
    //         id_data_search_massive_user: search
    //     },
    //     data: {
    //         status: status
    //     }
    // })

    const connection = await getConnection();
    if (link === '') {
        await connection.query('UPDATE Data_Search_Massive_User SET status = ? WHERE id_data_search_massive_user = ?', [status, search]);
    } else {
        await connection.query('UPDATE Data_Search_Massive_User SET status = ?, link = ? WHERE id_data_search_massive_user = ?', [status, link, search]);
    }
}

const tokenSearchMassive = async (token, search) => {
    const connection = await getConnection();
    await connection.query('UPDATE Data_Search_Massive_User SET token = ? WHERE id_data_search_massive_user = ?', [token, search]);
}

const saveProductConsulted = async (data) => {
    // await prisma.product_Consulted.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = "INSERT INTO Product_Consulted (" + keys.join(",") + ") VALUES ";
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const values = Object.values(element);
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
        
    //     await connection.query('INSERT INTO Product_Consulted SET ?', [element]);
    // }
}

const VerifyProductInSearch = async (search, code, type) => {
    if (search === undefined) {
        return false;
    }

    let query_id = '';
    if (type==='single') {
        query_id = 'data_search_userId';
    } else {
        query_id = 'data_search_massive_userId';
    }

    // const query = await prisma.product_Consulted.findFirst({
    //     where: {
    //         [query_id]: search,
    //         AND: {
    //             product: {
    //                 code: code
    //             },
    //             AND: {
    //                 type: type
    //             }
    //         }
    //     }
    // })

    // return query;

    const connection = await getConnection();
    const result = await connection.query(`
        SELECT * FROM Product_Consulted
        LEFT JOIN Products ON Product_Consulted.product_id = Products.id_product
        WHERE Product_Consulted.${query_id} = ? AND Products.code = ? AND Product_Consulted.type = ?`, [search, code, type]);
    return result[0];
}

const SaveRutsMassive = async (data) => {
    // await prisma.Ruts_Data_Massive.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = "INSERT INTO Ruts_Data_Massive (" + keys.join(",") + ") VALUES ";
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const values = Object.values(element);
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
        
    //     await connection.query('INSERT INTO Ruts_Data_Massive SET ?', [element]);
    // }
}

const updateRutMassive = async (rut, id, status, link, name='') => {
    // await prisma.Ruts_Data_Massive.updateMany({
    //     where: {
    //         data_search_massive_userId: id,
    //         rut: rut
    //     },
    //     data: {
    //         status: status,
    //         link: link
    //     }
    // })

    const connection = await getConnection();
    if (name === ''){
        await connection.query('UPDATE Ruts_Data_Massive SET status = ?, link = ? WHERE data_search_massive_userId = ? AND rut = ?', [status, link, id, rut]);
    } else {
        await connection.query('UPDATE Ruts_Data_Massive SET status = ?, link = ?, name_rut = ? WHERE data_search_massive_userId = ? AND rut = ?', [status, link, name, id, rut]);
    }
}


const CreateProductsList = async (data) => {
    // const create = await prisma.products.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    // return create;

    if (data.length === 0) {
        return;
    }
    const connection = await getConnection();
    let keys = Object.keys(data[0]);
    let search = "INSERT INTO Products (" + keys.join(",") + ") VALUES ";
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const values = Object.values(element);
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
        
    //     await connection.query('INSERT INTO Products SET ?', [element]);
    // }
}

const createProduct = async (data) => {
    // const create = await prisma.products.createMany({
    //     data: data,
    //     skipDuplicates: true
    // })

    // return create;

    const connection = await getConnection();
    let keys = Object.keys(data);
    let search = "INSERT INTO Products (" + keys.join(",") + ") VALUES ";
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        const values = Object.values(element);
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
        
    //     await connection.query('INSERT INTO Products SET ?', [element]);
    // }
}

const FindSearchDB = async (id) => {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM Data_Search_User WHERE id_data_search_user = ?', [id]);
    return result[0];
}

const getCostProduct = async (code) => {
    const connection = await getConnection();
    const result = await connection.query('SELECT cost FROM Products WHERE code = ?', [code]);
    return result[0];
}

const updateCreditsConsumed = async (id, credits) => {
    const connection = await getConnection();
    await connection.query('UPDATE Malla_Societaria SET credits_consumed = ? WHERE id_malla_societaria = ?', [credits, id]);
}

const SaveError = async (id, text) => {
    const connection = await getConnection();
    await connection.query('UPDATE Data_Search_Massive_User SET error_process = ? WHERE id_data_search_massive_user = ?', [text, id]);
}
    
module.exports = {
    ReadProductDB,
    saveDataSearch,
    VerifyProductInSearch,
    updateFinishSearch,
    ListProductsDB,
    saveProductConsulted,
    CreateProductsList,
    saveDataSearchMassive,
    SaveRutsMassive,
    updateFinishSearchMassive,
    updateRutMassive,
    modifyStatusSearchMassive,
    FindProductDB,
    createProduct,
    FindSearchDB,
    getCostProduct,
    updateCreditsConsumed,
    tokenSearchMassive,
    SaveError
}