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

const store = new UnitStore("bluetech");



function BlueTechPage() {
    return (
        <div className="bluetech">
            <Row>
                <Col span={24}>
                    <div className='head'>
                    <h1>企业智能运营管理平台</h1>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={7}>
                <div className='电力概况'>  </div>
                </Col>
                <Col span={10}>col-8</Col>
                <Col span={7}>
                <div className='收益统计'>  </div>
                </Col>
            </Row>
            <Row style={{marginTop:20}}> 
                <Col span={7}>
                <div className='发电量统计'>  </div>
                </Col>
                <Col span={10}>
                <div className='发电计划'>  </div>
                </Col>
                <Col span={7}>
                <div className='装机容量统计'>  </div>
                </Col>
            </Row>
        </div>)

}

export default observer(BlueTechPage)