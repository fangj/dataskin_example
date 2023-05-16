import React from "react";
import { Card, Statistic,Button } from 'antd';
import { observer } from "mobx-react-lite"
import CoffeeSvg  from "./coffee.svg";
import UnitStore from "../stores/UnitStore";


const store=new UnitStore("coffee");

function CoffeePage() {
    return(
    <div>
        <Card bordered={false}>
        <img src={CoffeeSvg} />
            <Statistic
                title="销量"
                value={store.value.total}
                valueStyle={{
                    color: '#3f8600',
                }}
                suffix="杯"
            />
        </Card>
    </div>)

}

export default observer(CoffeePage)