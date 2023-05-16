import axios from 'axios'

const getData = (resp) => resp.data;

export function getUnit(key){
    return axios.get(`/api/v1/unit/${key}`)
    .then(getData);
}

export function saveUnit(key,value){
    return axios.post(`/api/v1/unit/${key}`,value)
    .then(getData);
}
