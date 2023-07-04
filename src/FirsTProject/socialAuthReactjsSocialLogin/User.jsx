import React, { memo } from 'react'
import './socialLogin.css'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import "./Text.css";

export const User = memo(({ provider, profile, onLogout }) => {
  console.log("User profile ", profile);
  console.log("provider ", provider);
  const avatar =
    profile?.avatar ||
    profile?.profile_image_url ||
    profile?.avatar_url ||
    profile?.picture ||
    profile?.picture?.data?.url ||
    profile?.profile_image_url_https ||
    './src/assets/images/icon.jpg'


  const handleClick = () => {
    window.location.href = 'src/section/F2/index.html';
  };



  return (
    <Box sx={{ display: 'flex', width: "100%" }}>

          {/* <div className='avt'>    顯示頭像
            <img alt=' ' src={avatar} />
          </div> */}
          <h3 className='provider'>{provider.toUpperCase()}</h3>
          <div className='data'>
            {Object.entries(profile).map(([key, value]) => (
              <div className='field' key={key}>
                <div className='label'>{key}: </div>
                <div className='value'>{JSON.stringify(value)}</div>
              </div>
            ))}
          </div>
          <button
            className="btnLogout"
            style={{
              backgroundColor: '#673ab7',
              width: '100px',
              height: '40px',
              borderRadius: '9999px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
            }}
            onClick={onLogout}
          >
            Logout
          </button>



        </Box>
  )
})
