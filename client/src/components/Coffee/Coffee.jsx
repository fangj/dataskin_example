import React from "react";
import { Card, Statistic,Button } from 'antd';
import { observer } from "mobx-react-lite"
import CoffeeSvg  from "./coffee.svg";
import UnitStore from "../../stores/UnitStore";
import "./coffee.css";

const store=new UnitStore("coffee");

function CoffeePage() {
    return(
    <div className="coffee_bg ">
        <div className="page_container">
        <Card bordered={false} style={{width:250, margin:"0 auto"}}>
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
        </div>
    </div>)

}

export default observer(CoffeePage)