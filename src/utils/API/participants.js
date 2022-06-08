import { encriptarJson, desencriptarJson } from '../security'
import { ENTRYPOINT, LARAVEL_SGI } from '../../config/API'
const axios = require('axios');
export const editar = (id, data, store) => {
    const { usuario, mostrarNotificacion, mostrarLoader } = store;


    let url = ENTRYPOINT + "participants/" + id;
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

    let url = ENTRYPOINT + "participants/" + id;

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

    let url = ENTRYPOINT + "participants";
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
        let temp = {
            id: e.id,
            num:i+1,
            firstName: e.people.names,
            lastName: e.people.last_names,
            fullname: e.people.names + " " + e.people.last_names,
            categoria:e.categories.name,
            box: e.boxes.name.toUpperCase(),
            total:Number(e.total_score)
        }
        e.points.map((p,i)=>{
            temp["score"+p.step_id] = Number(p.score)
            temp["rank"+p.step_id] = p.position
            temp["value"+p.step_id] = p.value
        })
        array.push(temp);
    })
    return array
}
export const obtenerTodos = (setData,setData2,filter) => {

    let url = ENTRYPOINT + "participants"
    let setting = {
        method: "Get",
        url: url,
        params:{
            category_id:filter
        },
        headers: { 'Accept': 'application/json' }

    };


    axios(setting)
        .then((res) => {
            let response = res.data
            if (response.type != "error") {

               let temp = formater(response.data)
                setData(temp)
                setData2(temp)

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
