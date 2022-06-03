import { encriptarJson, desencriptarJson } from '../security'
import { ENTRYPOINT, LARAVEL_SGI } from '../../config/API'
const axios = require('axios');
export const editar = (id, data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;


    let url = ENTRYPOINT + "steps/" + id;
    let setting = {
        method: "PUT",
        url: url,
        params: data,
        data: data,
        body: data,
        headers: { Accept: "application/json", Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token, },
    };
    mostrarLoader(true);

    axios(setting)
        .then((res) => {
            let response = res.data;
            if (response.type != "error") {

                mostrarLoader(false);
                mostrarNotificacion({ type: "success", message: response.message });
            } else {
                mostrarNotificacion({ type: "error", message: response.message });
                mostrarLoader(false);
            }
        })
        .catch((error) => {
            mostrarLoader(false);

            mostrarNotificacion({ type: "error", message: error.message });
        });
};
export const eliminar = (id, store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;

    let url = ENTRYPOINT + "steps/" + id;

    let setting = {
        method: "DELETE",
        url: url,
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,

        }
    };
    mostrarLoader(true);

    axios(setting)
        .then((res) => {
            let response = res.data
            if (res.data.type != "error") {
                mostrarLoader(false);
                mostrarNotificacion({ type: "success", message: response.message });
            } else {

                mostrarLoader(false);
                mostrarNotificacion({ type: "error", message: response.message });
            }

        })
        .catch((error) => {
            mostrarLoader(false);
            mostrarNotificacion({ type: "success", message: error.message });
        });
};
export const registrar = (data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;

    let url = ENTRYPOINT + "steps";
    let setting = {
        method: "POST",
        url: url,
        data: data,
        body: data,
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
        },
    };
    mostrarLoader(true);

    axios(setting)
        .then((res) => {
            let response = res.data;
            if (response.type != "error") {

                mostrarLoader(false);
                mostrarNotificacion({ type: "success", message: response.message });
            } else {
                mostrarNotificacion({ type: "error", message: response.message });
                mostrarLoader(false);
            }
        })
        .catch((error) => {
            mostrarLoader(false);

            mostrarNotificacion({ type: "error", message: error.message });
        });
}
const formater = (data) => {
    let array = [];	
    data.map((e,i)=>{
        if(e.event_id==1){
            array.push({
                Header: e.name.toUpperCase(),
                columns: [
                  {
                    Header: 'POINTS',
                    accessor: 'score'+i,
                  },
                  {
                    Header: 'RANK',
                    accessor: 'rank'+i,
                  },
                  {
                    Header: 'TIME/REP',
                    accessor: 'value'+i,
                  },
                ],
              },);
        }
    })
    return array
}
export const obtenerTodos = (setData) => {

    let url = ENTRYPOINT + "steps"
    let setting = {
        method: "Get",
        url: url,
        headers: { 'Accept': 'application/json' }

    };


    axios(setting)
        .then((res) => {
            let response = res.data
            if (response.type != "error") {

                setData(formater(response.data))


            } else {

            }
        })
        .catch((error) => {



        });
}
export const obtenerSistemaEvaluaciones = (setLabels, setValues, store) => {
    const { usuario, cargarUsuario, mostrarNotificacion, mostrarLoader } = store;


    let url = ENTRYPOINT + "systems_evaluations"
    let setting = {
        method: "Get",
        url: url,
        headers: {
            'Accept': 'application/json',
            Authorization: "Bearer " + JSON.parse(desencriptarJson(usuario)).token,
        }

    };


    axios(setting)
        .then((res) => {
            let response = res.data
            if (response.type != "error") {
                setLabels(response.data.system)
                setValues(response.data.count)


            } else {

            }
        })
        .catch((error) => {



        });
}
