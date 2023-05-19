import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
// import echarts
import * as echarts from 'echarts';

import my_dark_theme from "./echart_theme_dark.json";

// register theme object
echarts.registerTheme('my_dark_theme', my_dark_theme);

const option = {
    tooltip: {
      trigger: 'item'
    },

    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 20, name: '故障1' },
          { value: 30, name: '故障2' },
          { value: 25, name: '故障3' },
          { value: 15, name: '故障4' },
          { value: 10, name: '其他' }
        ],
        label: {
                show: true,
                formatter: '{b}: {d}%', //自定义显示格式(b:name, c:value, d:百分比)
                color: '#fff',
        }
      }
    ]
  };

export default ()=>{
    return <div>
        <ReactECharts option={option} theme='my_dark_theme' opts={{renderer: 'svg'}} />
    </div>
}