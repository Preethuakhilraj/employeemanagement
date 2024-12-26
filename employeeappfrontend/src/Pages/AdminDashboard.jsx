import  { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress, Alert, Button } from '@mui/material';
import axiosInstance from './axiosinterceptor';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [employee, setemployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/admin/view');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
console.log(employee);
  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" height="5vh"><CircularProgress /></Box>;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const handleAddition = async () => {
       navigate('/form');
  };

  const handleUpdate = async (row) => {
    setemployee(row);
    navigate('/form', { state: row });
    try {
      await axiosInstance.put(`/admin/edit/${row._id}`, row);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (row) => {
    try {
      await axiosInstance.delete(`/admin/remove/${row._id}`);
      fetchData(); // Refresh the list
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <Box 
      component="main" 
      sx={{ 
          marginTop: '100px', 
          marginLeft: '100px', 
          p: 3, 
          width: '85vw' 
      }}
    >
      <Box 
          sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 3 
          }}
      >
          <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                  fontWeight: 'bold' 
              }}
          >
              EMPLOYEE LIST - ADMIN DASHBOARD
          </Typography>
          <Button 
              variant="contained" 
              sx={{ 
                  p: 2 
              }} 
              onClick={handleAddition}
          >
              Register <br/> New Employee
          </Button>
      </Box>
      
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="employee table">
          <TableHead>
            <TableRow sx={{ fontWeight: 'bold', backgroundColor: 'grey.200' }}>
              <TableCell>EMPLOYEE ID</TableCell>
              <TableCell>EMPLOYEE NAME</TableCell>
              <TableCell align="left">DESIGNATION</TableCell>
              <TableCell align="left">LOCATION</TableCell>
              <TableCell align="left">SALARY</TableCell>
              <TableCell align="left"> </TableCell>
              <TableCell align="left"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: 'action.hover',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: 'common.white',
                  },
                }}
              >
                <TableCell component="th" scope="row">{row._id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.designation}</TableCell>
                <TableCell align="left">{row.location}</TableCell>
                <TableCell align="left">{row.salary}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" onClick={() => handleUpdate(row)}>UPDATE</Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" onClick={() => handleDelete(row)}>DELETE</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
