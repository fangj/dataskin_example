import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
// import echarts
import * as echarts from 'echarts';

import my_dark_theme from "./echart_theme_dark.json";

// register theme object
echarts.registerTheme('my_dark_theme', my_dark_theme);

const option = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '3月', '5月', '7月', '9月', '11月'],
    splitLine: {     //网格线
      "show": false
    }
  },
  yAxis: {
    type: 'value',
    
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330],
      type: 'line',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgba(82, 255, 255,0.8)'
          },
          {
            offset: 1,
            color: 'rgba(33, 82, 162,0.3)'
          }
        ])
      },
    }
  ]
};

export default ()=>{
    return <div>
        <ReactECharts option={option} theme='my_dark_theme' opts={{renderer: 'svg'}} />
    </div>
}