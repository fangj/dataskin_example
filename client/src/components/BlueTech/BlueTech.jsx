import React, { useState, useEffect } from "react";
import { Col, Row } from 'antd';
import { observer } from "mobx-react-lite"
import FullScreenContainer from "../common/FullScreenContainer";
import UnitStore from "../../stores/UnitStore";
import "./BlueTech.css";

import svg_head from "./frames_head.svg";

import YWTJ from "./YWTJ_echarts";
import FDLTJ from "./FDLTJ_echarts";
import FDJH from "./FDJH_echarts";
import ZJRL from "./ZJRL_echarts";
import SYTJ from "./SYTJ_echarts";
import DLGK from "./DLGK";

import stars from "./stars.webm";

const store = new UnitStore("bluetech");

function BlueTechPage() {
    return (
        <FullScreenContainer width={1920} height={1080} backgroundColor="#010812">
        <div className="bluetech">

            <video width="800" height="600" muted preload="auto" id="v2" loop autoPlay src={stars} type="video/webm" style={{ position: "absolute", left: "50%", top: 300, marginLeft: -400 }} />

            <Row>
                <Col span={24}>
                    <div className='head'>
                        <h1>企业智能运营管理平台</h1>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col span={7}>
                    <div className='电力概况'>
                        <div className='graph'><DLGK /></div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className='运维统计'>
                        <div className='title'>运维统计(当月)</div>
                        <div className='graph'><YWTJ /></div>
                    </div>
                </Col>
                <Col span={7}>
                    <div className='收益统计'>
                        <div className='graph'><SYTJ /></div>
                    </div>
                </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
                <Col span={7}>
                    <div className='发电量统计'>
                        <div className='graph'><FDLTJ /></div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className='发电计划'>
                        <div className='graph'><FDJH /></div>
                    </div>
                </Col>
                <Col span={7}>
                    <div className='装机容量统计'>
                        <div className='graph'><ZJRL /></div>
                    </div>
                </Col>
            </Row>
            </div>
        </FullScreenContainer >)

}

export default observer(BlueTechPage)