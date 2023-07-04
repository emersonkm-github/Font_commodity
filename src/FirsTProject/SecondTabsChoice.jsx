import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Quotes from './Quotes';
import DataApi from './DataApi';
import DateSelection from './DateSelection';
import GoodsSelection from './GoodsSelection';
import Member from './Member';
import Register from './Register';
import ChangeData from './ChangeData';

export default function TabsChoice({ online }) {
  const [value, setValue] = useState(online ? 'four' : 'one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ width: '100%', mt: '100px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab className="tab" value="one" label="價格表格" />
          <Tab className="tab" value="two" label="Coins走勢圖" />
          <Tab className="tab" value="three" label="商品走勢圖" />
          {online ? (
            <>
              <Tab className="tab" value="four" label="用戶資料" />
              <Tab className="tab" value="six" label="修改電郵密碼" />
            </>
          ) : (
            <Tab className="tab" value="five" label="登記用戶" />
          )}
        </Tabs>
        <Quotes />
      </Box>

      {value === 'one' && <DataApi />}
      {value === 'two' && <DateSelection />}
      {value === 'three' && <GoodsSelection />}
      {value === 'four' && <Member />}
      {value === 'five' && <Register />}
      {value === 'six' && <ChangeData />}
    </div>
  );
}
