import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Input from "./Input";
import GoodsSelection from "./GoodsSelection";

export default function DateSelection() {
  const [time, setTime] = React.useState('m1');

  const handleChange = (event) => {
    setTime(event.target.value);
  };




  return (

    <Box>
      <Box display="flex" justifyContent="flex-start" sx={{paddingLeft: '50px' }} >
        <FormControl sx={{ width: '100px' }} >
          <InputLabel id="demo-simple-select-label" >時間</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            label="Time"
            onChange={handleChange}
          >
            <MenuItem value={"m1"}>1分鍾</MenuItem>
            <MenuItem value={"m5"}>5分鍾</MenuItem>
            <MenuItem value={"m15"}>15分鍾</MenuItem>
            <MenuItem value={"m30"}>30分鍾</MenuItem>
            <MenuItem value={"h1"}>1小時</MenuItem>
            <MenuItem value={"h2"}>2小時</MenuItem>
            <MenuItem value={"h6"}>6小時</MenuItem>
            <MenuItem value={"h12"}>12小時</MenuItem>
            <MenuItem value={"d1"}>24小時</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Input time={time} />


    </Box>

  );
}
