import { makeObservable,observable,action  } from "mobx"
import {getUnit,getSubscribe} from "../services/UnitParseService";


export default class UnitStore{

    value={}

    constructor(key) {
        makeObservable(this, {
            value: observable,
            updateValue:action
        })
        getUnit(key).then(this.updateValue)
        getSubscribe(key).then(subscription => {
            subscription.on('create',this.updateValue);
            subscription.on('update',this.updateValue);
        })
    }

    updateValue=(unit)=>{
        if(unit){
            this.value=unit.get("value");
        }
    }
}
