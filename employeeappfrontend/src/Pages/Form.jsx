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
        marginTop: '100px', 
        marginLeft: '100px', 
        p: 3, 
        width: '65vw' 
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        {formData._id ? 'Update Employee' : 'Register New Employee'}
      </Typography>
      <TextField
        margin="dense"
        name="name"
        label="Name"
        type="text"
        fullWidth
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="designation"
        label="Designation"
        type="text"
        fullWidth
        value={formData.designation}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="location"
        label="Location"
        type="text"
        fullWidth
        value={formData.location}
        onChange={handleChange}
      />
      <TextField
        margin="dense"
        name="salary"
        label="Salary"
        type="number"
        fullWidth
        value={formData.salary}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Save
      </Button>
    </Box>
  );
};

export default EmployeeFormPage;
