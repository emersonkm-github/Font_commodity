import React, { useState, useEffect } from "react";
import GoodsChart from "./GoodsChart";

export default function GoodsAPI({ time }) {

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

console.log(data1)

  useEffect(() => {
    const fetchData = async () => {
      try {

          const response1 = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/OUSX?apikey=988f4f3a92c1d8cb26b5c1a737461f2f`);
          const result1 = await response1.json();
          setData1(result1);



          const response2 = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/ZGUSD?apikey=988f4f3a92c1d8cb26b5c1a737461f2f`);
          const result2 = await response2.json();
          setData2(result2);


          const response3 = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/SUSX?apikey=988f4f3a92c1d8cb26b5c1a737461f2f`);
          const result3 = await response3.json();
          setData3(result3);


          const response4 = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/LHUSX?apikey=988f4f3a92c1d8cb26b5c1a737461f2f`);
          const result4 = await response4.json();
          setData4(result4);

          const response5 = await fetch(`https://financialmodelingprep.com/api/v3/historical-chart/${time}/LCUSX?apikey=988f4f3a92c1d8cb26b5c1a737461f2f`);
          const result5 = await response5.json();
          setData5(result5);



      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [time]);


  const firstCoinData1 = data1.slice(0, 300).map((item) => {
    const date = new Date(item.date); // 将日期字符串转换为日期对象

    return {
      date: date.getTime(),
      openPrice: item.open,
      highPrice: item.high,
      lowPrice: item.low,
      closePrice: item.close
    };
  }).reverse().map((item) => [
    new Date(item.date).toISOString(),
    parseFloat(item.openPrice),
    parseFloat(item.highPrice),
    parseFloat(item.lowPrice),
    parseFloat(item.closePrice),
  ]);
  const firstCoinData2 = data2.slice(0, 300).map((item) => {
    const date = new Date(item.date); // 将日期字符串转换为日期对象

    return {
      date: date.getTime(),
      openPrice: item.open,
      highPrice: item.high,
      lowPrice: item.low,
      closePrice: item.close
    };
  }).reverse().map((item) => [
    new Date(item.date).toISOString(),
    parseFloat(item.openPrice),
    parseFloat(item.highPrice),
    parseFloat(item.lowPrice),
    parseFloat(item.closePrice),
  ]);

  const firstCoinData3 = data3.slice(0, 300).map((item) => {
    const date = new Date(item.date); // 将日期字符串转换为日期对象

    return {
      date: date.getTime(),
      openPrice: item.open,
      highPrice: item.high,
      lowPrice: item.low,
      closePrice: item.close
    };
  }).reverse().map((item) => [
    new Date(item.date).toISOString(),
    parseFloat(item.openPrice),
    parseFloat(item.highPrice),
    parseFloat(item.lowPrice),
    parseFloat(item.closePrice),
  ]);

  const firstCoinData4 = data4.slice(0, 300).map((item) => {
    const date = new Date(item.date); // 将日期字符串转换为日期对象

    return {
      date: date.getTime(),
      openPrice: item.open,
      highPrice: item.high,
      lowPrice: item.low,
      closePrice: item.close
    };
  }).reverse().map((item) => [
    new Date(item.date).toISOString(),
    parseFloat(item.openPrice),
    parseFloat(item.highPrice),
    parseFloat(item.lowPrice),
    parseFloat(item.closePrice),
  ]);

  const firstCoinData5 = data5.slice(0, 300).map((item) => {
    const date = new Date(item.date); // 将日期字符串转换为日期对象

    return {
      date: date.getTime(),
      openPrice: item.open,
      highPrice: item.high,
      lowPrice: item.low,
      closePrice: item.close
    };
  }).reverse().map((item) => [
    new Date(item.date).toISOString(),
    parseFloat(item.openPrice),
    parseFloat(item.highPrice),
    parseFloat(item.lowPrice),
    parseFloat(item.closePrice),
  ]);

  return (
    <GoodsChart firstCoinData1={firstCoinData1} firstCoinData2={firstCoinData2} firstCoinData3={firstCoinData3} firstCoinData4={firstCoinData4} firstCoinData5={firstCoinData5} />
  )
}
