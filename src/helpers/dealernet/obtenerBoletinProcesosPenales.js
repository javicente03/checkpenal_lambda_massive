const sqlBolPenal = require("../querySql/guardarBoletinProcesosPenales");

const ObtenerBoletinProcesosPenalesResumen = async (data, id, type) => {
    const DOMParser = new (require("xmldom")).DOMParser();
    const document = DOMParser.parseFromString(data);
    let boletin_procesos_penales = null;
    try {
        if (type === 'perfilcomercial'){
            boletin_procesos_penales = document.getElementsByTagName('penal')[0];
        } else {
            boletin_procesos_penales = document.getElementsByTagName('result')[0];
        }
        const indice = boletin_procesos_penales.getElementsByTagName('total')[0];
        const elementos_indice = indice.getElementsByTagName('d')

        for (let index = 0; index < elementos_indice.length; index++) {
            let bolPenal = {
                cantidad: 0,
                tipo_proceso: '',
                data_searchId: id
            }

            const element = elementos_indice[index];
            try {
                bolPenal.tipo_proceso = element.getAttribute('glosa');                
            } catch (e) {}
            try {
                bolPenal.cantidad = parseInt(element.getAttribute('c'))
            } catch (e) {}

            const boletinPenal = await sqlBolPenal.guardarBoletinProcesosPenalesResumenDB(bolPenal)
            
            if (boletinPenal) {
                const forYear = boletin_procesos_penales.getElementsByTagName('indice')[0]
                let bolPenalResYear = [];

                const elementos_year = forYear.getElementsByTagName('d')[index];
                const year = elementos_year.getElementsByTagName('a');
                for (let j = 0; j < year.length; j++) {
                    
                    bolPenalResYear.push({
                        cantidad: parseInt(year[j].getAttribute('valor')),
                        year: year[j].getAttribute('n'),
                        boletin_procesos_penales_resumenId: boletinPenal.id_boletin_procesos_penales_resumen
                    })
                }
                
                await sqlBolPenal.guardarBoletinProcesosPenalesResumenYearDB(bolPenalResYear);
            }
        }

        const totalano = boletin_procesos_penales.getElementsByTagName('totalano')[0];
        const totalanoArray = totalano.getElementsByTagName('d');
        let yearsArray = [];

        for (let index = 0; index < totalanoArray.length; index++) {
            const elemento = totalanoArray[index];
            let year_element = '', total_year= 0;

            try {
                year_element = elemento.getAttribute('a');
            } catch (e) {}
            try {
                total_year = parseInt(elemento.getAttribute('c'));
            } catch (e) {}
            yearsArray.push({
                year: year_element,
                cantidad: total_year,
                data_searchId: id
            })
        }

        await sqlBolPenal.guardarListaAnosProcesosPenales(yearsArray);
    } catch (e) {
    }

    return true;
}

const ObtenerBoletinProcesosPenalesDetalle = async (data, id, type) => {
    const DOMParser = new (require("xmldom")).DOMParser();
    const document = DOMParser.parseFromString(data);
    
    let bolPenalDet = [];
    let boletin_procesos_penales = null;
    try {
        if (type === 'perfilcomercial'){
            boletin_procesos_penales = document.getElementsByTagName('penal')[0];
        } else {
            boletin_procesos_penales = document.getElementsByTagName('result')[0];
        }
        const detalle = boletin_procesos_penales.getElementsByTagName('detalle')[0]
        const d = detalle.getElementsByTagName('d')

        for (let i = 0; i < d.length; i++) {
            const element = d[i];
            
            let identificacion = '', forma = '', situacion = '', fecha = '', fuente = '',
                rol = '', tipo = '', delitosText = '';

            try {
                identificacion = element.getElementsByTagName('identificacion')[0].textContent;
            } catch (e) {}
            try {
                forma = element.getElementsByTagName('forma')[0].textContent;
            } catch (e) {}
            try {
                situacion = element.getElementsByTagName('situacion')[0].textContent;
            } catch (e) {}
            try {
                fecha = element.getElementsByTagName('fecha')[0].textContent;
            } catch (e) {}
            try {
                fuente = element.getElementsByTagName('fuente')[0].textContent;
            } catch (e) {}
            try {
                rol = element.getElementsByTagName('rol')[0].textContent;
            } catch (e) {}
            try {
                tipo = element.getElementsByTagName('tipo')[0].textContent;
            } catch (e) {}
            try {
                let clasificacion = element.getElementsByTagName('clasificacion')[0];
                let delitos = clasificacion.getElementsByTagName('delito');
                
                for (let j = 0; j < delitos.length; j++) {
                    if (j !== (delitos.length-1)) {
                        delitosText += delitos[j].textContent + '; ';
                    } else {
                        delitosText += delitos[j].textContent;
                    }
                }
            } catch (e) {}
            
            bolPenalDet.push({
                identification: identificacion,
                forma: forma,
                situacion: situacion,
                fecha_publicacion: fecha,
                fuente: fuente,
                rol: rol,
                tipo: tipo,
                clasificacion: delitosText,
                data_searchId: id
            })
        }

    } catch (e) {
    }

    return bolPenalDet;
}

module.exports = {
    ObtenerBoletinProcesosPenalesResumen,
    ObtenerBoletinProcesosPenalesDetalle
}