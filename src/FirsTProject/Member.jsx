import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Member() {
  const [uploadGoods, setUploadGoods] = useState('');
  const [uploadAmount, setUploadAmount] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [data, setData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [open, setOpen] = useState(false);
  const id = sessionStorage.getItem("Id")

  useEffect(() => {
    axios.get('https://api.coincap.io/v2/assets')
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });

  }, [])
  // 整合数据
  const mergedData = responseData.reduce((accumulator, item1) => {
    const item2 = data.find((item) => item.symbol.toUpperCase() === item1.goods || item.name.toUpperCase() === item1.goods);
    if (item2) {
      const total = item1.amount * item2.priceUsd;
      const existingItem = accumulator.find((item) => item.name === item2.name && item.symbol === item2.symbol);
      if (existingItem) {
        existingItem.amount += item1.amount;
        existingItem.total += total;
      } else {
        accumulator.push({
          id: accumulator.length + 1,
          name: item2.name,
          symbol: item2.symbol,
          amount: item1.amount,
          price: item2.priceUsd,
          total,
        });
      }
    }
    return accumulator;
  }, []);
  const filteredData = mergedData.filter((item) => item.amount > 0);
  useEffect(() => {
    const account = sessionStorage.getItem("account");
    const password123 = sessionStorage.getItem("password");

    axios
      .post('/japi/stu13/quasar2/api/abc/register/login', {
        name: account,
        password: password123,
      })
      .then((response1) => {
        setResponseData(response1.data);

      })
      .catch((error) => {
        console.error(error);

      });

  }, [open])



  const totalValue = filteredData.reduce((total, item) => total + item.total, 0).toFixed(2);

  const handleGoodsNameChange = (event) => {
    setUploadGoods(event.target.value.toUpperCase());
  };


  const handleAmountChange = (event) => {
    setUploadAmount(event.target.value);
  };

  const item = mergedData.find(
    (item) =>
      item.symbol.toUpperCase() === uploadGoods.toUpperCase() ||
      item.name.toUpperCase() === uploadGoods.toUpperCase()
  );

  const dataitem = data.find(
    (item) =>
      item.symbol.toUpperCase() === uploadGoods.toUpperCase() ||
      item.name.toUpperCase() === uploadGoods.toUpperCase()
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      uploadGoods.length === 0 || !dataitem) {
      showSnackbar('請输入有效的商品');
      return;
    }
    if (item) {
      if (item.amount * -1 > uploadAmount) {
        showSnackbar('請输入正確數量');
        return;
      }
    }
    if (!item) {
      if (0 > uploadAmount) {
        showSnackbar('請输入正確數量');
        return;
      }
    }
    // Update the URL to the correct endpoint for your use case
    axios
      .post(`/japi/stu13/quasar2/api/abc/data?id=${id}`, {
        goods: uploadGoods,
        amount: uploadAmount,
      })
      .then((response) => {
        if (response.status == "200") {
          showSnackbar('提交成功');
          setOpen(!open)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center">
        <h2>增加或減少商品</h2>
      </Box>



      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        display="flex" justifyContent="center" alignItems="center"
      >
        <TextField
          id="outlined-basic1"
          label="請输入商品名稱或代號"
          variant="outlined"
          onChange={handleGoodsNameChange}
        />
        <TextField
          id="outlined-basic2"
          label="請输入商品數量"
          variant="outlined"
          onChange={handleAmountChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          提交
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          sx={{
            backgroundColor: snackbarSeverity === 'success' ? '#43a047' : '#d32f2f',
            color: '#ffffff',
            fontWeight: 'bold',
          }}
        />


      </Box>
      <div>
        {responseData.length > 0 ? (
          <div>
            <Box display="flex" justifyContent="center" alignItems="center">
              <h2>總值(美元)：{totalValue}</h2>
            </Box>
            <Box sx={{ border: '1px solid black', margin: '0 150px', fontWeight: 'bold' }}>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>

                      <TableCell>名稱</TableCell>
                      <TableCell>代號</TableCell>

                      <TableCell>數量</TableCell>
                      <TableCell>價格</TableCell>
                      <TableCell>總值</TableCell>


                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id}>

                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.symbol}</TableCell>

                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

          </div>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <h2>沒有資料</h2>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Member;
