import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import TabsChoice from './TabsChoice';
import OutlinedInput from '@mui/material/OutlinedInput';
import TopBar from './TopBar';
import TabsChoicecopy from './TabsChoicecopy';
import { SHA256 } from 'crypto-js';

function Login() {
  const [account, setAccount] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [online, setOnline] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const hashedPassword = SHA256(loginPassword).toString();
  const login = (event) => {
    setAccount(event.target.value);
  };

  const handlePassword = (event) => {
    setLoginPassword(event.target.value);
  };

  const handleLoginOut = () => {
    setOnline(false);
    sessionStorage.clear();
    console.log('logout success');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (account.length === 0) {
      showSnackbar('請输入帳戶');
      return;
    }

    if (loginPassword.length === 0) {
      showSnackbar('請输入密碼');
      return;
    }



    if (account && loginPassword) {
      axios
        .post('/japi/stu13/quasar2/api/abc/register/login', {
          name: account,
          password: hashedPassword,
        })
        .then((response1) => {
          const jsonStr = JSON.stringify(response1.data);
          sessionStorage.setItem("UserData", jsonStr)
          if (response1.status === 200) {
            setOnline(true);
            sessionStorage.setItem('login', 'true');
            sessionStorage.setItem("password", hashedPassword)
            sessionStorage.setItem("account", account)
            axios
              .post('/japi/stu13/quasar2/api/abc/register/getdata', {
                name: account,
                password: hashedPassword,
              })
              .then((response) => {

                sessionStorage.setItem("Id",response.data)
              })
              .catch((error) => {

              });

          }
        })
        .catch((error) => {
          console.error(error.response.data);
          showSnackbar('帳號或密碼錯誤');
        });
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('login') === 'true';
    setOnline(isLoggedIn);
  }, []);

  const handleLogout = () => {
    setOnline(false);
    sessionStorage.clear();
  };
  const registerlogin = () => {
   const registerLogin = sessionStorage.getItem("registerAccount")
   const registerPassword = sessionStorage.getItem("registerPassword")

   axios
   .post('/japi/stu13/quasar2/api/abc/register/login', {
     name: registerLogin,
     password: registerPassword,
   })
   .then((response1) => {
     const jsonStr = JSON.stringify(response1.data);
     sessionStorage.setItem("UserData", jsonStr)
     if (response1.status === 200) {
       setOnline(true);
       sessionStorage.setItem('login', 'true');
       sessionStorage.setItem("password", registerPassword)
       sessionStorage.setItem("account", registerLogin)
       axios
         .post('/japi/stu13/quasar2/api/abc/register/getdata', {
           name: registerLogin,
           password: registerPassword,
         })
         .then((response) => {

           sessionStorage.setItem("Id",response.data)
         })
         .catch((error) => {

         });

     }
   })
   .catch((error) => {
     console.error(error.response.data);
     showSnackbar('帳號或密碼錯誤');
   });
  };

  return (
    <div>
      <TopBar />
      {online || sessionStorage.getItem('login') === 'true' ? (
        <div>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <Button variant="contained" color="primary" onClick={handleLoginOut}>
              登出
            </Button>
          </Box>
          <div>
            <TabsChoice handleLogout = {handleLogout}/>
          </div>
        </div>
      ) : (
        <div>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'row', // 将方向改为水平排列
              alignItems: 'center', // 垂直居中对齐
              justifyContent: 'flex-end', // 右对齐
              '& .MuiTextField-root': { m: 1, width: '25ch' },
              paddingRight: '30px',
            }}
            autoComplete="off"
          >
            <TextField size="small" id="login" label="帳戶" onChange={login} />

            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">密碼</InputLabel>
              <OutlinedInput
                size="small"
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={handlePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              登入
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

          <TabsChoicecopy />
        </div>
      )}
    </div>
  );
}

export default Login;
