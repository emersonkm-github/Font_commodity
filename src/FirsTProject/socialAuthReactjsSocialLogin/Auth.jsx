/*
  This Module is for most of Auth. method(s)
*/
import Quotes from "../Quotes"
import React, { useEffect, useCallback, useState } from 'react'
import DataApi from '../DataApi';
import DateSelection from "../DateSelection"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Social Media Auth by [reactjs-social-login](https://www.npmjs.com/package/reactjs-social-login)
//=======================================================
import sha256 from 'crypto-js/sha256';
import {
  LoginSocialGoogle,
  LoginSocialGithub,

} from 'reactjs-social-login'
import Member from '../Member';
//  CUSTOMIZE ANY UI BUTTON
import {
  GoogleLoginButton,
  GithubLoginButton,
} from 'react-social-login-buttons'
import Register from '../Register';
import './socialLogin.css'
import './socialLoginStory.css'
import { User } from './User' // component display user
import GoodsSelection from "../GoodsSelection";

import Account from '../Account.json';
import Tabschoice from "../TabsChoice";
// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
const REDIRECT_URI = window.location.href;
const theme = createTheme();

function Auth() {

  const [provider, setProvider] = useState('')
  const [profile, setProfile] = useState({})
  const [authToken, setAuthToken] = useState('')
  const [auth, setAuth] = useState(false)
  const [isLogin, setIsLogin] = useState('0000')

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    console.log(data.get("email"))
    if (data.get("email").toString() == Account.user[0].email && data.get("password").toString() == Account.user[0].password) {

      setAuth(true)
      localStorage.setItem('login', "1234");
      setIsLogin(localStorage.getItem('login'));
    }
  };
  //console.log("import.meta.env.VITE_GG_APP_ID ", import.meta.env.VITE_GG_APP_ID);
  console.log(provider)
  const onLoginStart = useCallback(() => {
    console.log("login start ");


  }, [])

  const onLogoutSuccess = useCallback(() => {
    setProfile({})
    setProvider('')
    setAuth(false)
    localStorage.clear();


    console.log('logout success')
  }, [])

  useEffect(() => {
    // how to collect previous user info. when 1st time loading
    const loggedInUser = localStorage.getItem("saveUser");
    console.log(loggedInUser)
    if (loggedInUser) {
      setProvider(loggedInUser);
      setProfile(loggedInUser);

    }

  }, []);

  return (
    <div sx={{ width: '100%' }}>
      {auth || (localStorage.getItem('login') == "1234") || (provider && profile) ? (

        // Display User Info.
        <div sx={{ width: '100%' }}>



          <User provider={provider} profile={profile} onLogout={onLogoutSuccess} />
          <Tabschoice provider={provider} profile={profile} onLogout={onLogoutSuccess}/>

        </div>

      ) : (<ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://images.pexels.com/photos/3680219/pexels-photo-3680219.jpeg?cs=srgb&dl=pexels-lukas-rodriguez-3680219.jpg&fm=jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <LoginSocialGoogle
                  isOnlyGetToken
                  client_id={import.meta.env.VITE_GG_APP_ID || ''}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    setProvider(provider)
                    setProfile(data)
                    //console.log('login data ', data);
                    setAuthToken(data.access_token);   // After Auth, collect the token

                    // store the user in localStorage
                    localStorage.setItem('saveUser', data.access_token)

                  }}
                  onReject={(err) => {
                    console.log(err)
                  }}
                >
                  <GoogleLoginButton />
                </LoginSocialGoogle>
                <LoginSocialGithub
                  isOnlyGetToken
                  client_id={import.meta.env.VITE_GITHUB_APP_ID}
                  client_secret={import.meta.env.VITE_GITHUB_APP_SECRET}
                  redirect_uri={REDIRECT_URI}
                  onLoginStart={onLoginStart}
                  onResolve={({ provider, data }) => {
                    setProvider(provider)
                    setProfile(data)
                    setAuthToken(data.access_token);   // After Auth, collect the token

                    localStorage.setItem('saveUser', data.access_token)
                  }}
                  onReject={(err) => {
                    console.log("a3 ", err)
                  }}
                >
                  <GithubLoginButton />
                </LoginSocialGithub>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>






      )}

    </div>
  )
}
export default Auth


