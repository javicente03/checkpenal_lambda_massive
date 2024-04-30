const sqlBolPenal = require("../querySql/guardarBoletinProcesosPenales");

const CleanBoletinPenal = async (id) => {

    // Boletin Procesos Penales
    await sqlBolPenal.eliminarBoletinProcesosPenalesResumenDB(id);
    await sqlBolPenal.eliminarListaAnosProcesosPenales(id);
    await sqlBolPenal.eliminarBoletinProcesosPenalesDetalleDB(id);
}

module.exports = CleanBoletinPenal;