import axios from 'axios'
const Parse=window.Parse;

const Unit = Parse.Object.extend("Unit");

export function getUnit(key){
    const query = new Parse.Query(Unit);
    query.equalTo('key',key);
    query.descending("updatedAt");
    return query.first();
}

export function getSubscribe(key){
    const query = new Parse.Query(Unit);
    query.equalTo("key",key);
    return query.subscribe();
}