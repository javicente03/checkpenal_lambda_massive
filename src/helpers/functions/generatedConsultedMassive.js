// const createPdfPuppeteer = require("../generatePdf/createPdfPuppeteer");
const sqlDataBasic = require("../querySql/guardarDatosBasicos");
const sqlProducts = require("../querySql/sqlProducts");
const sqlNotifications = require("../querySql/sqlNotifications");
// const createCSVData = require("./createCSVData");
const GeneratedConsulted = require("./generatedConsulted");
const config = require('../../config');
const fs = require('fs');
const { default: axios } = require("axios");
const isValidRut = require("../../helpers/isValidRut");
let ProcesoActivo = true;
let errorLog = '';

const MassiveConsultation = async (ruts, consultedMassive, requestUser) => {
    console.log('Entro a Massive Consultation')
    // dormir 10 segundos para que no se caiga la api
    for (let index = 0; index < ruts.length; index++) {

        console.log('Entro a Massive Consultation for', index)
        const element = ruts[index];

        let rutApply = element.replace(/\./g, "");

        let existRut = await sqlDataBasic.obtenerDatosBasicosDB(rutApply)
    
        let returnPerson = null;
        
        console.log('En el for principal, existRut', existRut)
        
        if (isValidRut(rutApply) === false) {
            await sqlProducts.updateRutMassive(rutApply, consultedMassive.id_data_search_massive_user, 'notfound', null);
        } else {
            if (existRut) {
                console.log('En el for principal, si existe el rut', existRut)
                const generatedConsulted = await GeneratedConsulted(consultedMassive.id_data_search_massive_user, existRut, null, 'massive');
                console.log('En el for principal, el resultado de generatedConsulted', generatedConsulted)

                if (!generatedConsulted.result) {
                    if (generatedConsulted.status === 404){
                        await sqlProducts.updateRutMassive(rutApply, consultedMassive.id_data_search_massive_user, 'notfound', null);
                    } else {
                        await sqlProducts.updateRutMassive(rutApply, consultedMassive.id_data_search_massive_user, 'errorSystem', null);
                        // rompe el ciclo con el fin de pasar al catch de GenerateConsultedMassive
                        ProcesoActivo = false;
                        errorLog = generatedConsulted.errorLog;
                        break;
                    }
                }
                
                returnPerson = generatedConsulted.person;
            } else {
                console.log('En el for principal, no existe el rut', existRut)
                const generatedConsulted = await GeneratedConsulted(consultedMassive.id_data_search_massive_user, null, rutApply, 'massive');
                console.log('En el for principal, el resultado de generatedConsulted', generatedConsulted)

                if (!generatedConsulted.result) {
                    if (generatedConsulted.status === 404){
                        await sqlProducts.updateRutMassive(rutApply, consultedMassive.id_data_search_massive_user, 'notfound', null);
                    } else {
                        await sqlProducts.updateRutMassive(rutApply, consultedMassive.id_data_search_massive_user, 'errorSystem', null);
                        // rompe el ciclo con el fin de pasar al catch de GenerateConsultedMassive
                        ProcesoActivo = false;
                        errorLog = generatedConsulted.errorLog;
                        break;
                    }
                }
                returnPerson = generatedConsulted.person;
            }
            console.log('En el for principal, returnPerson', returnPerson)

            if (returnPerson !== null && returnPerson !== undefined) {
                await sqlProducts.updateRutMassive(returnPerson.rut, consultedMassive.id_data_search_massive_user, 'completed', '', returnPerson.name);
            }
        }
    }
}

const GenerateConsultedMassive = async (requestUser, ruts, consultedMassive) => {
    try {
        console.log('entro a generar')
        await sqlProducts.modifyStatusSearchMassive(consultedMassive.id_data_search_massive_user, 'ejecuting');
        // Ejecutar el siguiente codigo si y solo si la funcion MassiveConsultation se ejecuto completamente
        await MassiveConsultation(ruts, consultedMassive, requestUser).then(async () => {
            if (!ProcesoActivo) {
                throw new Error('Error en el proceso');
            }
            
            await sqlProducts.modifyStatusSearchMassive(consultedMassive.id_data_search_massive_user, 'completed');

            await sqlNotifications.guardarNotificacion({
                description: `Tu consulta masiva id #${consultedMassive.id_data_search_massive_user} ha sido completada`,
                read: false,
                title: 'Consulta masiva',
                type_icon: 'pdf',
                userId: requestUser.id,
                data_search_massive_userId: consultedMassive.id_data_search_massive_user
            })

            const token = Math.random().toString(36).slice(-8);
            await sqlProducts.tokenSearchMassive(token, consultedMassive.id_data_search_massive_user);
            
            await axios.get(`${config.URL_BACKEND_EMAIL}/api/email/massive/${consultedMassive.id_data_search_massive_user}/${token}`).then(() => {
                console.log('Se envio el email')
            }).catch((error) => {
                console.log('Error al enviar el email', error)
            })
                
        }).catch(async (error) => {
            console.log('Error en el proceso', error)
            await sqlProducts.modifyStatusSearchMassive(consultedMassive.id_data_search_massive_user, 'error');
            await sqlProducts.SaveError(consultedMassive.id_data_search_massive_user, errorLog);
            
            await axios.get(`${config.URL_BACKEND_EMAIL}/api/email/massiveFailed/${consultedMassive.id_data_search_massive_user}`).then(() => {
                console.log('Se envio el email')
            }).catch((error) => {
                console.log('Error al enviar el email', error)
            })
        })

        // const returnSearch = consultedMassive.id_data_search_massive_user;
        // const returnUser = requestUser.id;
        // return {ruts, returnSearch, returnUser}
        return true;
    } catch (error) {
        return false;
    }
    
}

module.exports = GenerateConsultedMassive;