import React, { useState, useEffect } from "react";

export default function FullScreenContainer({ children,width=1920, height=1080,backgroundColor="black", ...props }) {
    //width:内核宽度
    //height:内核高度
    //backgroundColor:内核不能覆盖部分的背景色

    //useEffect要在useState前调用，否则会报错"Rendered fewer hooks than expected"
    useEffect(() => {
        window.addEventListener('resize', onResize);
        return (() => {
            window.removeEventListener('resize', onResize)
        })
    }, [])

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

    let scaleW = size.width / width;
    let scaleH = size.height / height;
    let scale = scaleW < scaleH ? scaleW : scaleH;
    scale = (scale < 0.5) ? 0.5 : scale;
    if (!scale) {
        //首次加载时scale可能为NaN
        scale = window.innerWidth / width;;
    }
    // console.log(scale)
    const screenStyle = {
        width: "100vw",
        height: "100vh",
        backgroundColor: backgroundColor,
        overflow: "hidden",
    }
    const screenCoreStyle = {
        position: "absolute",
        width: width,  //设计稿的宽度
        height: height,  //设计稿的高度
        left: "50%",
        top: "50%",
        transformOrigin: "left top",
        transform: `scale(${scale})  translate(-50%, -50%)`,
    }

    return (
        <div style={screenStyle}>
            <div style={screenCoreStyle}>{children}</div>
        </div>
    )
}