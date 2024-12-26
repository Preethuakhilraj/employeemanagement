import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  const backgroundImage =
    'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

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
        padding: { xs: 2, sm: 3, md: 4 },
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h3"
        component="div"
        sx={{
          color: '#fff',
          mb: { xs: 2, md: 4 },
          fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
          fontWeight: 700,
        }}
      >
        Welcome to Employee Management System
      </Typography>
      <Button
        component={Link}
        to="/signup"
        variant="contained"
        color="primary"
        size="large"
        sx={{
          width: { xs: '150px', sm: '180px', md: '200px' },
          mb: 2,
          fontSize: { xs: '0.8rem', sm: '1rem' },
          py: 1,
        }}
      >
        SIGNUP
      </Button>
      <Button
        component={Link}
        to="/login"
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          width: { xs: '150px', sm: '180px', md: '200px' },
          fontSize: { xs: '0.8rem', sm: '1rem' },
          py: 1,
        }}
      >
        LOGIN
      </Button>
    </Box>
  );
}
