import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Highcharts from 'highcharts/highstock';
let con1;
let formattedDates1;
let formattedDates2;


export default function GoodsChart({ firstCoinData1, firstCoinData2, firstCoinData3, firstCoinData4, firstCoinData5 }) {


  useEffect(() => {


    Highcharts.chart('container1', {
      chart: {
        type: 'candlestick'
      },
      plotOptions: {
        candlestick: {
          lineWidth: 1, // 设置蜡烛线的宽度为 1 像素
          pointWidth: 0.2
        }
      },
      title: {
        text: "價格走勢圖",
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: [
        {
          title: {
            text: "",
          },
        },
        {
          title: {
            text: "",
          },
          opposite: true, // 将第二个 Y 轴放在右侧
        },
        {
          title: {
            text: "",
          },
          opposite: true, // 将第二个 Y 轴放在右侧
        },
        {
          title: {
            text: "",
          },
          opposite: true, // 将第二个 Y 轴放在右侧
        },
        {
          title: {
            text: "",
          },
          opposite: true, // 将第二个 Y 轴放在右侧
        },

      ],
      series: [
        {
          name: '燕麥期貨',
          data: firstCoinData1,
        },
        {
          name: '金',
          data: firstCoinData2,
          yAxis: 1, // 指定使用第二个 Y 轴
        },
        {
          name: '大豆期貨',
          data: firstCoinData3,
          yAxis: 2, // 指定使用第二个 Y 轴
          visible: false,
        },
        {
          name: '瘦肉豬期貨',
          data: firstCoinData4,
          yAxis: 3, // 指定使用第二个 Y 轴
          visible: false,
        },
        {
          name: '活牛期貨',
          data: firstCoinData5,
          yAxis: 4, // 指定使用第二个 Y 轴
          visible: false,
        },



      ],
    });
  }, [firstCoinData1, firstCoinData2, firstCoinData3, firstCoinData4, firstCoinData5]);


  return (

    <Box sx={{ maxWidth: '95%', padding: '80px' }}>
      <div id="container1" sx={{ width: '100%' }}>
      </div>
    </Box>

  );
}
