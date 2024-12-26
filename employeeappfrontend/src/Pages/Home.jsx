
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const backgroundImage = 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; 

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        flexDirection: 'column',
        gap: 2,
        margin: 0,
        padding: 0
            }}
    >
      <Typography variant="h3" component="div" sx={{ color: '#fff', mb: 4 }}>
        Welcome to Employee Management System
      </Typography>
      <Button
        component={Link}
        to="/signup"
        variant="contained"
        color="primary"
        size="large"
        sx={{ width: '200px', mb: 2 }}
      >
        SIGNUP
      </Button>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="secondary"
        size="large"
        sx={{ width: '200px' }}
      >
     LOGIN
      </Button>
    </Box>
  );
}
