import React from 'react';
import ReactECharts from 'echarts-for-react';  // or var ReactECharts = require('echarts-for-react');
// import echarts
import * as echarts from 'echarts';

import my_dark_theme from "./echart_theme_dark.json";

// register theme object
echarts.registerTheme('my_dark_theme', my_dark_theme);

const option = {
  dataset: {
    source: [
      ['amount', 'name'],
      [ 58212, '并网容量'],
      [ 78254, '装机容量'],
      [ 41032, '未建容量'],
    ]

  },
  grid: { containLabel: true },
  xAxis: { name: 'MW' },
  yAxis: { type: 'category' },
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    min: 10,
    max: 100000,
    text: ['高', '低'],
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ['#55a571', '#eFbE24', '#eD564F']
    }
  },
  series: [
    {
      type: 'bar',
      encode: {
        // Map the "amount" column to X axis.
        x: 'amount',
        // Map the "name" column to Y axis
        y: 'name',
      },
      label:{
        show:true,
          color:"#fff"
      }
    }
  ]
};
export default ()=>{
    return <div>
        <ReactECharts option={option} theme='my_dark_theme' opts={{renderer: 'svg'}} />
    </div>
}