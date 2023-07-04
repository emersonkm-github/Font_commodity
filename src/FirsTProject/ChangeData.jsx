import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import { SHA256 } from 'crypto-js';

export default function ChangeData({handleLogout}) {

  const [account, setAccount] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  const emailRegex = /\S+@\S+\.\S+/;

  const accountValue = (event) => {
    setAccount(event.target.value)
  }
  const emailValue = (event) => {
    setEmail(event.target.value)
  }
  const passwordValue = (event) => {
    setPassword(event.target.value)
  }

  const hashedPassword = SHA256(password).toString();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailRegex.test(email)) {
      showSnackbar('電郵格式錯誤,請重新輸入', 'error');
      return;
    }

    if (password.length < 7 || !passwordRegex.test(password)) {
      showSnackbar('密碼長度不於8個英文或數字', 'error');
      return;
    }

    if (account && email && password) {
      // Send a PUT request to the backend
      axios.put(`/japi/stu13/quasar2/api/abc/register?name=${account}&&email=${email}&&password=${hashedPassword}`, {
      })
        .then(response => {
          handleLogout();
        })
        .catch(error => {
          // Handle error response

          if (error.response.data === 'email taken') {

            showSnackbar('電郵已註冊', 'error');
          }
          if (error.response.data === "Account dose not exist") {

            showSnackbar('帳號不存在', 'error');
          }
          if (error.response.data === "data is wrong") {

            showSnackbar('密碼或電郵錯誤', 'error');
          }
        });
    }

  }
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };


  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      display="flex" justifyContent="center" alignItems="center" flexDirection="column"
      autoComplete="off"
    >
      <h1>修改電郵或密碼</h1>
      <div>
        <TextField

          id="ChangeAccount"
          label="帳號"
          onChange={accountValue}
        /></div>
      <div>
        <TextField

          id="ChangeEmail"
          label="電郵"
          onChange={emailValue}
        /></div>
      <div>
        <TextField
          id="ChangePassWord"
          label="密碼"
          type="password"
          onChange={passwordValue}
          variant="outlined"
        /></div>
      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          提交
        </Button>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
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
  );
}

