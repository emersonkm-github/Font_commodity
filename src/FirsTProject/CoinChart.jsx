import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import Box from '@mui/material/Box';

function CoinChart({ apiData, title, title2 }) {
  const { formattedDates1, formattedDates2 } = apiData;
  useEffect(() => {
    const firstCoinData = formattedDates1.map((item) => [
      item.date,
      parseFloat(item.price),
    ]);

    const secondCoinData = formattedDates2.map((item) => [
      item.date,
      parseFloat(item.price),
    ]);





    Highcharts.chart('container', {
      accessibility: {
        enabled: true,
      },
      title: {
        text: title + "和" + title2 + "價格走勢圖",
      },
      xAxis: {
        type: 'datetime',
      },
      yAxis: [
        {
          title: {
            text: title,
          },
        },
        {
          title: {
            text: title2,
          },
          opposite: true, // 将第二个 Y 轴放在右侧
        },

      ],
      series: [
        {
          name: title,
          data: firstCoinData,
        },
        {
          name: title2,
          data: secondCoinData,
          yAxis: 1, // 指定使用第二个 Y 轴
        },

      ],
    });
  }, [formattedDates1, formattedDates2]);

  return (
    <Box sx={{ maxWidth: '95%', padding: '50px' }}>
      <div id="container" sx={{ width: '100%' }}>
      </div>
    </Box>
  );
}

export default CoinChart;
