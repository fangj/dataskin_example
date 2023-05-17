import React from "react";
import { Card, Statistic,Button } from 'antd';
import { makeAutoObservable, autorun } from "mobx"
import { observer } from "mobx-react-lite"
import CoffeeSvg  from "./coffee.svg";
import UnitStore from "../../stores/UnitStore";
import "./coffee.css";
import love from "./love.webm";
const store=new UnitStore("coffee");

autorun(() => {
    console.log(store.value.total)
    document.getElementById("v1").play()
})

function CoffeePage() {
    return(
    <div className="coffee_bg ">
        <div className="page_container" style={{position:"relative"}}>
       
        <Card bordered={false} style={{width:250,height:400, margin:"0 auto",position:"relative"}}>
        <img src={CoffeeSvg} />
            <Statistic
                title="销量"
                value={store.value.total}
                valueStyle={{
                    color: '#3f8600',
                }}
                suffix="杯"
            />
              <video  width="200" height="400" muted   preload="auto" id="v1" 
            src={love} type="video/webm" style={{position:"absolute",left:0,top:0}}>
        </video>
        </Card>
        </div>
    </div>)

}

export default observer(CoffeePage)