import React, { useState, useEffect } from "react";
import CoinChart from "./CoinChart";
import Box from '@mui/material/Box';

export default function ChartApi({ data, title, time, secondData, secondTitle }) {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);





  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`https://api.coincap.io/v2/assets/${data}/history?interval=${time}`);
        const result1 = await response1.json();
        setData1(result1);

        const response2 = await fetch(`https://api.coincap.io/v2/assets/${secondData}/history?interval=${time}`);
        const result2 = await response2.json();
        setData2(result2);


      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [data, time, secondData]);

  if (!data1 || data1.length === 0 || !data2 || data2.length === 0) {
    return null; // If data1 or data2 is empty, return null
  }



  const getDate1 = data1.data.map((item1) => ({
    date: item1.date,
    price: parseFloat(item1.priceUsd)
  }));

  const getDate2 = data2.data.map((item2) => ({
    date: item2.date,
    price: parseFloat(item2.priceUsd)
  }));

  const formattedDates1 = getDate1.map((dateStr, index) => {
    const date = new Date(dateStr.date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${day}-${month}-${year}`;
    return {
      date: new Date(dateStr.date).getTime(),
      price: getDate1[index].price
    };
  });


  const formattedDates2 = getDate2.map((dateStr, index) => {
    const date = new Date(dateStr.date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const formattedDate = `${day}-${month}-${year}`;
    return {
      date: new Date(dateStr.date).getTime(),
      price: getDate2[index].price
    };
  });





  return (
    <Box sx={{  width: "95%" }}>
      <CoinChart apiData={{ formattedDates1, formattedDates2 }} title={title} title2={secondTitle} />
    </Box>
  );
}
