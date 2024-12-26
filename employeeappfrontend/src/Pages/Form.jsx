import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import axiosInstance from './axiosinterceptor';

const EmployeeFormPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });

  useEffect(() => {
    if (location.state && location.state._id) {
      setFormData(location.state);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (formData._id) {
        await axiosInstance.put(`/admin/edit/${formData._id}`, formData);
      } else {
        await axiosInstance.post('/admin/add', formData);
      }
      navigate('/admindashboard'); 
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        margin: 'auto',
        padding: { xs: 2, sm: 3, md: 4 },
        maxWidth: { xs: '90vw', sm: '80vw', md: '60vw' },
        backgroundColor: '#fff',
        boxShadow: 3,
        borderRadius: 2,
        mt: { xs: 5, md: 8 },
        textAlign: 'center',
      }}
    >
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ 
          fontWeight: 'bold', 
          fontSize: { xs: '1.5rem', md: '2rem' },
          mb: 3,
        }}
      >
        {formData._id ? 'Update Employee' : 'Register New Employee'}
      </Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          name="designation"
          label="Designation"
          type="text"
          fullWidth
          value={formData.designation}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          name="location"
          label="Location"
          type="text"
          fullWidth
          value={formData.location}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          name="salary"
          label="Salary"
          type="number"
          fullWidth
          value={formData.salary}
          onChange={handleChange}
          variant="outlined"
        />
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
          fullWidth
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeFormPage;
