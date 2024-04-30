const sqlRelacionSociedad = require("../querySql/guardarSociedadesRelaciones");

const CleanRelaciones = async (id) => {
    // Relaciones
    await sqlRelacionSociedad.eliminarRelacionesDB(id);
}

module.exports = CleanRelaciones;