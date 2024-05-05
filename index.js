const GenerateConsultedMassive = require('./src/helpers/functions/generatedConsultedMassive');
const sqlAdmin = require('./src/helpers/querySql/sqlAdmin');
exports.handler = async (event, context) => {
// const handler = async (event) => {
    
    let processPending = null;
    let id_process = null;

    try {
        id_process = event.queryStringParameters.id;
    } catch (error) {
        id_process = null;
    }

    if (id_process !== null) {
        processPending = await sqlAdmin.ExistProcessMassivePending(event.queryStringParameters.id);
    } else {
        processPending = await sqlAdmin.ExistProcessMassivePending();
    }

    if (processPending) {
        console.log('hay procesos')
        const requestUser = {
            exp: 0,
            iat: 0,
            id: processPending.userId
        }

        let ruts = [];

        await sqlAdmin.GetRutsProcessMassive(processPending.id_data_search_massive_user).then((rutsProcess) => {
            for (let index = 0; index < rutsProcess.length; index++) {
                ruts.push(rutsProcess[index].rut);
            }
        });

        await GenerateConsultedMassive(requestUser, ruts, processPending)
        
    } else {
        console.log('no hay procesos')
    }

    return new Promise((resolve, reject) => {
        resolve({
            statusCode: 200,
            body: JSON.stringify({
                message: 'Hello from lambda!',
            }),
        })
    })

    // // retornar la promesa para que no se cierre el lambda
}

// Crear servidor http para poder ejecutar el lambda localmente
// const http = require("http");

// const host = 'localhost';
// const port = 4000;

// const requestListener = async function (req, res) {

//     res.setHeader("Content-Type", "application/json");
//     const route = req.url.split("?")[0];
//     switch (route) {
//         case "/ejecute/":
//             // obtener las querys que vienen en la url
//             console.log(req.url)
//             let id = null;
//             try {
//                 id = req.url.split("?")[1].split("=")[1];                
//             } catch (error) {
//                 console.log(error)
//             }

//             const event = {
//                 queryStringParameters: {
//                     id: id
//                 }
//             }
//             const response = await handler(event);
//             res.writeHead(200);
//             // res.end(JSON.stringify({message:"Proceso finalizado"}));
//             res.end(response.body);
//             break
//         default:
//             res.writeHead(404);
//             res.end(JSON.stringify({error:"Resource not found"}));
//     }
// };

// const server = http.createServer(requestListener);
// server.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });