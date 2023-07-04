import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


export default function TopBar() {

  return (

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{
          background: 'linear-gradient(to left, #2196f3, #4caf50)',
          color: '#ffffff',
          p: 0
        }}>
          <Typography variant="h2" noWrap sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }} component="div">
            <div className="id">
              財來
            </div>
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>

  );
}
