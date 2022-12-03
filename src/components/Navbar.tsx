import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 350;

export default function Navbar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, margin: 20 }}>
        COINX
      </Typography>
      <Divider />
      <Button href="/">Home</Button>
      <Divider />
      <Button href="/about">About</Button>
      <Divider />
      <Button href="/top100">Top 100</Button>
      <Divider />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', padding: 1 }}>
      <AppBar
        component="nav"
        color="transparent"
        sx={{ position: 'inherit', boxShadow: 'none' }}
      >
        <Toolbar style={{ padding: 0.5 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h3"
            component={Link}
            to="/"
            color="textPrimary"
            sx={{
              flexGrow: 1,
              display: {
                textDecoration: 'none',
                boxShadow: 'none',
                margin: 20,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              },
            }}
          >
            COIN
            <CancelOutlinedIcon sx={{ fontSize: '45px' }} />
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button href="/">Home</Button>
            <Button href="/about">About</Button>
            <Button href="/top100">Top 100</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
