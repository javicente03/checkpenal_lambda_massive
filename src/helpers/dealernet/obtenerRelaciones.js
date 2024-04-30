const obtenerRelacionesDealerNet = async (data, id, type = 'perfilcomercial') => {
    const DOMParser = new (require("xmldom")).DOMParser();
    const document = DOMParser.parseFromString(data);

    let relaciones = [];
    let titular = null;
    try {
        if (type === 'perfilcomercial'){
            titular = document.getElementsByTagName('titular')[0];
        } else {
            titular = document.getElementsByTagName('result')[0];
        }
        
        const relacionados = titular.getElementsByTagName('relacionados')[0];
        const array_relacionados = relacionados.getElementsByTagName('d');
    
        for (let i = 0; i < array_relacionados.length; i++) {
            const element = array_relacionados[i];

            let nombre = '', rut = '', clasificacion = '', relacion = '';

            try {
                rut = element.getElementsByTagName('rut')[0].textContent.replace(/\./g, '') + '-' + element.getElementsByTagName('dv')[0].textContent;
            } catch (e) {}
            try {
                clasificacion = element.getElementsByTagName('clasificacion')[0].textContent;
            } catch (e) {}

            if (clasificacion === 'P' || clasificacion === 'p') {
                try {
                    nombre = element.getElementsByTagName('nombres')[0].textContent + ' ' + element.getElementsByTagName('apellidos')[0].textContent;
                } catch (e) {}
            } else {
                try {
                    nombre = element.getElementsByTagName('organizacion')[0].textContent;
                } catch (e) {}
            }

            try {
                relacion = element.getElementsByTagName('relacion')[0].textContent;
            } catch (e) {}

            relaciones.push({
                rut,
                nombre,
                relacion,
                clasificacion,
                data_searchId: id
            })
        }
    } catch (error) {
    }

    return relaciones;
}

module.exports = obtenerRelacionesDealerNet;