const getComportamientoPenal = require("../dealernet/obtenerComportamientoPenal");
const sqlComportamientoPenal = require("../querySql/sqlComportamientoPenal");

const GenerateComportamientoPenal = async (data, person) => {

    const comportamiento = await getComportamientoPenal.ObtenerComportamientoPenalResumen(data, person.id_data_search);
    await sqlComportamientoPenal.guardarComportamientoPenalResumen(comportamiento);

    await getComportamientoPenal.ObtenerComportamientoPenalDetalle(data, person.id_data_search);
}

module.exports = GenerateComportamientoPenal;