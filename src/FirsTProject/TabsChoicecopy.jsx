import DataApi from './DataApi';
import DateSelection from './DateSelection';
import GoodsSelection from './GoodsSelection';
import Register from './Register';
import React, { useEffect, useCallback, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Quotes from './Quotes';
export default function TabsChoicecopy({register_login}) {
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Box sx={{ width: '100%',  paddingLeft: '30px' }} >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab className="tab" value="one" label="價格表格" />
          <Tab className="tab"
            value="two"
            label="虛擬貨幣走勢圖"
          />
          <Tab
            className="tab"
            value="three"
            label="商品走勢圖"
          />

          <Tab
            className="tab"
            value="five"
            label="登記用戶"
          />

        </Tabs>
        <Quotes />
      </Box>

      {value === "one" && <DataApi />}
      {value === "two" && <DateSelection />}
      {value === "three" && <GoodsSelection />}
      {value === 'five' && <Register register_login = {register_login}/>}

    </div>



  )

}
