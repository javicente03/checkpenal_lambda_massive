const sqlComportamientoPenal = require("../querySql/sqlComportamientoPenal");


const CleanComportamientoPenal = async (id) => {

    // Comportamiento Penal
    sqlComportamientoPenal.eliminarComportamientoPenalResumen(id);
    sqlComportamientoPenal.eliminarComportamientoPenalDetalle(id);
}

module.exports = CleanComportamientoPenal;