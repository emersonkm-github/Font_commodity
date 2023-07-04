import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import ChartApi from "./ChartApi";

export default function Input({time}) {
  const [data, setData] = useState([]);
  const [titleName, setTitleName] = useState("Bitcoin");
  const [coinName, setCoinName] = useState("ethereum");
  const [lastValidChoice, setLastValidChoice] = useState({
    titleName: "Bitcoin",
    coinName: "bitcoin",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.coincap.io/v2/assets");
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return null; // If data is empty, return null
  }

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    let titleName, coinName;
    const coinData = data.find((item) => item.symbol === value);
    if (coinData) {
      titleName = coinData.name;
      coinName = coinData.id;
      setLastValidChoice({ titleName, coinName });
      console.log(titleName);
    } else {
      titleName = lastValidChoice.titleName;
      coinName = lastValidChoice.coinName;
    }
    setTitleName(titleName);
    setCoinName(coinName);
  };
console.log(titleName)
console.log(coinName)
console.log(data)

  return (
    <Box display="flex" justifyContent="center">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" }
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="輸入代號"
          variant="outlined"
          onChange={handleChange}
        />
      </Box>
      <ChartApi data={coinName} title={titleName} time = {time} />
    </Box>
  );
}
