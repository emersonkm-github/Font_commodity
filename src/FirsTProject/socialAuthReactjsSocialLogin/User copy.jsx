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


const drawerWidth = 150

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(0),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

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

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    window.location.href = 'src/section/F2/index.html';
  };



  return (
    <Box sx={{ display: 'flex', width: "100%" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ width: "100%" }}>
        <Box sx={{
          background: 'linear-gradient(to left, #2196f3, #4caf50)',
          color: '#ffffff',
          p: 0
        }}>
          <Toolbar>
            <Typography variant="h2" noWrap sx={{ flexGrow: 1 }} component="div">
              <div className="moving-text">
                Trade
              </div>
            </Typography>
            <IconButton
              color="#311b92"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>
      <Main open={open}>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 150,
            bgcolor: '#e3f2fd',

          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box sx={{ bgcolor: '#e3f2fd', color: '#607d8b', p: 0 }}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
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

      </Drawer>
    </Box>
  )
})
