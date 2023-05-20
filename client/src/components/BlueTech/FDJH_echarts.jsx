import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
// import echarts
import * as echarts from 'echarts';

import my_dark_theme from "./echart_theme_dark.json";

// register theme object
echarts.registerTheme('my_dark_theme', my_dark_theme);

const option = {
  title: {
    text: '当年发电计划'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['实际发电量', '计划发电量']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['二月', '四月', '六月', '十月', '十二月']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '实际发电量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '计划发电量',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ],
};

export default ()=>{
    return <div>
        <ReactECharts option={option} theme='my_dark_theme' opts={{renderer: 'svg'}} />
    </div>
}