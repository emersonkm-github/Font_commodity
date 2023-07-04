import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { SHA256 } from 'crypto-js';


export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  const emailRegex = /\S+@\S+\.\S+/;
  const accountRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const accountChange = (event) => {
    setAccount(event.target.value);
  };

  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      showSnackbar('密碼不一樣,請重新輸入', 'error');
      return;
    }

    if (!emailRegex.test(email)) {
      showSnackbar('電郵格式錯誤,請重新輸入', 'error');
      return;
    }

    if (password.length < 7 || !passwordRegex.test(password)) {
      showSnackbar('密碼長度不少於8個英文或數字', 'error');
      return;
    }

    if (account.length < 7 || !accountRegex.test(account)) {
      showSnackbar('帳號長度不少於8個英文或數字', 'error');
      return;
    }

    const hashedPassword = SHA256(password).toString();


    if (account && email && password) {
      axios
        .post('/japi/stu13/quasar2/api/abc/register', {
          name: account,
          email: email,
          password: hashedPassword,
        })
        .then((response) => {
          setPassword('');
          setConfirmPassword('');

          showSnackbar('帳號成功註冊', 'success');
        })
        .catch((error) => {
          console.error(error.response.data);
          if (error.response.data === 'email taken') {

            showSnackbar('電郵已註冊', 'error');
          }
          if (error.response.data === 'name taken') {

            showSnackbar('帳號已被註冊', 'error');
          }
        });
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>登記用戶</h2>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField id="outlined-required-username" label="帳號" onChange={accountChange} />
        </div>
        <div>
          <TextField

            id="outlined-required-email"
            label="電郵"
            onChange={emailChange}
          />
        </div>

        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password">確認密碼</InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm Password"
            />
          </FormControl>
        </div>
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
    </div>
  );
}
