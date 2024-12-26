import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';

const Image =
  'https://images.pexels.com/photos/5950164/pexels-photo-5950164.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load';

export default function Login() {
  const [employee, setEmployee] = useState({
    username: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/login', employee);
      console.log(response.data);
      const role = employee.role;
      alert('Login Successful!');
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(employee));
        if (role === 'admin') {
          navigate('/admindashboard');
        } else {
          navigate('/userdashboard');
        }
      }
    } catch (error) {
      console.log('Error in login:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: { xs: 2, md: 4 },
        backgroundColor: '#f0f2f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: { xs: '100%', md: '70%' },
          maxWidth: 1200,
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 'auto',
              width: '90%',
              maxHeight: '90%',
              objectFit: 'cover',
              borderRadius: '5%',
            }}
            alt="Employee form image"
            src={Image}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: { xs: 3, md: 4 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" gutterBottom>
              Welcome Back to Login!
            </Typography>
            <hr />
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                value={employee.username}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                value={employee.password}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <FormControl variant="filled" fullWidth margin="normal" required>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={employee.role}
                  onChange={handleChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 1.5, fontSize: '1rem' }}
              >
                Sign in with Google
              </Button>
              <Typography
                sx={{ mt: 2 }}
                component={Link}
                to="/signup"
                variant="body2"
                color="primary"
              >
                Don’t have an account yet? Sign Up Now
              </Typography>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
