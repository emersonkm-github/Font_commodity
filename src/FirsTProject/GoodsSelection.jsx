import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import Box from '@mui/material/Box';
import GoodsAPI from "./GoodsAPI";

export default function GoodsSelection() {

  const [time, setTime] = React.useState('1min');

  const handleChange = (event) => {
    setTime(event.target.value);
  };

  return (
    <Box position="relative" sx={{ width: '100%', paddingLeft: '30px', paddingRight: '30px' }}>
      <Box
        position="absolute"
        top={0}
        left={80}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-start"

      >
        <FormControl sx={{ m: 1, minWidth: 80 }} >
          <InputLabel id="demo-simple-select-autowidth-label" >時間</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={time}
            onChange={handleChange}
            autoWidth
            label="Time"

          >

            <MenuItem value={'1min'}>1分鍾</MenuItem>
            <MenuItem value={'5min'}>5分鍾</MenuItem>
            <MenuItem value={'15min'}>15分鍾</MenuItem>
            <MenuItem value={'30min'}>30分鍾</MenuItem>
            <MenuItem value={'1hour'}>1小時</MenuItem>
            <MenuItem value={'4hour'}>4小時</MenuItem>
          </Select>
        </FormControl>



      </Box>
      <GoodsAPI time={time} />
    </Box>


  )
}
