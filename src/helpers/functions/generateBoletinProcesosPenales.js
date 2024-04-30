const getBolPenal = require("../dealernet/obtenerBoletinProcesosPenales");
const sqlBolPenal = require("../querySql/guardarBoletinProcesosPenales");

const GenerateBoletinProcesosPenales = async (data, person) => {
    // Boletin Procesos Penales
    await getBolPenal.ObtenerBoletinProcesosPenalesResumen(data, person.id_data_search, 'bolpenal')

    const bolPenalDet = await getBolPenal.ObtenerBoletinProcesosPenalesDetalle(data, person.id_data_search, 'bolpenal')
    await sqlBolPenal.guardarBoletinProcesosPenalesDetalleDB(bolPenalDet)
}

module.exports = GenerateBoletinProcesosPenales