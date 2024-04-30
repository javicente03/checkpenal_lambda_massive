const moment = require("moment");
const ConsumeSoapComportamientoPenal = require("../dealernet/consumeComportamientoPenal");
const ConsumeSoapRelaciones = require("../dealernet/consumeRelaciones");
// const ConsumeSoapBoletinPenal = require("../dealernet/consumeSoapBoletinPenal");
const obtenerDatosBasicosDealerNet = require("../dealernet/obtenerDatosBasicos");
const VerifyValid = require("../dealernet/verifyValid");
const sqlDataBasic = require("../querySql/guardarDatosBasicos");
const sqlProducts = require("../querySql/sqlProducts");
// const CleanBoletinPenal = require("./cleanBoletinPenal");
const CleanComportamientoPenal = require("./cleanComportamientoPenal");
const CleanRelaciones = require("./cleanRelaciones");
// const GenerateBoletinProcesosPenales = require("./generateBoletinProcesosPenales");
const GenerateComportamientoPenal = require("./generateComportamientoPenal");
const GenerateRelaciones = require("./generateRelaciones");

const GeneratedConsulted = async (search, person, rut, type, requestUser) => {
    try {
        let returnPerson = person;
        console.log('Entro a GeneratedConsulte', returnPerson) 

        if (person !== null) {
            const fechaActual = moment().format('YYYY-MM-DD HH:mm:ss')

            // let dataBolP = null;
            let dataCompP = null;
            let dataRelacionados = null;

            let fechaCreacionMasUnaSemana = null;
            if (person.date_antpenales !== null) {
                fechaCreacionMasUnaSemana = moment(person.date_antpenales).add(1, 'week').format('YYYY-MM-DD HH:mm:ss')
            }

            console.log('existe en la bdd')
            if (fechaCreacionMasUnaSemana === null || fechaActual > fechaCreacionMasUnaSemana) {
                console.log('la fecha es mayor a una semana')

                // dataBolP = await ConsumeSoapBoletinPenal(person.rut);
                // const validSoap = await VerifyValid(dataBolP);
                // if (!validSoap.result) {
                //     return { error: "No se encontró el rut", status: 404, result: false }
                // }

                // const dataBasic = await obtenerDatosBasicosDealerNet(dataBolP);
                // await sqlDataBasic.editarDatosBasicosSimpleDB(dataBasic, person.id_data_search);

                // await CleanBoletinPenal(person.id_data_search);
                // await GenerateBoletinProcesosPenales(dataBolP, person);

                dataCompP = await ConsumeSoapComportamientoPenal(person.rut);
                const validSoapComp = await VerifyValid(dataCompP);
                if (!validSoapComp.result) {
                    return { error: "No se encontró el rut", status: 404, result: false }
                }

                const dataBasic = await obtenerDatosBasicosDealerNet(dataCompP);
                await sqlDataBasic.editarDatosBasicosSimpleDB(dataBasic, person.id_data_search);

                await CleanComportamientoPenal(person.id_data_search);
                await GenerateComportamientoPenal(dataCompP, person);

                dataRelacionados = await ConsumeSoapRelaciones(person.rut);

                const validSoapRel = await VerifyValid(dataRelacionados);
                if (!validSoapRel.result) {
                    return { error: "No se encontró el rut", status: 404, result: false }
                }

                await CleanRelaciones(person.id_data_search);
                await GenerateRelaciones(dataRelacionados, person);
                await sqlDataBasic.actualizarFechaBoletin(person.id_data_search, 'date_antpenales');

            }

        } else {
            if (rut === null || rut === undefined) {
                // return {error: 'Rut no encontrado', status: 404, result: false}
                return 0
            }

            // const dataBolP = await ConsumeSoapBoletinPenal(rut);
            // const validSoap = await VerifyValid(dataBolP);
            // if (!validSoap.result) {
            //     return { error: "No se encontró el rut", status: 404, result: false }
            // }

            // const dataBasic = await obtenerDatosBasicosDealerNet(dataBolP);

            // let newPerson = null;
            // const existPerson = await sqlDataBasic.obtenerDatosBasicosDB(dataBasic.rut);

            // if (!existPerson) {
            //     newPerson = await sqlDataBasic.guardarDatosBasicosDB(dataBasic);
            // } else {
            //     newPerson = await sqlDataBasic.editarDatosBasicosSimpleDB(dataBasic, existPerson.id_data_search);
            // }

            // await CleanBoletinPenal(newPerson.id_data_search);
            // await GenerateBoletinProcesosPenales(dataBolP, newPerson);

            const dataCompP = await ConsumeSoapComportamientoPenal(rut);
            const validSoapComp = await VerifyValid(dataCompP);
            if (!validSoapComp.result) {
                return { error: "No se encontró el rut", status: 404, result: false }
            }

            const dataBasic = await obtenerDatosBasicosDealerNet(dataCompP);

            let newPerson = null;
            const existPerson = await sqlDataBasic.obtenerDatosBasicosDB(dataBasic.rut);

            if (!existPerson) {
                newPerson = await sqlDataBasic.guardarDatosBasicosDB(dataBasic);
            } else {
                newPerson = await sqlDataBasic.editarDatosBasicosSimpleDB(dataBasic, existPerson.id_data_search);
            }

            await CleanComportamientoPenal(newPerson.id_data_search);
            await GenerateComportamientoPenal(dataCompP, newPerson);

            const dataRelacionados = await ConsumeSoapRelaciones(rut);
            const validSoapRel = await VerifyValid(dataRelacionados);
            if (!validSoapRel.result) {
                return { error: "No se encontró el rut", status: 404, result: false }
            }

            await CleanRelaciones(newPerson.id_data_search);
            await GenerateRelaciones(dataRelacionados, newPerson);

            await sqlDataBasic.actualizarFechaBoletin(newPerson.id_data_search, 'date_antpenales');
            returnPerson = newPerson;

            console.log('NO EXISTE EN LA BASE DE DATOS');
        }

        if (returnPerson === null) {
            return { error: "No se encontró el rut", status: 404, result: false }
        }

        console.log('Procesada la informacion DEALER')
        return { result: true, person: returnPerson };
    } catch (error) {
        console.log('la Generacion de consulta fallo')
        console.log(error)
        return { error: 'error de sistema', status: 409, result: false, errorLog: JSON.stringify(error) }
    }
}

module.exports = GeneratedConsulted;