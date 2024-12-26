import{ useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  CssBaseline,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // State for user information and mobile menu
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Retrieve user information from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Clear user state
    navigate('/'); // Redirect to homepage
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const logo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ19ir9fXIGAKncFyFgjSNjOAPKSsi9Ri6hDgchPi-1hxZ_neF0XzrpK892m7T95m_sfSM&usqp=CAU';

  // Determine if the current path should hide the navbar
  const hideNavbarPaths = ['/', '/login', '/signup'];
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  // Links to display based on user role
  const links = user?.role === 'admin'
    ? [
        { text: 'Employee Dashboard', to: '/userdashboard' },
        { text: 'Admin Dashboard', to: '/admindashboard' },
        { text: 'Registration Form', to: '/form' },
      ]
    : user?.role === 'employee'
    ? [{ text: 'Employee Dashboard', to: '/userdashboard' }]
    : [
        { text: 'Login', to: '/login' },
        { text: 'Signup', to: '/signup' },
      ];

  const drawerContent = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Menu
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {links.map((link) => (
          <ListItem
            button
            key={link.text}
            onClick={() => {
              toggleDrawer();
              navigate(link.to);
            }}
          >
            <ListItemText primary={link.text} />
          </ListItem>
        ))}
        {user && (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: '#1976d2', height: '64px', justifyContent: 'center' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
              <img
                src={logo}
                alt="logo"
                style={{
                  height: '40px',
                  marginRight: '10px',
                  borderRadius: '20px',
                }}
              />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                Employee Management System
              </Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {links.map((link) => (
                <Button
                  key={link.text}
                  component={Link}
                  to={link.to}
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    mx: 1,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                >
                  {link.text}
                </Button>
              ))}
              {user && (
                <Button
                  sx={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    mx: 1,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={toggleDrawer}>
                <MenuIcon sx={{ color: '#ffffff' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
          {drawerContent}
        </Drawer>
      </Box>
    </div>
  );
}
