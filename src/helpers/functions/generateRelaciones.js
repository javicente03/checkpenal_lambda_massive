const obtenerRelacionesDealerNet = require("../dealernet/obtenerRelaciones");
const sqlRelacionSociedad = require("../querySql/guardarSociedadesRelaciones");

const GenerateRelaciones = async (data, person) => {
    // Relaciones
    const relacionesPersona = await obtenerRelacionesDealerNet(data, person.id_data_search, 'relaciones');
    await sqlRelacionSociedad.guardarRelacionesDB(relacionesPersona);
}

module.exports = GenerateRelaciones;