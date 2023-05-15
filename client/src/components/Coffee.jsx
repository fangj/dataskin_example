import React from "react";
import { Card, Statistic,Button } from 'antd';
import { makeObservable,toJS,observable,action  } from "mobx"
import { observer } from "mobx-react-lite"
import CoffeeSvg  from "./coffee.svg";

class CoffeeStore{
    total=100

    constructor() {
        makeObservable(this, {
            total: observable,
            add: action
        })
    }

    add(){
        this.total+=1;
    }

}

const store=new CoffeeStore();

function CoffeePage() {
    return(
    <div>
        <Card bordered={false}>
        <img src={CoffeeSvg} />
            <Statistic
                title="销量"
                value={store.total}
                valueStyle={{
                    color: '#3f8600',
                }}
                suffix="杯"
            />
        <Button onClick={()=>store.add()}>再来一杯</Button>
        </Card>
    </div>)

}

export default observer(CoffeePage)