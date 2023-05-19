import React from "react";
import { Card, Statistic, Button } from 'antd';
import { Col, Row } from 'antd';
import { makeAutoObservable, autorun } from "mobx"
import { observer } from "mobx-react-lite"
import UnitStore from "../../stores/UnitStore";
import "./BlueTech.css";

import svg_head from "./frames_head.svg";
import svg_电力概况 from "./frames_电力概况.svg";
import svg_发电计划 from "./frames_发电计划.svg";
import svg_发电量统计 from "./frames_发电量统计.svg";
import svg_收益统计 from "./frames_收益统计.svg";
import svg_装机容量统计 from "./frames_装机容量统计.svg";

import YWTJ from "./YWTJ_echarts";
import FDLTJ from "./FDLTJ_echarts";
import FDJH from "./FDJH_echarts";
import ZJRL from "./ZJRL_echarts";
import SYTJ from "./SYTJ_echarts";
import DLGK from "./DLGK";


const store = new UnitStore("bluetech");



function BlueTechPage() {
    return (
        <div className="bluetech">
            <Row>
                <Col span={24}>
                    <div className='head'>
                        <img src={svg_head} style={{position:"absolute",width:"100%",height:107}}/>
                    <h1>企业智能运营管理平台</h1>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={7}>
                <div className='电力概况'>
                    <div className='graph'><DLGK/></div>
                </div>
                </Col>
                <Col span={10}>
                    <div  className='运维统计'>
                        <div className='title'>运维统计(当月)</div>
                        <div className='graph'><YWTJ/></div>
                    </div>
                </Col>
                <Col span={7}>
                <div className='收益统计'> 
                    <div className='graph'><SYTJ/></div>
                 </div>
                </Col>
            </Row>
            <Row style={{marginTop:20}}> 
                <Col span={7}>
                <div className='发电量统计'> 
                <div className='graph'><FDLTJ/></div>
                 </div>
                </Col>
                <Col span={10}>
                <div className='发电计划'> 
                <div className='graph'><FDJH/></div>
                 </div>
                </Col>
                <Col span={7}>
                <div className='装机容量统计'> 
                <div className='graph'><ZJRL/></div>
                 </div>
                </Col>
            </Row>
        </div >)

}

export default observer(BlueTechPage)