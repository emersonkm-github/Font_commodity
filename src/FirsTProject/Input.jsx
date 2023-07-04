import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import ChartApi from "./ChartApi";
import Grid from '@mui/material/Unstable_Grid2';


export default function Input({ time }) {
  const [data, setData] = useState([]);
  const [titleName, setTitleName] = useState("Bitcoin");
  const [coinName, setCoinName] = useState("bitcoin");
  const [lastValidChoice, setLastValidChoice] = useState({
    titleName: "Bitcoin",
    coinName: "bitcoin",
  });
  const [titleName2, setTitleName2] = useState("Ethereum");
  const [coinName2, setCoinName2] = useState("ethereum");
  const [lastValidChoice2, setLastValidChoice2] = useState({
    titleName: "Ethereum",
    coinName: "ethereum",
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

  const handleChange = (event) => {
    const value = event.target.value.toUpperCase();
    let titleName, coinName;
    const coinData = data.find((item) => item.symbol === value);
    if (coinData) {
      titleName = coinData.name;
      coinName = coinData.id;
      setLastValidChoice({ titleName, coinName });

    } else {
      titleName = lastValidChoice.titleName;
      coinName = lastValidChoice.coinName;
    }
    setTitleName(titleName);
    setCoinName(coinName);
  };

  const handleChange2 = (event2) => {
    const value2 = event2.target.value.toUpperCase();
    let titleName2, coinName2;
    const coinData2 = data.find((item) => item.symbol === value2);
    if (coinData2) {
      titleName2 = coinData2.name;
      coinName2 = coinData2.id;
      setLastValidChoice2({ titleName2, coinName2 });
      console.log(titleName2);
    } else {
      titleName2 = lastValidChoice2.titleName;
      coinName2 = lastValidChoice2.coinName;
    }
    setTitleName2(titleName2);
    setCoinName2(coinName2);
  };

  return (
    <Box sx={{  paddingLeft: '40px'}}>
      <Grid container spacing={0}>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete="off"
          display="flex" justifyContent="flex-start"
        >
          <TextField
            id="outlined-basic"
            label="(左軸)輸入代號"
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" }
          }}
          noValidate
          autoComplete="off"
          display="flex" justifyContent="flex-start"
        >
          <TextField
            id="outlined-basic"
            label="(右軸)輸入代號"
            variant="outlined"
            onChange={handleChange2}
          />
        </Box>
      </Grid>
      <ChartApi data={coinName} title={titleName} time={time} secondData={coinName2} secondTitle={titleName2} />
    </Box>
  );
}
