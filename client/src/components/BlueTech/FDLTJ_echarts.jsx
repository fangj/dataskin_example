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
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    splitLine: {     //网格线
      "show": false
    }
  },
  yAxis: {
    name:'(kwh)',
    type: 'value',
    splitLine: {     //网格线
      "show": false
    }
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      grid:{show:false}
    },
    {
      data: [100, 210, 120, 50, 90, 130, 110],
      type: 'bar',
      grid:{show:false}
    },
    {
      data: [130, 220, 130, 70, 50, 120, 100],
      type: 'bar',
      grid:{show:false}
    }
  ]
};

export default ()=>{
    return <div>
        <ReactECharts option={option} theme='my_dark_theme' opts={{renderer: 'svg'}} />
    </div>
}