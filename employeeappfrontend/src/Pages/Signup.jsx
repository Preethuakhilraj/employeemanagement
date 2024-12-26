import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Checkbox, FormControlLabel } from '@mui/material';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';

const Image = 'https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
export default function Signup() {
  const [employee, setEmployee] = useState({
    username: '',
    password: '',
    role: '',
    email: '',
    phone: '',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee({ ...employee, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Employee Data:', employee);
    try {
      const response = await axiosInstance.post('/signup', employee);
      console.log(response.data);
      alert('New Employee registered');
    } catch (error) {
      console.log('Error in new registration:', error);
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
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '70%',
          height: '90%',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E6E6FA ',
            padding: 2,
          }}
        >
          <Box
        component="img"
        sx={{
          height: 'auto',
          width: '80%',
          maxHeight: '80%',
          objectFit: 'cover',
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
            padding: 4,
          }}
        >
          <Box sx={{ width: '80%' }}>
            <Typography variant="h4" gutterBottom>
              Sign up
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              to use all features of the application
            </Typography>
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
                id="email"
                name="email"
                label="Email"
                value={employee.email}
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
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                value={employee.phone}
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
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={employee.terms}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" color="textSecondary">
                    By signing up I agree with <Link to="/terms">terms and conditions</Link>
                  </Typography>
                }
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
                Sign up
              </Button>
              <Typography
                sx={{ mt: 1 }}
                component={Link}
                to="/login"
                variant="body2"
                color="primary"
              >
                Already have an account? Login Now
              </Typography>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
