import React, { useState, useEffect } from "react";
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

import stars from "./stars.webm";

const store = new UnitStore("bluetech");



function BlueTechPage() {



    const [size, setSize] = useState({
        width: window.innerWidth,
        hieght: window.innerHeight
    })

    const onResize = () => {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
        
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return (() => {
            window.removeEventListener('resize', onResize)
        })
    }, [])



    let scaleW = size.width / 1920;
    let scaleH = size.height / 1080;
    let scale = scaleW < scaleH ? scaleW : scaleH;
    scale = (scale < 0.5) ? 0.5 : scale;
    if(!scale){
        scale=window.innerWidth/ 1920;;
    }
    // console.log(scale)
    const screenStyle={
        width:"100vw",
        height:"100vh",
        backgroundColor: "#010812",
        overflow:"hidden",
    }
    const screenCoreStyle={
        position: "absolute",
        width: "1920px",  //设计稿的宽度
        height: "1080px",  //设计稿的高度
        left: "50%",
        top: "50%",
        transformOrigin: "left top",
        transform:`scale(${scale})  translate(-50%, -50%)`,
    }
    return (
        <div style={screenStyle}>
        <div className="bluetech" style={screenCoreStyle}>

            <video width="800" height="600" muted preload="auto" id="v2" loop autoPlay src={stars} type="video/webm" style={{ position: "absolute", left: "50%", top: 300, marginLeft: -400 }} />

            <Row>
                <Col span={24}>
                    <div className='head'>
                        <img src={svg_head} style={{ position: "absolute", width: "100%", height: 107 }} />
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
        </div >)

}

export default observer(BlueTechPage)